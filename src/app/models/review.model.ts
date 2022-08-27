import { booking } from './booking';

export class Review {
  idPrenotazione: booking['id'];
  valutazione: number;
  descrizione: string;
  user: string;
}
