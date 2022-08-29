import { Address } from './address.model';

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  BARBER = 'ROLE_BARBIERE',
  CUSTOMER = 'cliente',
}

export interface Authority {
  authority: UserRole;
}

export interface User {
  id: number;
  nome: string;
  cognome: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  role: UserRole;
  enabled: boolean;
  credentialsNonExpired: boolean;
  jwt: string;
  mail: string;
  password: string;
  indirizzi: Address[];
  cellulare?: string;
  notifiche: boolean;
}
