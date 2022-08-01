import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';

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
  product = [];
  treatments = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private utils: UtilsService,
    private ajax: AjaxService
  ) {}

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

  initRegistrazione() {
    //controllo validità sezioni dei form
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confPassword: new FormControl('', Validators.required),
      cellulare: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      url: new FormControl('', Validators.required),
    });
  }

  initProdotto() {
    //controllo validità sezioni prodotto
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
    });
  }

  initTrattamento() {
    //controllo validità sezioni prodotto
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      durata: new FormControl('', Validators.required),
    });
  }

  //AGGIUNGI-CANCELLA-PRENDI-----

  //PRODOTTI

  //aggiungi nuovo prodotto
  addProdotto() {
    this.ajax.addProdotto(this.form.value).subscribe((response) => {
      console.log(response);
      this.admin = response;
    });
  }

  //prendi prodotto
  getProdotto() {
    this.ajax.prodotti().subscribe((response) => {
      console.log(response);
      this.product = response;
    });
  }

  //cancella prodotto
  deleteProdotto() {
    this.ajax.deleteProdotto(this.form.value).subscribe((response) => {
      console.log(response);
      this.admin = response;
    });
  }

  //TRATTAMENTI

  //aggiungi nuovo trattamento
  addTrattamento() {
    this.ajax.addTrattamento(this.form.value).subscribe((response) => {
      console.log(response);
      this.admin = response;
    });
  }

  //prendi trattamento
  getTrattamento() {
    this.ajax.trattamenti().subscribe((response) => {
      console.log(response);
      this.treatments = response;
    });
  }

  //cacnella trattamento
  deleteTrattamento() {
    this.ajax.deleteTrattamento(this.form.value).subscribe((response) => {
      console.log(response);
      this.admin = response;
    });
  }

  //UTENTI

  //aggiungi nuovo admin
  addAdmin() {
    this.ajax.nuovoAdmin(this.form.value).subscribe((response) => {
      console.log(response);
      this.admin = response;
    });
  }

  //aggiungi nuovo parrucchiere
  addBarbiere() {
    this.ajax.nuovoBarbiere(this.form.value).subscribe((response) => {
      console.log(response);
      this.barbiere = response;
    });
  }

  ngOnInit(): void {
    this.initRegistrazione();
    this.initProdotto();
    this.initTrattamento;
  }
}
