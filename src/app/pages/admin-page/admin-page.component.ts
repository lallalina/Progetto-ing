import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Barber } from 'src/app/models/barber.model';
import { Product } from 'src/app/models/product.model';
import { Treatment } from 'src/app/models/treatment.model';

enum Pages {
  Calendar = 'Calendario',
  ProdsAndTreatments = 'Prodotti/Trattamenti',
  Users = 'Utenti',
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  form;
  admin;
  barbiere;
  prodotto;
  products: Product[] = [];
  treatments: Treatment[] = [];
  users: Barber[] = [];

  readonly Pages = Pages;
  currentPage: Pages;

  constructor(
    private router: Router,
    private auth: AuthService,
    private treatmentsService: TreatmentsService,
    private barbersService: BarbersService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.currentPage = Pages.Calendar;
    this.getProducts();
    this.getTrattamenti();
    this.getUsers();
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
      console.log(response);
      console.log('registrazione effettuata');
      this.router.navigate(['/login']);
    });
  }

  //METODI GET

  //prendi prodotti
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  //prendi trattamenti
  getTrattamenti() {
    this.treatmentsService.treatments$.subscribe(
      (treatments) => (this.treatments = treatments)
    );
  }

  //subscribe barbieri
  getUsers() {
    this.barbersService.getUsers().subscribe(([barbers, admins]) => {
      this.users = barbers.concat(admins);
      console.log(this.users);
    });
  }
}
