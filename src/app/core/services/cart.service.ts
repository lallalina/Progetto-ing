import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { isThisSecond } from 'date-fns';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(null);
  readonly cart$ = this.cartSubject.asObservable();
  private cartItems: CartItem[];

  constructor(private messageService: MessageService) {
    this.cartItems = [];
  }

  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<
    CartItem[]
  >();

  public getItems() {
    return this.cartItems.slice();
  }

  // Get Product ids out of CartItem[] in a new array
  private getItemIds() {
    return this.getItems().map((cartItem) => cartItem.product.id);
  }

  /*
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
*/

  public addItem(item: CartItem) {
    console.log(item);
    // If item is already in cart, add to the amount, otherwise push item into cart
    if (this.getItemIds().includes(item.product.id)) {
      this.cartItems.forEach(function (cartItem) {
        if (cartItem.product.id === item.product.id) {
          cartItem.amount += item.amount;
        }
      });
      this.messageService.add(
        'Amount in cart changed for: ' + item.product.nome
      );
    } else {
      this.cartItems.push(item);
      this.messageService.add('Added to cart: ' + item.product.nome);
    }
    this.itemsChanged.emit(this.cartItems.slice());
  }

  public addItems(items: CartItem[]) {
    items.forEach((cartItem) => {
      this.addItem(cartItem);
    });
  }

  public removeItem(item: CartItem) {
    const indexToRemove = this.cartItems.findIndex(
      (element) => element === item
    );
    this.cartItems.splice(indexToRemove, 1);
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Deleted from cart: ' + item.product.nome);
  }

  public updateItemAmount(item: CartItem, newAmount: number) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        cartItem.amount = newAmount;
      }
    });
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Updated amount for: ' + item.product.nome);
  }

  public clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Cleared cart');
  }

  public getTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.amount * cartItem.product.prezzo;
    });
    return total;
  }

  //pulisci carrello 1 elemento --alfredo
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
}
