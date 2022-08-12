import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User, UserRole } from 'src/app/models/user.model';

import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  @Input() products: Product[];
  carrello: Cart;
  prodEsistente: Product | null;
  badgeCounter: number;

  user: User;
  readonly UserRole = UserRole;

  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.cartService.cart$.subscribe((cart) => {
      console.log(cart);
      this.carrello = cart;
    });
    this.listenToProd();
  }

  //get prodotti
  listenToProd() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  //metodo per aggiungere al carrello
  addToCart(product: Product) {
    this.cartService.addItem(product);
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
