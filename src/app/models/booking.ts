import { Time } from '@angular/common';
import { Barber } from './barber.model';

export class booking {
  id: number;
  nome: string;
  email: string;
  idBarbiere: Barber;
  start: Time;
  trattamenti?: string;
}
