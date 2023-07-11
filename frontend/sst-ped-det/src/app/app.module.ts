import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from './firebase.config';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { RouterModule } from '@angular/router';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { ModelTableComponent } from './model-table/model-table.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EvaluationResultsComponent } from './evaluation-results/evaluation-results.component';
import { LoaderPageComponent } from './loader-page/loader-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { AboutComponent } from './about/about.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SubHeadingComponent } from './sub-heading/sub-heading.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DetectionResultsComponent } from './detection-results/detection-results.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';

@NgModule({
  declarations: [
    AppComponent,
    ModelSelectionComponent,
    ModelTableComponent,
    HomePageComponent,
    EvaluationResultsComponent,
    LoaderPageComponent,
    AdminLoginComponent,
    ImageSelectionComponent,
    ModelDetailsComponent,
    AboutComponent,
    SubHeadingComponent,
    AdminProfileComponent,
    DetectionResultsComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    NgxPaginationModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirePerformanceModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'model-selection', component: ModelSelectionComponent },
      { path: 'image-selection', component: ImageSelectionComponent },
      { path: 'evaluation-results', component: EvaluationResultsComponent }
    ]),
  ],
  providers: [PerformanceMonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
