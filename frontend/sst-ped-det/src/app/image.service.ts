import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private selectedImagesSubject = new BehaviorSubject<string[]>([]);
  selectedImages$ = this.selectedImagesSubject.asObservable();

  updateSelectedImages(images: string[]) {
    this.selectedImagesSubject.next(images);
  }
}
