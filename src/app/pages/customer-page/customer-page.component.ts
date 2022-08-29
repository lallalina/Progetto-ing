import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: [],
})
export class CustomerPageComponent implements OnInit {
  /*variabili*/
  product: Product[];
  carrello: CartItem[];
  user: User;
  readonly UserRole = UserRole;

  prodEsistente: Product | null;
  badgeCounter: number;
  public selectedQuantity: number = 1;

  loading: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.cartService.cart$.subscribe((cart) => {
      console.log('il carrello: ' + cart);
      this.carrello = cart;
    });
    this.listenToProd();
  }

  //get prodotti
  listenToProd() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => (this.product = response),
      complete: () => (this.loading = false),
    });
  }

  //pulisci storage
  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
