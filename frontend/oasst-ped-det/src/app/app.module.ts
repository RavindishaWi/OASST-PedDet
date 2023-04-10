import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RouterModule } from '@angular/router';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { ModelTableComponent } from './model-table/model-table.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ImgVidSelectionComponent } from './img-vid-selection/img-vid-selection.component';
import { PredictionResultsComponent } from './prediction-results/prediction-results.component';
import { EvaluationResultsComponent } from './evaluation-results/evaluation-results.component';
import { LoaderPageComponent } from './loader-page/loader-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelSelectionComponent,
    ModelTableComponent,
    HomePageComponent,
    ImgVidSelectionComponent,
    PredictionResultsComponent,
    EvaluationResultsComponent,
    LoaderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: 'model-selection', component: ModelSelectionComponent },
      { path: 'image-selection', component: ImgVidSelectionComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
