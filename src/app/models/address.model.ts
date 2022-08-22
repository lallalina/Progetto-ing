import { User } from './user.model';

export interface Address {
  idUtente: User[];
  citta: string;
  via: string;
  numeroCivico: number;
  cap: number;
}
