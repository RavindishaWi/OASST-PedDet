import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prediction-results',
  templateUrl: './prediction-results.component.html',
  styleUrls: ['./prediction-results.component.css']
})
export class PredictionResultsComponent {
  selectedFiles: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const selectedFilesString = params['selectedFiles'];
      if (selectedFilesString) {
        this.selectedFiles = JSON.parse(selectedFilesString);
      }
    });
  }

  // Define a function to send an HTTP POST request to the Flask backend
predictImages(images: File[]) {
  const url = 'http://myflaskbackend.com/predict';
  const formData = new FormData();
  for (const image of images) {
    formData.append('image', image);
  }
  return this.http.post(url, formData);
}
  
}
