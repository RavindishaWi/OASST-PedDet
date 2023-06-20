import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    public dialogRef: MatDialogRef<AdminLoginComponent>,
    private authService: AuthService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onLoginClick(): void {
    this.authService.signInUser(this.email, this.password)
    .then((userCredential) => {
      // signed in 
      var user = userCredential.user;
      if (user) {
        user.getIdToken().then(idToken => {
          // send idToken to the server for verification
          this.http.post('http://127.0.0.1:5000/auth', { idToken: idToken }, { headers: { 'Content-Type': 'application/json' } }).subscribe(
            (response) => {
              this.toastr.success('Login successful', 'Success', {
                timeOut: 5000,
                progressBar: true,
                closeButton: true,
                positionClass: 'toast-bottom-right',
              });
              this.successMessage = 'Login successful';
              this.dialogRef.close();
            },
            (error) => {
              this.toastr.error('An error occurred during server-side token verification. Please try again.', 'Error', {
                timeOut: 5000,
                progressBar: true,
                closeButton: true,
                positionClass: 'toast-bottom-right',
              });
              this.dialogRef.close();
            }
          );
        });
      }
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

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
}
