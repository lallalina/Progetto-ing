import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { UserRole } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this.auth.user;
    if (user && user.role === UserRole.CUSTOMER) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
