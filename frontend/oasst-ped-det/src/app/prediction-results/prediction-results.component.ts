import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prediction-results',
  templateUrl: './prediction-results.component.html',
  styleUrls: ['./prediction-results.component.css']
})
export class PredictionResultsComponent {
  selectedFiles: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const selectedFilesString = params['selectedFiles'];
      if (selectedFilesString) {
        this.selectedFiles = JSON.parse(selectedFilesString);
      }
    });
  }
  
}
