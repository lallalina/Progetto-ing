import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input,
} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { BookingService } from 'src/app/core/services/booking.service';
import { UtilsService } from 'src/app/core/services/utils.service';

import { booking, CalendarBooking } from 'src/app/models/booking';
import { Barber } from 'src/app/models/barber.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  /*variabili*/
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() barberId: Barber['id'];

  prenotazioniB = [];

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh = new Subject<void>();

  calendarBookings: CalendarBooking[] = [];
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  loading: boolean;

  modalData: {
    action: string;
    event: CalendarEvent;
    booking: booking;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  constructor(
    private modal: NgbModal,
    private bookingService: BookingService,
    private utils: UtilsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.aggiornaTabella();
    this.utils.reloadCalendar.subscribe((_) => this.aggiornaTabella());
  }

  //eventi da visualizzare in tabella, si chiama nell'init quando cambio il tipo
  aggiornaTabella() {
    this.events = [];
    if (this.barberId) {
      this.bookingService
        .getBookingsBarber(this.barberId)
        .subscribe((response) => {
          response.forEach((booking) => {
            this.populateEvents(booking);
            console.log(this.events);
          });
        });
    } else {
      this.bookingService.getBookings().subscribe((response) => {
        response.forEach((booking) => {
          this.populateEvents(booking);
          console.log(this.events);
        });
      });
    }
  }

  //visualizzazione eventi nel calendario
  private populateEvents(booking: booking) {
    const newEvent: CalendarEvent = {
      title: `${booking.nome} (${booking.mail})`,
      start: new Date(booking.startTime),
      end: new Date(booking.endTime),
      color: colors.red,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
    };
    this.events.push(newEvent);
    this.calendarBookings.push({
      event: newEvent,
      booking,
    });
    this.refresh.next();
  }

  //seleziona un giorno
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  //gestisci
  handleEvent(action: string, event: CalendarEvent): void {
    const calendarBooking = this.calendarBookings.find(
      (elem) => JSON.stringify(elem.event) === JSON.stringify(event)
    );
    this.modalData = { event, action, booking: calendarBooking.booking };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  //aggiungi
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  //cancella
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  //cancella prenotazione
  deleteBooking(id: booking['id'], event: CalendarEvent) {
    this.loading = true;
    this.bookingService.deleteBooking(id).subscribe({
      next: (res) => {
        const bookingIndex = this.calendarBookings.findIndex(
          (elem) => elem.booking.id === id
        );
        this.calendarBookings.splice(bookingIndex, 1);
        this.deleteEvent(event);
        this.refresh.next();
      },
      complete: () => {
        this.loading = false;
        this.modal.dismissAll();
      },
    });
  }

  //per aggiungere una nuova prenotazione
  openReservationDialog() {
    this.dialog.open(ReservationDialogComponent);
  }
}
