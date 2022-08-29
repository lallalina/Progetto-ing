import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Ordine } from 'src/app/models/ordine.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, //prendo il valore che gli passo con "data"
    @Inject(MAT_DIALOG_DATA) public data: Ordine['prodotti']
  ) {}

  ngOnInit(): void {}

  //chiudi dialog
  onOkClick(): void {
    this.dialogRef.close();
  }
}
