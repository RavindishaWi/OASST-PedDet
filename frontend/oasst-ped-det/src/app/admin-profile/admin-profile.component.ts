import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  isSignedIn = false;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AdminProfileComponent>, public auth: AngularFireAuth,
    private toastr: ToastrService) {}

  ngOnInit() {
    // admin sign in check
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    });
  }

  openSideDialog() {
    // open admin login dialog
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '450px',
      disableClose: false // disable outside click closing option
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }

  onSignOutClick(): void {
    // sign out from the application
    this.auth.signOut().then(() => {
      // close dialog
      this.dialogRef.close();

      // show sign out information
      this.toastr.info('User is signed out', 'Info', {
        timeOut: 5000, // set the duration of the toastr notification
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-bottom-right',
      });
    })
    // show error message for failed sign out
    .catch(() => {
      this.toastr.error('An error occurred while signing out', 'Error', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-bottom-right',
      });
    });
  }
}
