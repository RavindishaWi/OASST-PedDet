import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-selection',
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.css']
})
export class ModelSelectionComponent {

  constructor(private router: Router) { }

  proceedToModelSelection(): void {
    this.router.navigate(['/image-selection']);
  }
}
