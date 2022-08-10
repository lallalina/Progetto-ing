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
  isAdmin: boolean;
  readonly UserRole = UserRole;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.user = user;

        //controllo ruolo admin
        console.log(this.user.authorities);
        this.isAdmin = !!this.user.authorities.find(
          (elem) => elem.role === UserRole.ADMIN
        );
      }
    });
  }

  logout() {
    this.user = null;
    this.auth.logout();
    this.router.navigate(['']);
  }
}
