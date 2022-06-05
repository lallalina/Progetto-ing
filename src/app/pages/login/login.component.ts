import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form;
  utente;
  id;
  error;
  hide = true;
  password;

  constructor(
    private auth: AuthService,
    private utils: UtilsService,
    private router: Router
  ) {}

  //per loggarsi -creazione di un altro form e submit
  login() {
    this.auth.login(this.form.mail, this.form.password).subscribe(
      (response) => {
        //viene eseguito solo dopo che il server risponde, response è l'oggetto che mi arriva dal server
        console.log(response);
        this.utils.salvaLogin();
        this.utente = response; //restituisce l'oggetto
      },
      (error) => {
        alert('Credenziali errate');
        this.error = error;
      },
      () => {
        this.id = this.utente.id;
        sessionStorage.setItem('id', this.id); //salvo l'id nel session storage
        this.router.navigate(['/']);
      }
    );
  }

  initForm() {
    //controllo validità sezioni del form 1
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
