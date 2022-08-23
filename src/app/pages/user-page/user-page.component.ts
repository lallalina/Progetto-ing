import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { booking } from 'src/app/models/booking';
import { User } from 'src/app/models/user.model';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  @Input() user: User[];
  prenotazioni: booking[];

  constructor(private auth: AuthService) {}

  isChecked: boolean;
  public dialog: MatDialog;

  ngOnInit(): void {}

  //get ordini utente
  GetOrdini() {
    this.auth.getOrdini().subscribe((response) => {
      console.log(response);
      /*this.prenotazioni = response;*/
    });
  }

  //disabilita notifiche
  Notify() {
    if (this.isChecked == true) {
      //chiamata per togliere notifica
    }
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
