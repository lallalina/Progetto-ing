import { Barber } from './barber.model';

export class booking {
  id: number;
  nome: string;
  mail: string;
  idBarbiere: Barber;
  startTime?: Date;
  endTime?: Date;
  trattamenti?: string;
  prezzo: number;
}
