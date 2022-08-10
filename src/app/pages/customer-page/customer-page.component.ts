import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Product } from 'src/app/models/product.model';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  @Input() products: Array<Product>;

  user: User;
  readonly UserRole = UserRole;
  carrello = [];
  prodEsistente: Product | null;

  constructor(private auth: AuthService, private router: Router) {}

  //metodo per aggiungere al carrello
  addToCart(products) {
    this.carrello.find((prod) => (prod.id = products.id));
    if (this.prodEsistente != null) {
      // prendi il prodotto e aumenta la quantità
    } else {
      // prendi il nuovo prodotto e aggiungilo al carrello
    }
  } //addtocartSession

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
