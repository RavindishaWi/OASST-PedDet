import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModelService } from '../model.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-detection-results',
  templateUrl: './detection-results.component.html',
  styleUrls: ['./detection-results.component.css']
})
export class DetectionResultsComponent {
  selectedModels: any[] = [];
  selectedImages: any[] = [];
  detectionResults: any[] = [];

  constructor(
    private http: HttpClient,
    private modelService: ModelService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.modelService.selectedModels$.subscribe(models => {
      this.selectedModels = models;
    });
  
    this.imageService.selectedImages$.subscribe(images => {
      this.selectedImages = images;
    });
  
    this.applyModelsToImages();
  }

  private applyModelsToImages(): void {
    this.selectedModels.forEach(model => {
      this.selectedImages.forEach(image => {
        this.applyModelToImage(model.modelId, image);
      });
    });
  }

  private applyModelToImage(modelId: string, image: string): void {
    this.http.post('http://localhost:5000/api/detect', {
      model: modelId,
      imageUrl: image
    }).subscribe(response => {
      this.detectionResults.push({
        model: modelId,
        image: image,
        result: response
      });
    });
  }
}
