import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from './model-table/model-table.component';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private modelSource = new BehaviorSubject<{model: Model, modelName: string}[]>([]);
  currentModels = this.modelSource.asObservable();

  private selectedModelsSubject = new BehaviorSubject<Model[]>([]);
  selectedModels$ = this.selectedModelsSubject.asObservable();

  constructor() { }

  updateSelectedModels(models: Model[]) {
    this.selectedModelsSubject.next(models);
  }

}
