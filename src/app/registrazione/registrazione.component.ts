import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../ajax.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  form;

  constructor(
    private router: Router,
    private ajax: AjaxService,
    private utils: UtilsService

  ) { }


   printData() {
    console.log(this.form.value);
    //per registrarsi
    this.ajax.registrazione(
      this.form.value
    ).subscribe((response) => {
      console.log(response);
      console.log("registrazione effettuata");
      this.router.navigate(['/login'])
    })
  }


  initRegistrazione() {

    //controllo validità sezioni del form 2
    this.form = new FormGroup({
      nome: new FormControl("", Validators.required),
      cognome: new FormControl("", Validators.required),
      mail: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confPassword: new FormControl("", Validators.required),
      cellulare: new FormControl("", [Validators.required, Validators.minLength(10)]),
      role: new FormControl("", [Validators.required]) 
    })
  }

    ngOnInit(): void {
      this.initRegistrazione()
    }

}
