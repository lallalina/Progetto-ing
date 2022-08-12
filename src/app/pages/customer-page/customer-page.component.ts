import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
})
export class CustomerPageComponent implements OnInit {
  @Input() products: Product[];
  carrello: Cart[];
  prodEsistente: Product | null;

  user: User;
  readonly UserRole = UserRole;

  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.listenToProd();
  }

  listenToProd() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  //metodo per aggiungere al carrello
  addToCart(products) {
    this.carrello.push(products);
  }

  logout() {
    this.auth.user = null;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
