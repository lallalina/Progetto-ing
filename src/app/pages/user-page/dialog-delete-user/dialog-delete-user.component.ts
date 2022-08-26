import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.css'],
})
export class DialogDeleteUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User['id'],
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loading: boolean;

  ngOnInit(): void {}

  //cancella utente
  deleteUser() {
    console.log(this.data);
    this.loading = true;
    this.auth.deleteUser(this.data).subscribe({
      next: (response) => {
        this.toastr.warning('Utente eliminato');
        this.router.navigate(['/']);
      },
      complete: () => {
        this.loading = false;
        this.dialogRef.close();
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
