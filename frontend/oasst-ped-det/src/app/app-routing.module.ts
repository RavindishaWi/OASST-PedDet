import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageSelectionComponent } from './image-selection/image-selection.component'
import { PredictionResultsComponent } from './prediction-results/prediction-results.component';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EvaluationResultsComponent } from './evaluation-results/evaluation-results.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'evaluation-results', component: EvaluationResultsComponent },
  { path: 'model-selection', component: ModelSelectionComponent },
  { path: 'image-selection', component: ImageSelectionComponent },
  { path: 'detection-results', component: PredictionResultsComponent },
  { path: 'model-selection/:modelName/:description', component: ModelDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
