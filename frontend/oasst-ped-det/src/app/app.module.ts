import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { MessageComponentComponent } from './message-component/message-component.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelSelectionComponent,
    ModelTableComponent,
    HomePageComponent,
    ImgVidSelectionComponent,
    PredictionResultsComponent,
    EvaluationResultsComponent,
    LoaderPageComponent,
    MessageComponentComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: 'model-selection', component: ModelSelectionComponent },
      { path: 'image-selection', component: ImgVidSelectionComponent },
      { path: 'evaluation-results', component: EvaluationResultsComponent },
      { path: 'prediction-results', component: PredictionResultsComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
