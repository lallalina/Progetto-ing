import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from 'src/app/models/user.model';

@Pipe({
  name: 'roleName',
})
export class RoleNamePipe implements PipeTransform {
  rolesMap = new Map<UserRole, string>([
    [UserRole.ADMIN, 'Amministratore'],
    [UserRole.BARBER, 'Barbiere'],
    [UserRole.CUSTOMER, 'Cliente'],
  ]);

  transform(value: UserRole, ...args: unknown[]): unknown {
    return this.rolesMap.get(value);
  }
}
