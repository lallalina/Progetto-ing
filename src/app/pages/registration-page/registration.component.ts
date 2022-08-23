import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  newUser: User[];

  visible: boolean = true;
  changetype: boolean = true;

  visible2: boolean = true;
  changetype2: boolean = true;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  //chiamataAPI
  registration() {
    this.auth.registrazione(this.form.value).subscribe((response) => {
      this.newUser.push(response);
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
      email: new FormControl('', [Validators.required, Validators.email]),
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
