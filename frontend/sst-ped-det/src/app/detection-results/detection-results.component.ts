import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModelService } from '../model.service';
import { ImageService } from '../image.service';
import { DetectionResultsService } from '../detection-results.service';


@Component({
  selector: 'app-detection-results',
  templateUrl: './detection-results.component.html',
  styleUrls: ['./detection-results.component.css']
})
export class DetectionResultsComponent {
  selectedModels: any[] = [];
  selectedImages: any[] = [];
  detectionResults: any[] = [];

  popupImage: string | null = null;

  constructor(
    private http: HttpClient,
    private modelService: ModelService,
    private imageService: ImageService,
    private detectionResultsService: DetectionResultsService
  ) {}

  ngOnInit(): void {
    this.detectionResultsService.detectionResults$.subscribe(results => {
      this.detectionResults = Object.keys(results).map(key => ({ image: key, ...results[key] }));
    });
  }

  openImagePopup(image: string): void {
    this.popupImage = image;
  }

  closeImagePopup(): void {
    this.popupImage = null;
  }

}
