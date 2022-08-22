import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { Barber } from 'src/app/models/barber.model';
import * as _ from 'lodash';
import { UserRole } from 'src/app/models/user.model';

enum FilterOptions {
  All = 'Tutti',
  Barbers = 'Barbieri',
  Admins = 'Amministratori',
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() set users(value: Barber[]) {
    this.usersList = value;
    this.tableData = this.usersList;
  }

  usersList: Barber[];
  tableData: Barber[];
  barbersForm: FormGroup;
  adminsForm: FormGroup;

  readonly FilterOptions = FilterOptions;
  activeFilter: FilterOptions = FilterOptions.All;

  loadingBarbers: boolean;
  loadingAdmins: boolean;

  constructor(
    private barbersService: BarbersService,
    private ajax: AjaxService
  ) {}

  ngOnInit(): void {
    this.initBarbersForm();
    this.initAdminsForm();
    this.applyActiveFilter();
  }

  applyActiveFilter() {
    console.log(this.activeFilter);
    switch (this.activeFilter) {
      case FilterOptions.Barbers: {
        this.tableData = _.filter(this.usersList, ['role', UserRole.BARBER]);
        break;
      }
      case FilterOptions.Admins: {
        this.tableData = _.filter(this.usersList, ['role', UserRole.ADMIN]);
        break;
      }
      default: {
        this.tableData = this.usersList;
        break;
      }
    }
  }

  initBarbersForm() {
    //controllo validità sezioni dei form
    this.barbersForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  initAdminsForm() {
    //controllo validità sezioni dei form
    this.adminsForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  //aggiungi nuovo admin
  addAdmin() {
    this.loadingAdmins = true;
    this.barbersService.nuovoAdmin(this.adminsForm.value).subscribe(
      {
        next: (response) => {
          this.adminsForm.reset();
          this.usersList.push(response);
          this.tableData = this.usersList;
          console.log(response);
        },
        complete: () => (this.loadingAdmins = false),
      } /*(response) => {
        // this.admin = response;
      }*/
    );
  }

  //aggiungi nuovo parrucchiere
  addBarber() {
    this.loadingBarbers = true;
    console.log(this.barbersForm.value);
    this.barbersService.nuovoBarbiere(this.barbersForm.value).subscribe(
      {
        next: (response) => {
          this.barbersForm.reset();
          this.usersList.push(response);
          this.tableData = this.usersList;
        },
        error: () => {
          this.loadingBarbers = false;
        },
        complete: () => (this.loadingBarbers = false),
      } /*(response) => {
        //this.barbiere = response;
      }*/
    );
  }

  //cancella admin e barbieri
  deleteUser(user: Barber) {
    if (user.role == UserRole.BARBER) {
      this.barbersService.deleteBarber(user.id).subscribe({
        next: (response) => {
          const prodIndex = this.tableData.findIndex(
            (item) => item.id === user.id
          );
          this.tableData.splice(prodIndex, 1);
        },
      });
    } else {
      this.barbersService.deleteAdmin(user.id).subscribe({
        next: (response) => {
          const prodIndex = this.tableData.findIndex(
            (item) => item.id === user.id
          );
          this.tableData.splice(prodIndex, 1);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
