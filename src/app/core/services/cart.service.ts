import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { isThisSecond } from 'date-fns';
import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartItem[]>([]);
  readonly cart$ = this.cartSubject.asObservable();

  get cart(): CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  set cart(value: CartItem[]) {
    sessionStorage.setItem('cart', JSON.stringify(value));
    this.cartSubject.next(value);
  }


  constructor(
    private messageService: MessageService,
    private toastService: ToastrService) {
    const _cart = this.cart;
    if (!_cart) {
      this.cart = [];
    } else {
      this.cart = _cart;
    }
  }

  public getItems() {
    return this.cart.slice();
  }

  // Get Product ids out of CartItem[] in a new array
  private getItemIds() {
    return this.getItems().map((cartItem) => cartItem.product.id);
  }

  public addItem(item: CartItem) {
    const _cart = this.getItems();
    console.log(item);
    // If item is already in cart, add to the amount, otherwise push item into cart
    if (this.getItemIds().includes(item.product.id)) {
      _cart.forEach(function (cartItem) {
        if (cartItem.product.id === item.product.id) {
          cartItem.amount += item.amount;
        }
      });
      this.toastService.success(
        'Cambiata quantità di: ' + item.product.nome
      );
    } else {
      _cart.push(item);
      this.toastService.success('Aggiunto al carrello: ' + item.product.nome);
    }
    this.cart = _cart;
  }

  public addItems(items: CartItem[]) {
    items.forEach((cartItem) => {
      this.addItem(cartItem);
    });
  }

  public removeItem(item: CartItem) {
    const _cart = this.getItems();
    const indexToRemove = _cart.findIndex(
      (element) => element === item
    );
    _cart.splice(indexToRemove, 1);
    this.cart = _cart;
    this.toastService.success('Rimosso dal carrello: ' + item.product.nome);
  }

  public updateItemAmount(item: CartItem, newAmount: number) {
    const _cart = this.getItems();
    _cart.forEach((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        cartItem.amount = newAmount;
      }
    });
    this.cart = _cart;
    this.toastService.success('Aggiornata quantità di: ' + item.product.nome);
  }

  public clearCart() {
    this.cart = [];
    this.toastService.success('Carrello eliminato');
  }

  public getTotal() {
    let total = 0;
    this.cart.forEach((cartItem) => {
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
