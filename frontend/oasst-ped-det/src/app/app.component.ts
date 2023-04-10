import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oasst-ped-det';

  // default loader value is set to true
  loader = true;

  constructor(public router: Router) { }

  ngOnInit(): void {
    // loader variable set to false after page load
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }

}
