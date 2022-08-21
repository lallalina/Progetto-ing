import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() user: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  //modifica prodotto
  deleteUser(user) {
    this.auth.deleteUser(user.id).subscribe((response) => {});
  }
}
