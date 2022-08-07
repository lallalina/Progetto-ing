import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { Barber } from 'src/app/models/barber.model';
import { UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() users: Barber[];

  barbersForm: FormGroup;
  adminsForm: FormGroup;

  constructor(
    private barbersService: BarbersService,
    private ajax: AjaxService
  ) {}

  ngOnInit(): void {
    this.initBarbersForm();
    this.initAdminsForm();
  }

  initBarbersForm() {
    //controllo validità sezioni dei form
    this.barbersForm = new FormGroup({
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

  initAdminsForm() {
    //controllo validità sezioni dei form
    this.adminsForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  //aggiungi nuovo admin
  addAdmin() {
    this.ajax.nuovoAdmin(this.adminsForm.value).subscribe((response) => {
      console.log(response);
      // this.admin = response;
    });
  }

  //aggiungi nuovo parrucchiere
  addBarber() {
    this.barbersService
      .nuovoBarbiere(this.barbersForm.value)
      .subscribe((response) => {
        console.log(response);
        //this.barbiere = response;
      });
  }
}
