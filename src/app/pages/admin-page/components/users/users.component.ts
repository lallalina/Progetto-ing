import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from 'src/app/pages/user-page/dialog-delete-user/dialog-delete-user.component';

import { BarbersService } from 'src/app/core/services/barbers.service';
import { ToastrService } from 'ngx-toastr';
import { RankingService } from 'src/app/core/services/ranking.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { Barber } from 'src/app/models/barber.model';
import { User, UserRole } from 'src/app/models/user.model';

/*utilizzo per filtri*/
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
  /*variabili*/
  @Output() rankingChanged = new EventEmitter<void>();
  @Input() set users(value: Barber[]) {
    this.usersList = value;
    this.tableData = this.usersList;
    this.applyActiveFilter();
  }

  usersList: Barber[];
  tableData: Barber[];
  barbersForm: FormGroup;
  adminsForm: FormGroup;

  user: User;
  isChecked: boolean;

  readonly FilterOptions = FilterOptions;
  activeFilter: FilterOptions = FilterOptions.All;

  loadingBarbers: boolean;
  loadingAdmins: boolean;
  loadingUsers: boolean;

  /*password variabili*/
  visible: boolean = true;
  changetype: boolean = true;
  visible2: boolean = true;
  changetype2: boolean = true;

  constructor(
    private barbersService: BarbersService,
    private toastr: ToastrService,
    private rankingService: RankingService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initBarbersForm();
    this.initAdminsForm();
    this.applyActiveFilter();
    this.user = this.auth.user;
    this.getRanking();
  }

  /*filtro per la table*/
  applyActiveFilter() {
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

  //controllo validità sezioni dei form
  initBarbersForm() {
    this.barbersForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl(''),
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

  //controllo validità sezioni dei form
  initAdminsForm() {
    this.adminsForm = new FormGroup({
      nome: new FormControl(''),
      mail: new FormControl('', [Validators.required, Validators.email]),
      cognome: new FormControl(''),
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
    this.barbersService.nuovoAdmin(this.adminsForm.value).subscribe({
      next: (response) => {
        this.adminsForm.reset();
        this.usersList.push(response);
        this.tableData = this.usersList;
      },
      complete: () => (this.loadingAdmins = false),
    });
  }

  //aggiungi nuovo parrucchiere
  addBarber() {
    this.loadingBarbers = true;
    this.barbersService.nuovoBarbiere(this.barbersForm.value).subscribe({
      next: (response) => {
        this.barbersForm.reset();
        this.usersList.push(response);
        this.tableData = this.usersList;
      },
      error: () => {
        this.loadingBarbers = false;
      },
      complete: () => (this.loadingBarbers = false),
    });
  }

  //cancella admin e barbieri
  deleteUser(user: Barber) {
    this.loadingUsers = true;
    if (user.role === UserRole.BARBER) {
      this.barbersService.deleteBarber(user.id).subscribe({
        next: (response) => {
          const usersIndex = this.usersList.findIndex(
            (item) => item.id === user.id
          );
          this.usersList.splice(usersIndex, 1);
          this.applyActiveFilter();
          this.toastr.warning('Utente eliminato');
        },
        complete: () => (this.loadingUsers = false),
      });
    } else {
      if (user.id === this.user.id) {
        this.dialog.open(DialogDeleteUserComponent, {
          data: { user: this.user.id, isAdmin: true },
        });
        this.dialog.afterAllClosed.subscribe(
          (_) => (this.loadingUsers = false)
        );
      }
    }
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

  /*get value ranking*/
  getRanking() {
    this.rankingService.getRanking().subscribe({
      next: (response) => {
        this.isChecked = response;
      },
    });
  }

  /*ranking barbieri*/
  barberRanking() {
    this.rankingService.ranking(this.tableData).subscribe({
      next: (response) => {
        this.isChecked = response;
        if (this.isChecked == true) {
          this.toastr.info('Ranking attivato');
        } else {
          this.toastr.info('Ranking disattivato');
        }
        this.rankingChanged.emit();
      },
    });
  }
}
