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

  constructor(
    private router: Router,
    private auth: AuthService,
    private utils: UtilsService,
    private ajax: AjaxService
  ) {}

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
    //controllo validità sezioni del form 2
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
      role: new FormControl('', [Validators.required]),
    });
  }

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
  }
}
