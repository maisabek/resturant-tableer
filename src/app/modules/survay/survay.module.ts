import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurvayRoutingModule } from './survay-routing.module';
import { ReviewComponent } from './components/review/review.component';
import { StarRatingModule } from 'angular-star-rating';
import { SuccessfulReviewComponent } from './components/successful-review/successful-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReviewComponent,
    SuccessfulReviewComponent
  ],
  imports: [
    CommonModule,
    SurvayRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StarRatingModule.forRoot()

  ]
})
export class SurvayModule { }
