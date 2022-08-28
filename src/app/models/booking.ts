import { CalendarEvent } from 'angular-calendar';
import { Barber } from './barber.model';
import { Treatment } from './treatment.model';

export class booking {
  id: number;
  nome: string;
  mail: string;
  idBarbiere: Barber['id'];
  startTime?: Date;
  endTime?: Date;
  trattamenti?: string | Treatment[];
  prezzo: number;
  barbiere: Barber;
}

export class CalendarBooking {
  booking: booking;
  event: CalendarEvent;
}
