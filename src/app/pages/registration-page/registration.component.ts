import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  visible: boolean = true;
  changetype: boolean = true;

  visible2: boolean = true;
  changetype2: boolean = true;

  loading: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  //chiamataAPI
  registration() {
    this.loading = true;
    this.auth.registrazione(this.form.value).subscribe({
      next: (response) => {
        this.toast.success('Registrazione avvenuta con successo');
        this.router.navigate(['/login']);
      },
      complete: () => this.loading = false
    });
  }

  //show Password
  show() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  //show checkPassword
  show2() {
    this.visible2 = !this.visible2;
    this.changetype2 = !this.changetype2;
  }

  //controllo validità sezioni del form
  initForm() {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', Validators.required),
      cognome: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
