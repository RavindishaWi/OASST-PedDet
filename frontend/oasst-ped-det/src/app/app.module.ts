import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { ModelTableComponent } from './model-table/model-table.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PredictionResultsComponent } from './prediction-results/prediction-results.component';
import { EvaluationResultsComponent } from './evaluation-results/evaluation-results.component';
import { LoaderPageComponent } from './loader-page/loader-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { ModelDetailsComponent } from './model-details/model-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelSelectionComponent,
    ModelTableComponent,
    HomePageComponent,
    PredictionResultsComponent,
    EvaluationResultsComponent,
    LoaderPageComponent,
    AdminLoginComponent,
    ImageSelectionComponent,
    ModelDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'model-selection', component: ModelSelectionComponent },
      { path: 'image-selection', component: ImageSelectionComponent },
      // { path: 'prediction-results', component: PredictionResultsComponent},
      { path: 'evaluation-results', component: EvaluationResultsComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
