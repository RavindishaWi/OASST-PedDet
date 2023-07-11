import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sst-ped-det';

  // routes that the home page container is excluded from
  excludedRoutes = ['/about', '/evaluation-results', '/model-selection', '/image-selection', '/detection-results'];

  // default loader value is set to true
  loader = true;

  constructor(public router: Router) { }

  ngOnInit(): void {
    // loader variable set to false after page load
    setTimeout(() => {
      this.loader = false;
    }, 0);
  }

  // display home container only for the routes that are not excluded
  shouldDisplayContainer(): boolean {
    return this.excludedRoutes.indexOf(this.router.url) === -1 && !this.loader;
  }

}
