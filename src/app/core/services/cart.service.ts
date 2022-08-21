import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartItem[]>([]);
  readonly cart$ = this.cartSubject.asObservable();

  constructor(
    private messageService: MessageService,
    private toastService: ToastrService,
    private http: HttpClient
  ) {
    const _cart = this.cart;
    if (!_cart) {
      this.cart = [];
    } else {
      this.cart = _cart;
    }
  }

  get cart(): CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  set cart(value: CartItem[]) {
    sessionStorage.setItem('cart', JSON.stringify(value));
    this.cartSubject.next(value);
  }

  //prendi items
  public getItems() {
    return this.cart ? this.cart.slice() : [];
  }

  // Get Product ids out of CartItem[] in a new array
  private getItemIds() {
    return this.getItems().map((cartItem) => cartItem.product.id);
  }

  //aggiungi items
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
      this.toastService.success('Cambiata quantità di: ' + item.product.nome);
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
      (element) => element.product.id === item.product.id
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

  //pulisci carrello
  public clearCart() {
    this.cart = [];
    this.toastService.success('Carrello eliminato');
  }

  //totale conteggio dei prodotti
  public getTotal() {
    let total = 0;
    if (this.cart) {
      this.cart.forEach((cartItem) => {
        total += cartItem.amount * cartItem.product.prezzo;
      });
    }
    return total;
  }
}
