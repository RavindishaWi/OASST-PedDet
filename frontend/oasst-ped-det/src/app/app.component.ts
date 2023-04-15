import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oasst-ped-det';

  // default loader value is set to true
  loader = true;

  constructor(public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    // loader variable set to false after page load
    setTimeout(() => {
      this.loader = false;
    }, 0);
  }

  openAdminLogin() {
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
