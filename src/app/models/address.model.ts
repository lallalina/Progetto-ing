import { User } from './user.model';

export interface Address {
  id?: number;
  idUtente?: User['id'];
  citta: string;
  via: string;
  numeroCivico: string;
  cap: string;
}
