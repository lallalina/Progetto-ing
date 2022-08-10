import { UserRole } from './user.model';

export interface Barber {
  id: number;
  mail: string;
  role: UserRole;
  nome: string;
  cognome: string;
}

//Admin ha lo stesso model, con ruolo settato ad Admin--> serviceBarber
