import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User, UserRole } from 'src/app/models/user.model';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss'],
})
export class CustomerPageComponent implements OnInit {
  @Input() product: Product;
  carrello: CartItem[];
  prodEsistente: Product | null;
  badgeCounter: number;
  public selectedQuantity: number = 1;
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
      console.log('il carrello: ' + cart);
      this.carrello = cart;
    });
    this.listenToProd();
  }

  //get prodotti
  listenToProd() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response);
      this.product = response;
    });
  }

  //metodo per aggiungere al carrello
  public onAddToCart(prodotto) {
    console.log(this.selectedQuantity);
    this.cartService.addItem(new CartItem(prodotto, this.selectedQuantity));
  }

  public onSelectQuantity(event) {
    console.log(event.target.value);
    this.selectedQuantity = <number>+event.target.value;
    console.log(this.selectedQuantity);
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
