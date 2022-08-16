import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrello: Cart;
  totale = 0;
  form;
  prodotto: Product[];
  indirizzi: [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      console.log(cart);
      this.carrello = cart;
    });
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
    sessionStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  //togli elementi dal carrello
  deletElement(id) {
    this.cartService.deletElement(id);
  }

  //pulisci carrello
  clearCart() {
    this.cartService.clearCart();
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
  ordina() {}
}
