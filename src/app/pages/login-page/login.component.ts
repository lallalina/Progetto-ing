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
  credentials;

  constructor(
    private auth: AuthService,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  //per loggarsi
  login() {
    const data = {
      username: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
    this.auth.login(data).subscribe({
      next: (response) => (this.utente = this.auth.user),
      error: (err) => {
        alert('Credenziali errate');
        this.error = err;
      },
      complete: () => {
        this.id = this.utente.id;
        sessionStorage.setItem('id', this.id); //salvo l'id nel session storage
        this.router.navigate(['/']);
      },
    });
  }

  //controllo validità sezioni del form
  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  //controllo dei ruoli
  checkRole() {}
}
