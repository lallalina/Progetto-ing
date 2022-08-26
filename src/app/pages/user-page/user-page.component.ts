import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';

import { OrderdService } from 'src/app/core/services/orderd.service';

import { booking } from 'src/app/models/booking';
import { User } from 'src/app/models/user.model';
import { DialogComponent } from './dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Ordine } from 'src/app/models/ordine.model';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  @Input() user: User;
  @Input() orders: Ordine[];
  prenotazioni: booking[];

  constructor(
    private orderService: OrderdService,
    private notifyService: NotificationsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public dialog: MatDialog;
  loading: boolean;

  ngOnInit(): void {}

  //get ordini utente
  getOrdini() {
    this.orderService.getOrdiniUtente().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
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

  //dialog per eliminare utente
  openDialog(user: User) {
    console.log(user);
    //this.loadingProds = true;
    this.dialog.open(DialogComponent, {
      data: user,
      width: '520px',
      height: '520px',
    });
  }
}
