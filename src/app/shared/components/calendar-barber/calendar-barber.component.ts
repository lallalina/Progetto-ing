import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';
import { Barber } from 'src/app/models/barber.model';

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
  selector: 'app-calendar-barber',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-barber.component.html',
  styleUrls: ['./calendar-barber.component.css'],
})
export class CalendarBarberComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  barber: Barber;

  prenotazioniB = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(
    private modal: NgbModal,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.aggiornaTabella();
  }

  //eventi da visualizzare in tabella, si chiama nell'init quando cambio il tipo
  aggiornaTabella() {
    this.events = [];
    this.bookingService
      .getBookingsBarber(this.barber.id)
      .subscribe((response) => {
        response.forEach((booking) => {
          this.events.push({
            title: `${booking.nome} (${booking.mail})`,
            start: new Date(booking.startTime),
            end: new Date(booking.endTime),
            color: colors.red,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
          });
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

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
