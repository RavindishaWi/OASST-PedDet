import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Model } from '../model-table/model-table.component';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  modelName!: string;
  description!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.modelName = params.get('modelName')!;
      this.description = params.get('description')!;
      console.log("modelName: ", this.modelName);
      console.log("description: ", this.description);
      this.http.get<Model>('/model-selection/' + this.modelName).subscribe(model => {
        this.description = model.description;
      });
    });
  }
}

