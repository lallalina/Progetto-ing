import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { DialogComponent } from './dialog/dialog.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';

import { OrderdService } from 'src/app/core/services/orderd.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

import { booking } from 'src/app/models/booking';
import { User, UserRole } from 'src/app/models/user.model';
import { Ordine } from 'src/app/models/ordine.model';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  /*variabili*/
  user: User;
  orders: Ordine[];
  prenotazioni: booking[];

  firstCall: boolean = true;

  loading: boolean;
  canDelete: boolean;
  isChecked: boolean;

  constructor(
    private orderService: OrderdService,
    private notifyService: NotificationsService,
    private auth: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    this.isChecked = this.user.notifiche;
    this.canDelete =
      this.user.role !== UserRole.ADMIN && this.user.role !== UserRole.BARBER;
    this.getOrdini();
  }

  /*PRODOTTI*/
  //get ordini utente
  getOrdini() {
    this.orderService.getOrdiniUtente(this.user.id).subscribe((response) => {
      this.orders = response;
    });
  }

  //dialog per la visualizzazione dei prodotti acquistati
  openDialogProdotti(prodotti: Ordine['prodotti']): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: prodotti,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  /*NOTIFICHE*/
  //disabilita notifiche
  notify() {
    this.notifyService.notifyDisable(this.user.id).subscribe({
      next: (response) => {
        this.isChecked = response;
        this.user.notifiche = response; //cambio valore notifiche dell'user
        this.auth.user = this.user;
        if (this.isChecked == true) {
          this.toastr.info('Notifiche attivate');
        } else {
          this.toastr.info('Notifiche disattivate');
        }
      },
    });
  }

  /*ELIMINAZIONE UTENTE*/
  //dialog per eliminare utente
  openDialogUtente(user: User) {
    this.dialog.open(DialogDeleteUserComponent, {
      data: { user: user.id, isAdmin: false },
    });
  }
}
