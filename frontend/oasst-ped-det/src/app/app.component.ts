import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oasst-ped-det';

  // routes that the home page container is excluded from
  excludedRoutes = ['/about', '/evaluation-results', '/model-selection', '/image-selection', '/detection-results'];

  // default loader value is set to true
  loader = true;
  isToolbarShrunk: boolean = false;
  isSmallScreen: boolean = false;

  constructor(public router: Router, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    // loader variable set to false after page load
    setTimeout(() => {
      this.loader = false;
    }, 0);

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.isToolbarShrunk = !this.isToolbarShrunk;
  }

  // display home container only for the routes that are not excluded
  shouldDisplayContainer(): boolean {
    return this.excludedRoutes.indexOf(this.router.url) === -1 && !this.loader;
  }

  // admin login
  openAdminLoginDialog() {
    const dialogRef = this.dialog.open(AdminProfileComponent, {
      width: '400px',
      disableClose: true // disable the default close behavior
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
