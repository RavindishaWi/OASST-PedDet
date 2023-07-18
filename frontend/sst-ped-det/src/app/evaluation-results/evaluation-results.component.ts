import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.css']
})
export class EvaluationResultsComponent implements OnInit {
  constructor(
    private http: HttpClient
    ) { }

  displayedColumns: string[] = ['modelID', 'modelName', 'apScore'];
  dataSource = new MatTableDataSource<Results>();

  ngOnInit() {
    this.fetchData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // results from the backend
  fetchData() {
    this.http.get<Results[]>('http://127.0.0.1:5000/evaluation-results').subscribe(
      (data: Results[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}

export interface Results {
  modelID: string;
  modelName: string;
  apScore: number;
}

