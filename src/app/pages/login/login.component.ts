import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../core/services/utils.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
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

  //per loggarsi
  login() {
    this.auth
      .login(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .subscribe(
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

  fakeLogin() {
    console.log('fakelogin');
    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;
    console.log(email, password);
    this.auth.mockLogin(email, password);
    let user = this.auth.user;
    console.log(user);
    if (user) {
      this.utils.salvaLogin();
      this.id = user.id;
      sessionStorage.setItem('id', this.id); //salvo l'id nel session storage
      switch (user.role) {
        case UserRole.ADMIN: {
          this.router.navigate(['admin']);
          break;
        }
        case UserRole.CUSTOMER: {
          this.router.navigate(['home']);
          break;
        }
        case UserRole.RESPONSIBLE: {
          this.router.navigate(['responsible']);
          break;
        }
        default: {
          this.router.navigate(['']);
          break;
        }
      }
    }
  }
}
