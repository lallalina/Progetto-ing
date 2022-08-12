import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrello: Cart;
  totale = 0;
  form;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  /*ngDoCheck(){
    this.totale=0;
    //calcolo totale dei prodotti
    this.carrello.forEach(element => {
      this.totale += element.reservation_items[0].price;
    });

    saveCart(){
    sessionStorage.setItem('carrello', JSON.stringify(this.carrello))
  }
  }*/

  initForm() {
    //controllo validità sezioni
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      console.log(cart)
      this.carrello = cart
    })
    this.initForm();
  }

  ordina() { }
}
