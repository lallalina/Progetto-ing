import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;
  readonly UserRole = UserRole;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  //controllo ruolo admin
  isAdmin() {
    return this.user.authorities.includes({ authority: UserRole.ADMIN });
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
