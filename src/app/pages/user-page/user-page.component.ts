import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';

import { OrderdService } from 'src/app/core/services/orderd.service';

import { booking } from 'src/app/models/booking';
import { User, UserRole } from 'src/app/models/user.model';
import { DialogComponent } from './dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

import { Ordine } from 'src/app/models/ordine.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: User;
  orders: Ordine[];
  prenotazioni: booking[];

  firstCall: boolean = true;

  constructor(
    private orderService: OrderdService,
    private notifyService: NotificationsService,
    private auth: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  loading: boolean;
  canDelete: boolean;
  isChecked: boolean;

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
      console.log(this.orders);
    });
  }

  //dialog per la visualizzazione dei prodotti acquistati
  openDialogProdotti(prodotti: Ordine['prodotti']): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: prodotti,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  /*NOTIFICHE*/
  //disabilita notifiche
  notify() {
    this.notifyService.notifyDisable(this.user.id).subscribe({
      next: (response) => {
        this.isChecked = response;
        this.user.notifiche = response; //cambio valore notifiche dell'user
        this.auth.user = this.user;
        console.log(response);
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
    console.log(user);
    //this.loadingProds = true;
    this.dialog.open(DialogDeleteUserComponent, {
      data: user.id,
    });
  }
}
