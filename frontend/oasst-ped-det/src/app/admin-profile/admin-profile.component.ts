import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AdminProfileComponent>) {}

  ngOnInit() {}

  openSideDialog() {
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
      console.log('The dialog was closed');
    });
  }
}
