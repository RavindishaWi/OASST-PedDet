import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.css']
})
export class ImageSelectionComponent implements OnInit {
  page: number = 1;
  imageUrls: string[] = [];
  selectedImages: string[] = [];

  imageUrl: any;
  uploadedImage: any;

  selectedFiles: any[] = [];
  isDragging = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.http.get<string[]>('http://127.0.0.1:5000/api/images').subscribe(urls => {
      this.imageUrls = urls;
    });
  }

  pageChanged(event: any): void {
    this.page = event;
  }

  files: { file: File, url: string }[] = [];

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file.type.match(/image\/*/) == null) {
      this.toastr.error('Only image files are allowed.');
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
    if (index === -1) {
      this.selectedImages.push(url);
    } else {
      this.selectedImages.splice(index, 1);
    }
  }
}
