import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public dialogRef: MatDialogRef<AdminLoginComponent>) {}

  ngOnInit() {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onLoginClick(): void {
    // Perform login logic here
    this.dialogRef.close();
  }
}
