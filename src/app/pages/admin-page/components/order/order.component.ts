import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ordine } from 'src/app/models/ordine.model';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() orders: Ordine[];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  //dialog per la visualizzazione dei prodotti acquistati
  openDialog(prodotti: Ordine['prodotti']): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: prodotti
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
