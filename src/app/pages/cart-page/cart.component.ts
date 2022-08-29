import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderdService } from 'src/app/core/services/orderd.service';

import { Address } from 'src/app/models/address.model';
import { CartItem } from 'src/app/models/cart.model';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  /*variabili*/
  readonly UserRole = UserRole;

  items: CartItem[]; //prende i prodotti
  indirizzi: Address[]; //prende gli indirizzi dell'utente
  user: User;

  form: FormGroup;
  public total: number;
  loading: boolean;

  selectedAddress: Address;

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService,
    private orderdService: OrderdService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.initForm();
    this.retrieveIndirizziUser();
  }

  //controllo validità sezioni
  initForm() {
    this.form = new FormGroup({
      citta: new FormControl('', Validators.required),
      via: new FormControl('', Validators.required),
      cap: new FormControl('', [Validators.required, Validators.minLength(5)]),
      numeroCivico: new FormControl('', [Validators.required]),
    });
  }

  //salvo il carrello nella session
  saveCart() {
    sessionStorage.setItem('carrello', JSON.stringify(this.items));
  }

  //togli elementi dal carrello
  deletElement(id) {
    this.cartService.removeItem(id);
  }

  //pulisci carrello
  public onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  //incrementa
  public increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  //decrementa
  public decreaseAmount(item: CartItem) {
    const newAmount = item.amount - 1;
    if (newAmount === 0) {
      this.cartService.removeItem(item);
    } else {
      this.cartService.updateItemAmount(item, newAmount);
    }
  }

  //calcolo quantità prodotto selezionato
  public checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
  }

  //get indirizzi esisteni
  retrieveIndirizziUser() {
    if (this.user) {
      this.cartService.getIndirizzi(this.user.id).subscribe((response) => {
        this.indirizzi = response;
      });
    }
  }

  //prodotto in stringa per passarlo al backend
  arrayToString(): string {
    let result = '';
    this.items.forEach((item, index) => {
      for (let i = 0; i < item.amount; i++) {
        result += item.product.id + ',';
      }
    });
    return result;
  }

  //ordina prodotto
  ordina() {
    this.loading = true;
    const stringedArray = this.arrayToString();
    this.orderdService
      .newOrder({
        idIndirizzoDestinatario: this.selectedAddress.id,
        prodotti: stringedArray,
      })
      .subscribe({
        next: (response) => {
          this.toastr.success('Ordine effettuato con successo');
          this.cartService.clearCart();
          this.router.navigate(['/']);
          this.form.reset();
        },
        complete: () => (this.loading = false),
      });
  }

  //crea nuovo indirizzo
  createAddress() {
    this.loading = true;
    this.cartService
      .nuovoIndirizzo({ ...this.form.value, idUtente: this.user.id })
      .subscribe({
        next: (response) => {
          this.indirizzi.push(response);
          this.toastr.success('Nuovo indirizzo aggiunto');
        },
        complete: () => (this.loading = false),
      });
  }
}
