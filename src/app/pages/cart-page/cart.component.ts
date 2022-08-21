import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/models/cart.model';
import { Ordine } from 'src/app/models/ordine.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: CartItem[];
  public total: number;
  public ordine: Ordine[];

  form;
  indirizzi: [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.initForm();
  }

  //controllo validità sezioni
  initForm() {
    this.form = new FormGroup({
      citta: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      cap: new FormControl('', Validators.required),
      numCivico: new FormControl('', Validators.required),
    });
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
    const newAmount = item.amount--;
    if (newAmount === 0) {
      this.cartService.removeItem(item);
    } else {
      this.cartService.updateItemAmount(item, newAmount);
    }
  }

  public checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
  }

  //get indirizzi utente
  getIndirizzi() {
    this.auth.getIndirizzo().subscribe((response) => {
      console.log(response);
      this.indirizzi = response;
    });
  }

  //ordina prodotto
  ordina() {
    this.cartService.ordina(this.form.value).subscribe({
      next: (response) => {
        this.form.reset();
        this.ordine = response;
      },
    });
  }
}
