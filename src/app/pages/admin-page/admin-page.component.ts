import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { OrderdService } from 'src/app/core/services/orderd.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';

import { Barber } from 'src/app/models/barber.model';
import { Ordine } from 'src/app/models/ordine.model';
import { Product } from 'src/app/models/product.model';
import { Treatment } from 'src/app/models/treatment.model';

/*sezioni per le pagine*/
enum Pages {
  Calendar = 'Calendario',
  ProdsAndTreatments = 'Prodotti/Trattamenti',
  Users = 'Utenti',
  Orders = 'Ordini',
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  /*variabili*/
  form;
  admin;
  barbiere;
  prodotto;
  currentPage: Pages;
  products: Product[] = [];
  treatments: Treatment[] = [];
  users: Barber[] = [];
  orders: Ordine[] = [];
  readonly Pages = Pages;

  constructor(
    private router: Router,
    private auth: AuthService,
    private treatmentsService: TreatmentsService,
    private barbersService: BarbersService,
    private productService: ProductsService,
    private orderService: OrderdService
  ) {}

  ngOnInit(): void {
    this.currentPage = Pages.Calendar;
    this.getProducts();
    this.getTrattamenti();
    this.getUsers();
    this.getOrder();
  }

  //Switch page
  switchPage(page: Pages) {
    this.currentPage = page;
  }

  //CONTROLLI
  printData() {
    console.log(this.form.value);
    //per registrarsi
    this.auth.registrazione(this.form.value).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

  //METODI GET

  //prendi prodotti
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  //prendi trattamenti
  getTrattamenti() {
    this.treatmentsService.treatments$.subscribe(
      (treatments) => (this.treatments = treatments)
    );
  }

  //prendi barbieri/admin
  getUsers() {
    this.barbersService.getUsers().subscribe(([barbers, admins]) => {
      this.users = barbers.concat(admins);
    });
  }

  //aggiornare i barbieri non appena attivato il ranking
  refreshUsers() {
    this.barbersService.getBarbers().subscribe((_) => {});
    this.getUsers();
  }

  //prendi ordini di tutti gli utenti
  getOrder() {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response;
    });
  }
}
