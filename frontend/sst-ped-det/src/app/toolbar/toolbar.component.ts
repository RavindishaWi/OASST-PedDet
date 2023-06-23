import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isToolbarShrunk: boolean = false;
  isSmallScreen: boolean = false;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  toggleMenu() {
    this.isToolbarShrunk = !this.isToolbarShrunk;
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  // admin login
  openAdminLoginDialog() {
    const dialogRef = this.dialog.open(AdminProfileComponent, {
      width: '400px',
      // allow closing dialog on clicking outside
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
