import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

export interface Model {
  modelId: string;
  modelName: string;
  backbone: string;
}

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent {
  // displayedColumns = ['select', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  // selection = new SelectionModel<Element>(true, []);

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  displayedColumns: string[] = ['modelId', 'modelName', 'backbone'];
  dataSource = new MatTableDataSource<Model>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
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

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
}

// export interface Element {
//   name: string;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: Element[] = [
//   {name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {name: 'Boron', weight: 10.811, symbol: 'B'},
//   {name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {name: 'Oxygen', weight: 15.9994, symbol: 'O'}
// ];
