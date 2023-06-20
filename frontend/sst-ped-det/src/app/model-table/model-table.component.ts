import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ModelService } from 'src/app/model.service';

// Model interface
export interface Model {
  modelId: string;
  modelName: string;
  backbone: string;
  description: string;
  modelRef: string;
}

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent {

  displayedColumns: string[] = ['select', 'modelId', 'modelName', 'backbone', 'description'];
  dataSource = new MatTableDataSource<Model>();
  selection = new SelectionModel<Model>(true, []);

  selectedModels: Model[] = [];

  constructor(private http: HttpClient, private router: Router, private modelService: ModelService) { }

  ngOnInit() {
    this.fetchData();
    this.http.get<Model[]>('http://127.0.0.1:5000/models').subscribe(models => {
      this.dataSource.data = models;
    });
  }

  // check whether the number of selected elements matches the total number of rows
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // fetch model data from the backend
  fetchData() {
    this.http.get<Model[]>('http://127.0.0.1:5000/models').subscribe(
      (data: Model[]) => {
        this.dataSource.data = data;
      }
    );
  }

  // show details of each model
  showDetails(model: any) {
    this.router.navigate(['/model-selection', model.modelName]);
  }

  checkboxClicked(row: Model) {
    if (this.selection.isSelected(row)) {
      // The checkbox for this row just got selected
      this.selectedModels.push(row);
    } else {
      // The checkbox for this row just got deselected
      this.selectedModels = this.selectedModels.filter(model => model.modelId !== row.modelId);
    }
    this.modelService.updateSelectedModels(this.selectedModels);
  }

}
