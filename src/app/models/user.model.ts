export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  RESPONSIBLE = 'ROLE_BARBIERE',
  CUSTOMER = 'cliente',
}

export interface Authority {
  role: UserRole;
}

export interface User {
  id: number;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  enabled: boolean;
  credentialsNonExpired: boolean;
}
