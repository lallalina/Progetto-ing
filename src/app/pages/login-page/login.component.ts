import { Component, OnInit } from '@angular/core';
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
  password;
  credentials;
  visible: boolean = true;
  changetype: boolean = true;

  loading: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  //per loggarsi
  login() {
    this.loading = true;
    const data = {
      username: this.form.controls['mail'].value,
      password: this.form.controls['password'].value,
    };
    this.auth.login(data).subscribe({
      next: (response) => (this.utente = this.auth.user),
      error: (err) => {
        alert('Credenziali errate');
        this.error = err;
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.id = this.utente.id;
        sessionStorage.setItem('id', this.id); //salvo l'id nel session storage
        this.router.navigate(['/']);
      },
    });
  }

  //show Password
  show() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  //controllo validità sezioni del form
  initForm() {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  //controllo dei ruoli
  checkRole() {}
}
