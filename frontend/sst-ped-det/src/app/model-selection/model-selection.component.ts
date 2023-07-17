import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model-selection',
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.css']
})
export class ModelSelectionComponent {

  constructor(private router: Router, private location: Location) { }

  // navigate to image selection page
  proceedToModelSelection(): void {
    this.router.navigate(['/image-selection']);
  }

  goBack() {
    this.location.back();
  }
}
