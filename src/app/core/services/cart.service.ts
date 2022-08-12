import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<Cart>(null);
  readonly cart$ = this.cartSubject.asObservable();

  get cart(): Cart {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  set cart(value: Cart) {
    sessionStorage.setItem('cart', JSON.stringify(value));
    this.cartSubject.next(value);
  }

  constructor() {
    const _cart = this.cart;
    if (!_cart) {
      this.cart = {
        countTot: 0,
        prezzoTot: 0,
        prodotto: []
      }
    } else {
      this.cart = _cart;
    }
  }

  addItem(product: Product) {
    const tempCart = this.cart;
    const isPresent = !!tempCart.prodotto.find(
      (elem) => (elem.id === product.id) && (elem.nome === product.nome)
    );
    if (!isPresent) {
      tempCart.prodotto.push(product);
    }
    tempCart.countTot++;
    tempCart.prezzoTot += product.prezzo;
    this.cart = tempCart;
  }

  clearCart() {
    this.cart = {
      countTot: 0,
      prezzoTot: 0,
      prodotto: []
    }
  }
}
