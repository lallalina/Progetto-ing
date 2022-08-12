import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrello: Cart[];
  totale = 0;
  form;

  constructor(private router: Router) {}

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
      città: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.carrello = JSON.parse(sessionStorage.getItem('carrello'));
    this.initForm();
  }

  ordina() {}
}
