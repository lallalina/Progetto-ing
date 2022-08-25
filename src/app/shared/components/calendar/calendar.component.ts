import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking, CalendarBooking } from 'src/app/models/booking';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  prenotazioniB = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  calendarBookings: CalendarBooking[] = [];
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  modalData: {
    action: string;
    event: CalendarEvent;
    booking: booking
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

  loading: boolean;

  constructor(
    private modal: NgbModal,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.aggiornaTabella();
  }

  //eventi da visualizzare in tabella, si chiama nell'init quando cambio il tipo
  aggiornaTabella() {
    this.events = [];
    this.bookingService.getBookings().subscribe((response) => {
      response.forEach((booking) => {
        const newEvent: CalendarEvent = {
          title: `${booking.nome} (${booking.mail})`,
          start: new Date(booking.startTime),
          end: new Date(booking.endTime),
          color: colors.red,
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          }
        }
        this.events.push(newEvent);
        this.calendarBookings.push({
          event: newEvent,
          booking
        })
        this.refresh.next();
        console.log(this.events);
      });
    });
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
    const calendarBooking = this.calendarBookings.find((elem) => JSON.stringify(elem.event) === JSON.stringify(event))
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

  deleteBooking(id: booking['id'], event: CalendarEvent) {
    this.loading = true;
    this.bookingService.deleteBooking(id).subscribe({
      next: (res) => {
        const bookingIndex = this.calendarBookings.findIndex((elem) => elem.booking.id === id);
        this.calendarBookings.splice(bookingIndex, 1);
        this.deleteEvent(event);
        this.refresh.next();
      },
      complete: () => {
        this.loading = false;
        this.modal.dismissAll();
      }
    }
    )
  }
}
