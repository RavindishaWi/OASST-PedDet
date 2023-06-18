import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AdminProfileComponent>, public auth: AngularFireAuth) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        console.log('User is signed in');
        // Handle any additional logic for signed-in users here
      } else {
        console.log('User is signed out');
        // Handle any additional logic for signed-out users here
      }
    });
  }

  openSideDialog() {
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
      console.log('The dialog was closed');
    });
  }

  // onSignOutClick(): void {
  //   this.auth.signOut()
  //     .then(() => {
  //       // You've been signed out successfully!
  //       // Navigate to the desired page after signing out, if necessary
  //       // this.router.navigate(['/login']);
  //     })
  //     .catch((error) => {
  //       // An error occurred while signing out
  //       console.error(error);
  //     });
  // }

  onSignOutClick(): void {
    // sign out 
    this.auth.signOut().then(() => {
      this.dialogRef.close();
    });
  }
}
