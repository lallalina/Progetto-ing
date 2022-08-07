import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { UtilsService } from 'src/app/core/services/utils.service';
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
  products = [];
  treatments: Treatment[] = [];

  readonly Pages = Pages;
  currentPage: Pages;

  constructor(
    private router: Router,
    private auth: AuthService,
    private utils: UtilsService,
    private ajax: AjaxService,
    private treatmentsService: TreatmentsService,
    private barbersService: BarbersService
  ) {}

  ngOnInit(): void {
    this.currentPage = Pages.Calendar;
    this.getTrattamenti();
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

  //PRODOTTI

  //prendi prodotto
  getProdotto() {
    this.ajax.prodotti().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  //prendi trattamento
  getTrattamenti() {
    this.treatmentsService.treatments$.subscribe(
      (treatments) => (this.treatments = treatments)
    );
  }

  //cacnella trattamento
  deleteTrattamento() {
    this.treatmentsService
      .deleteTreatment(this.form.value)
      .subscribe((response) => {
        console.log(response);
        //this.admin = response;
      });
  }
}
