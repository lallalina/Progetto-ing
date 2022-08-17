import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private cartSubscription: Subscription;
  public items: CartItem[];
  public total: number;
  form;
  indirizzi: [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
    /*
    this.cartService.cart$.subscribe((cart) => {
      console.log(cart);
      this.carrello = cart;
    });
    */
    this.initForm();
  }

  /*ngDoCheck(){
    this.totale=0;
    //calcolo totale dei prodotti
    this.carrello.forEach(element => {
      this.totale += element.reservation_items[0].price;
    });
*/

  //salvo il carrello nella session
  saveCart() {
    sessionStorage.setItem('carrello', JSON.stringify(this.items));
  }

  //togli elementi dal carrello
  deletElement(id) {
    this.cartService.removeItem(id);
  }

  public onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  //pulisci carrello
  public onRemoveItem(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  public increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  public decreaseAmount(item: CartItem) {
    item.amount === 1 && this.cartService.removeItem(item);
    this.cartService.updateItemAmount(item, item.amount - 1);
  }

  public checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
  }

  //indirizzo per utente
  nuovoIndirizzo() {
    /* this.auth.NuovoIndirizzo(this.form.value).subscribe((response) => {
      this.indirizzi.push(response);
    });*/
  }

  //get indirizzi utente
  getIndirizzi() {
    this.auth.getIndirizzo().subscribe((response) => {
      console.log(response);
      this.indirizzi = response;
    });
  }

  initForm() {
    //controllo validità sezioni
    this.form = new FormGroup({
      city: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
    });
  }

  //ordina prodotto
  ordina() { }
}
