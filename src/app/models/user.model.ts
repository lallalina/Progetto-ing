export enum UserRole {
  ADMIN = 'admin',
  RESPONSIBLE = 'responsabile',
  CUSTOMER = 'cliente',
}

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}
