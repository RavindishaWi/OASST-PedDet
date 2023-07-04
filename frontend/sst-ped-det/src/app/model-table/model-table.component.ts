import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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
export class ModelTableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'modelId', 'modelName', 'backbone', 'description'];
  dataSource = new MatTableDataSource<Model>();
  selection = new SelectionModel<Model>(true, []);
  selectedModels: Model[] = [];

  isSmallScreen = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modelService: ModelService,
    private breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = ['select', 'modelName', 'backbone'];
      } else {
        this.displayedColumns = ['select', 'modelId', 'modelName', 'backbone', 'description'];
      }
    });

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

  checkboxClicked(row: Model) {
    if (this.selection.isSelected(row)) {
      // checkbox for this row just got selected
      this.selectedModels.push(row);
    } else {
      // checkbox for this row just got deselected
      this.selectedModels = this.selectedModels.filter(model => model.modelId !== row.modelId);
    }
    this.modelService.updateSelectedModels(this.selectedModels);
  }

  // show details of the model
  showDetails(model: any) {
    // show about page if the model is SST-PedDet
    if (model.modelId === 'model_1') {
      this.router.navigate(['/about']);
    }
  }

}
