import { User, UserRole } from '../models/user.model';

export const MockedUsers: User[] = [
  {
    id: 1,
    name: 'Admin',
    surname: 'Admin',
    role: UserRole.ADMIN,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    name: 'Responsabile',
    surname: 'Responsabile',
    role: UserRole.RESPONSIBLE,
    username: 'responsabile',
    password: 'responsabile',
  },
  {
    id: 3,
    name: 'Cliente',
    surname: 'Cliente',
    role: UserRole.CUSTOMER,
    username: 'cliente',
    password: 'cliente',
  },
];
