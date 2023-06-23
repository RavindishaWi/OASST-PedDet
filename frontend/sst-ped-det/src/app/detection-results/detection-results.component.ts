import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModelService } from '../model.service';
import { ImageService } from '../image.service';
import { DetectionResultsService } from '../DetectionResultsService';


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
    private imageService: ImageService,
    private detectionResultsService: DetectionResultsService
  ) {}


  // ngOnInit(): void {
  //   this.detectionResultsService.detectionResults$.subscribe(results => {
  //     console.log('Received detection results:', results);
  //     // Update the necessary variables in your component with the received results
  //     this.detectionResults = results;
  //   });
  // }

  ngOnInit(): void {
    this.detectionResultsService.detectionResults$.subscribe(results => {
      this.detectionResults = Object.keys(results).map(key => ({ image: key, ...results[key] }));
    });
  }
  
  popupImage: string | null = null;

openImagePopup(image: string): void {
  this.popupImage = image;
}

closeImagePopup(): void {
  this.popupImage = null;
}




  // ngOnInit(): void {
  //   this.modelService.selectedModels$.subscribe(models => {
  //     this.selectedModels = models;
  //   });
  
  //   this.imageService.selectedImages$.subscribe(images => {
  //     this.selectedImages = images;
  //   });
  
  //   this.applyModelsToImages();
  // }

  // private applyModelsToImages(): void {
  //   this.selectedModels.forEach(model => {
  //     this.selectedImages.forEach(image => {
  //       this.applyModelToImage(model.modelId, image);
  //     });
  //   });
  // }

  // private applyModelToImage(modelId: string, image: string): void {
  //   this.http.post('http://localhost:5000/api/detect', {
  //     model: modelId,
  //     imageUrl: image
  //   }).subscribe(response => {
  //     console.log(response)
  //     this.detectionResults.push({
  //       model: modelId,
  //       image: image,
  //       result: response
  //     });
  //   });
  // }

}
