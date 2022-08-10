import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrello = [];
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
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.carrello = JSON.parse(sessionStorage.getItem('carrello'));
    this.initForm();
  }
}
