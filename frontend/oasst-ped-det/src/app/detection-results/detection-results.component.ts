import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detection-results',
  templateUrl: './detection-results.component.html',
  styleUrls: ['./detection-results.component.css']
})
export class DetectionResultsComponent {
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
