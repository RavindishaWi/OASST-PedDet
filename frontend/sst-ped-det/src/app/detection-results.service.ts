import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetectionResultsService {
  private detectionResultsSubject = new BehaviorSubject<any>(null);
  public detectionResults$ = this.detectionResultsSubject.asObservable();

  updateDetectionResults(results: any): void {
    this.detectionResultsSubject.next(results);
  }
}
