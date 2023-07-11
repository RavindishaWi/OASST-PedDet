import { Component } from '@angular/core';
import { DetectionResultsService } from '../detection-results.service';

@Component({
  selector: 'app-detection-results',
  templateUrl: './detection-results.component.html',
  styleUrls: ['./detection-results.component.css']
})
export class DetectionResultsComponent {
  detectionResults: any[] = [];

  popupImage: string | null = null;

  constructor(
    private detectionResultsService: DetectionResultsService
  ) {}

  ngOnInit(): void {
    this.detectionResultsService.detectionResults$.subscribe(results => {
      this.detectionResults = Object.keys(results).map(key => ({ original_image: key, ...results[key] }));
    });
  }

  openImagePopup(image: string): void {
    this.popupImage = image;
  }

  closeImagePopup(): void {
    this.popupImage = null;
  }

}
