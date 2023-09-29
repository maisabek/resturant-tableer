import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './components/review/review.component';
import { SuccessfulReviewComponent } from './components/successful-review/successful-review.component';

const routes: Routes = [
  {path:'review/:slug',component:ReviewComponent},
  {path:'successfull_review/:slug',component:SuccessfulReviewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurvayRoutingModule { }
