import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ordine } from 'src/app/models/ordine.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ordine['prodotti']
  ) {}

  ngOnInit(): void {}

  onOkClick(): void {
    this.dialogRef.close();
  }

  /*cancella utente
  deleteUser(user) {
    this.auth.deleteUser(user.id).subscribe((response) => {});
  }*/
}
