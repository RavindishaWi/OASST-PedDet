import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { ImageService } from 'src/app/image.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Model } from '../model-table/model-table.component';
import { ModelService } from '../model.service';
import { DetectionResultsService } from '../DetectionResultsService';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.css']
})
export class ImageSelectionComponent implements OnInit {
  page: number = 1;
  imageUrls: string[] = [];
  selectedImages: string[] = [];
  selectedModels: Model[] = [];

  imageUrl: any;
  uploadedImage: any;

  selectedFiles: any[] = [];
  isDragging = false;
  errorMessage: string | null = null;

  isSignedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private location: Location,
    private authService: AuthService,
    private imageService: ImageService,
    private modelService: ModelService,
    private detectionResultsService: DetectionResultsService
    ) { }

  ngOnInit(): void {
    this.http.get<string[]>('http://127.0.0.1:5000/api/images').subscribe(urls => {
      this.imageUrls = urls;
    });

    this.modelService.selectedModels$.subscribe(models => {
      this.selectedModels = models;
    });
  }

  get isUserSignedIn(): boolean {
    return this.authService.isUserSignedIn;
  }

  //paginator controls
  pageChanged(event: any): void {
    this.page = event;
  }

  files: { file: File, url: string }[] = [];

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file.type.match(/image\/*/) == null) {
      this.toastr.error('Only image files are allowed for testing.', '', {
        closeButton: true,
        progressBar: true,
        timeOut: 5000,
        extendedTimeOut: 2000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    if (this.selectedFiles.length >= 3) {
      this.toastr.warning('You can upload a maximum of 3 images.', '', {
        closeButton: true,
        progressBar: true,
        timeOut: 5000,
        extendedTimeOut: 2000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.errorMessage = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFiles.push({
        name: file.name,
        url: reader.result as string
      });
    };
  }

  onFileDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onFileDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onFileDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(/image\/*/) == null) {
        this.errorMessage = 'Only image files are allowed.';
        return;
      }

      if (this.selectedFiles.length >= 3) {
        this.toastr.warning('You can upload a maximum of 3 images.', 'Warning', {
          closeButton: true,
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 2000,
          positionClass: 'toast-bottom-right'
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFiles.push({
          name: file.name,
          url: reader.result as string
        });
      };
    }
    this.errorMessage = '';
    this.isDragging = false;
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }

  async getFileUrl(file: File): Promise<string> {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
          reader.onload = () => {
              resolve(reader.result as string);
          };
          reader.onerror = () => {
              reject(reader.error);
          };
          reader.readAsDataURL(file);
      });
  }

  toggleSelection(url: string) {
    const index = this.selectedImages.indexOf(url);
    if (index === -1 && this.selectedImages.length < 3) {
        // image is not already selected and less than 3 images are selected
        this.selectedImages.push(url);
        const file = this.imageUrls.find(image => image === url);
        if (file) {
            this.selectedFiles.push({
                name: file.split('/').pop(),
                url: file
            });
        }
    } else if (index !== -1) {
        // image is already selected, remove it from the selectedImages array
        this.selectedImages.splice(index, 1);
        const selectedFileIndex = this.selectedFiles.findIndex(file => file.url === url);
        if (selectedFileIndex !== -1) {
            this.selectedFiles.splice(selectedFileIndex, 1);
        }
    } else {
        // image is not added when more than 3 images are already selected
        this.toastr.warning('You can select a maximum of 3 images.', 'Warning', {
          closeButton: true,
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 2000,
          positionClass: 'toast-bottom-right'
      });
    }
  
    // update the service with the new selection
    this.imageService.updateSelectedImages(this.selectedImages);
  }

  goBack() {
    this.location.back();
  }
  
  // navigate to detection results page
  // proceedToDetection(): void {
  //   if (this.selectedModels.length > 0) {
  //     const modelId = this.selectedModels[0].modelId;

  //     this.imageService.updateSelectedImages(this.selectedImages);

  //     this.http.post('http://127.0.0.1:5000/api/detect', { 
  //       imageUrls: this.selectedImages, 
  //       modelId: modelId 
  //     }).subscribe(
  //       results => {
  //         // Handle successful results here
  //         console.log(results)
  //         this.router.navigate(['/detection-results']);
  //       },
  //       error => {
  //         console.error('There was an error with the detection API:', error);
  //       }
  //     );
  //   } else {
  //     // Handle the case when no model is selected
  //   }
  // }


    // navigate to detection results page
  proceedToDetection(): void {
    if (this.selectedModels.length > 0) {
      const modelId = this.selectedModels[0].modelId;

      this.imageService.updateSelectedImages(this.selectedImages);

      this.http.post('http://127.0.0.1:5000/api/detect', { 
        imageUrls: this.selectedImages, 
        modelId: modelId 
      }).subscribe(
        results => {
          // Handle successful results here
          console.log(results)
          this.detectionResultsService.updateDetectionResults(results);
          this.router.navigate(['/detection-results']);
        },
        error => {
          console.error('There was an error with the detection API:', error);
        }
      );
    } else {
      // Handle the case when no model is selected
    }
  }


  addImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length) {
      const file = target.files[0];

      // check if the file is an image
      if (!file.type.startsWith('image/')) {
          this.toastr.error('Please upload an image file', 'Error', {
              closeButton: true,
              progressBar: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
              positionClass: 'toast-bottom-right'
          });
          return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.http.post<{ url: string }>('http://localhost:5000/upload', formData).subscribe(response => {
          const url = response.url;
          this.toastr.success('Image uploaded to the database', 'Success', {
              closeButton: true,
              progressBar: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
              positionClass: 'toast-bottom-right'
          });
      });
    }
  }

}
