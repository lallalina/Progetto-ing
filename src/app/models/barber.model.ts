import { UserRole } from './user.model';

export interface Barber {
  id: number;
  mail: string;
  role: UserRole;
  nome: string;
  cognome: string;
  cellulare: string;
  foto: string;
}
