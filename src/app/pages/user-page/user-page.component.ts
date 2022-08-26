import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';

import { OrderdService } from 'src/app/core/services/orderd.service';

import { booking } from 'src/app/models/booking';
import { User, UserRole } from 'src/app/models/user.model';
import { DialogComponent } from './dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Ordine } from 'src/app/models/ordine.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: User;
  orders: Ordine[];
  prenotazioni: booking[];

  constructor(
    private orderService: OrderdService,
    private notifyService: NotificationsService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public dialog: MatDialog;
  loading: boolean;
  isAdmin: boolean;

  ngOnInit(): void {
    this.user = this.auth.user;
    this.isAdmin = this.user.role === UserRole.ADMIN;
    this.getOrdini();
  }

  //get ordini utente
  getOrdini() {
    this.orderService.getOrdiniUtente(this.user.id).subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
    });
  }

  //dialog per la visualizzazione dei prodotti acquistati
  openDialog(prodotti: Ordine['prodotti']): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: prodotti,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //disabilita notifiche
  notify(user: User) {
    this.loading = true;
    this.notifyService.notifyDisable(user).subscribe({
      next: (response) => {
        this.toastr.success('Cancellazione effettuata');
        user = response;
        console.log(response);
        this.router.navigate(['/']);
      },
      complete: () => (this.loading = false),
    });
  }
}
