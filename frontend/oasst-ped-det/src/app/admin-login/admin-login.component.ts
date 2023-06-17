import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(public dialogRef: MatDialogRef<AdminLoginComponent>, public auth: AngularFireAuth, private toastr: ToastrService) {}

  ngOnInit() {}

  onLoginClick(): void {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // Send user.getIdToken to server for verification
        // ...
        this.toastr.success('Login successful', 'Success', {
          timeOut: 5000, // Set the duration of the toastr notification
          progressBar: true, // Display a progress bar
          closeButton: true, // Display a close button
          positionClass: 'toast-bottom-right', // Set the position of the toastr notification
        });
        this.dialogRef.close();
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.errorMessage = 'Invalid email or password.';
            break;
          case 'auth/user-disabled':
            this.errorMessage = 'This user has been disabled.';
            break;
          default:
            this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
  }

  // Close dialog on cancel request
  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}
