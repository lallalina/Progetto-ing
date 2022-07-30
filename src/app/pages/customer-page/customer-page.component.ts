import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  user: User;
  readonly UserRole = UserRole;

  constructor(private auth: AuthService, private router: Router) {}

  //metodo per aggiungere al carrello
  addToCart(producat) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
