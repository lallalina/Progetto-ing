import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { CartService } from 'src/app/core/services/cart.service';

import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() set productValue(value: Product) {
    this.product = value;
    if (value.foto) {
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
        value.foto as string
      );
    }
  }

  private _product: Product;

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  quantity: number = 1;
  imageSource: SafeResourceUrl;

  constructor(
    private cartService: CartService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  //aggiungi al carrello
  addToCart() {
    this.cartService.addItem(new CartItem(this.product, this.quantity));
  }
}
