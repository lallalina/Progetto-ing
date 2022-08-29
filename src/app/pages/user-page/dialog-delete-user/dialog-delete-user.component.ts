import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { BarbersService } from 'src/app/core/services/barbers.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.css'],
})
export class DialogDeleteUserComponent implements OnInit {
  /*variabili*/
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User['id']; isAdmin: boolean },
    private auth: AuthService,
    private barbersService: BarbersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //cancella utente
  deleteUser() {
    console.log(this.data);
    this.loading = true;
    if (this.data.isAdmin) {
      this.barbersService.deleteAdmin(this.data.user).subscribe({
        next: (response) => {
          this.toastr.warning('Utente eliminato');
          this.router.navigate(['']);
        },
        complete: () => {
          this.data = null;
          this.auth.logout();
          this.dialogRef.close();
        },
      });
    } else {
      this.auth.deleteUser(this.data.user).subscribe({
        next: (response) => {
          this.toastr.warning('Utente eliminato');
          this.router.navigate(['']);
        },
        complete: () => {
          this.data = null;
          this.auth.logout();
          this.dialogRef.close();
        },
      });
    }
  }

  //chiudi dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}
