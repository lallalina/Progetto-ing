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
        prodotto: [],
      };
    } else {
      this.cart = _cart;
    }
  }

  //aggiungi prodotti nel carrello
  addItem(product: Product) {
    const tempCart = this.cart;
    const isPresent = !!tempCart.prodotto.find(
      (elem) => elem.id === product.id && elem.nome === product.nome
    );
    if (!isPresent) {
      tempCart.prodotto.push(product);
    }
    tempCart.countTot++;
    tempCart.prezzoTot += product.prezzo;
    this.cart = tempCart;
  }

  //pulisci carrello
  /*
  clearCart(id) {
    let updatedCartItems = [];
    console.log(this.cart.prodotto[0].id);

    for (let i = 0; i < this.cart.prodotto.length; i++) {
      if (this.cart.prodotto[i].id === id) {
        let selectedCartItem = this.cart.prodotto[i];
        let currentQty = selectedCartItem.count;
        if (currentQty > 1) {
          //delete only one item
          const updatedQuantity = selectedCartItem.count - 1;
          selectedCartItem.count = updatedQuantity; //add in the element the new quantity

          updatedCartItems = [
            ...this.cart.prodotto,
            (this.cart.prodotto[i] = selectedCartItem),
          ];
        } else {
          updatedCartItems = this.cart.prodotto.splice(i, 1);
        }
        this.cart = {
          countTot: this.cart.countTot - 1,
          prezzoTot: this.cart.prezzoTot - this.cart.prodotto[i].prezzo,
          prodotto: updatedCartItems,
        };
        console.log(this.cart);
      }
    }
  }*/

  clearCart(id) {
    console.log(this.cart);
    for (let i = 0; i < this.cart.prodotto.length; i++) {
      if (this.cart.prodotto[i].id === id) {
        this.cart.prodotto.splice(i, 1);
        this.cart = {
          countTot: this.cart.countTot,
          prezzoTot: this.cart.prezzoTot - this.cart.prodotto[i].prezzo,
          prodotto: this.cart.prodotto,
        };
      }
    }
  }
}
