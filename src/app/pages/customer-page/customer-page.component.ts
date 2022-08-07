import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  @Input() prodotto;

  user: User;
  readonly UserRole = UserRole;
  carrello = [];

  constructor(private auth: AuthService, private router: Router) {}

  //metodo per aggiungere al carrello
  addToCart(prodotto) {}
  //this.utils.carrello.push(prodotto)

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
