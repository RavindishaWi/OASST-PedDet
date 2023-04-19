import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Model {
  modelId: string;
  modelName: string;
  backbone: string;
  description: string;
}

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent {
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'modelId', 'modelName', 'backbone', 'description'];
  dataSource = new MatTableDataSource<Model>();
  selection = new SelectionModel<Model>(true, []);

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchData();
    this.http.get<Model[]>('http://127.0.0.1:5000/models').subscribe(models => {
      this.dataSource.data = models;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  fetchData() {
    this.http.get<Model[]>('http://127.0.0.1:5000/models').subscribe(
      (data: Model[]) => {
        console.log(data, '1');
        this.dataSource.data = data;
        console.log(this.dataSource.data,'2');
      }
    );
  }

  showDetails(model: any) {
    this.router.navigate(['/model-selection', model.modelName]);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}
