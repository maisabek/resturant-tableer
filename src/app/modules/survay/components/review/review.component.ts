import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSurveyService } from '../../services/user-survey.service';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  private unsubscribe: Subscription[] = []
  slug: any
  isLoading: boolean = false;
  isValid: boolean | any = false;
  surveyQuestions: any[] = []
  surveyRates: any[] = []

  constructor(private _ActivatedRoute: ActivatedRoute, private fb: FormBuilder,
   private route: Router, private _UserSurveyService: UserSurveyService,
   private toastr: ToastrService) {
  }
  survayQuestionForm: FormGroup | any
  ngOnInit() {
    this.getSlug();
    this.survayQuestionForm = this.fb.group({
      code: this.slug,
      surveyResponseQuestions: this.fb.array([], [Validators.required]),
      notes: '',

    })
  }


  getSlug() {
   const getParamsSub= this._ActivatedRoute.params.subscribe((res: any) => {
      this.slug = res.slug
      this.getSurveyQuestion()
    })
    this.unsubscribe.push(getParamsSub)
  }



  getSurveyQuestion() {
    const QuestionsSurveySub = this._UserSurveyService.GetUserQuestionsSurvey({ "code": this.slug }).subscribe((res:any) => {
      this.surveyQuestions = res.obj.surveyQuestions;
      this.surveyRates = res.obj.surveyRates;
    }, (err:any) => {
      this.toastr.error(err?.error?.title, '',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      });
    })
    this.unsubscribe.push(QuestionsSurveySub)
  }

  starClickChangeFn(surveyRate: any, QuestionId: any) {
    const index = this.getResponseQuestions().value.findIndex((index: any) => index.surveyQuestionId == QuestionId);
    if (index == -1) {
      this.getResponseQuestions().push(this.fb.group({
          "surveyQuestionId": [QuestionId, [Validators.required]],
          "surveyRateId": [this.surveyRates[surveyRate.rating - 1].id, [Validators.required]]
      }));
    } else {
      this.getResponseQuestions().removeAt(index);
      this.getResponseQuestions().push(
        this.fb.group({
            "surveyQuestionId": [QuestionId, [Validators.required]],
            "surveyRateId": [this.surveyRates[surveyRate.rating - 1].id, [Validators.required]]
        }));
    }


    if (this.getResponseQuestions().length == this.surveyQuestions.length) {
      this.isValid = true
    }
  }

  getResponseQuestions(): FormArray {
    return this.survayQuestionForm.get('surveyResponseQuestions') as FormArray;
  }

  submitUserSurvey() {

    if (this.isValid || this.surveyQuestions == null) {
      this.isLoading = true;
      const UserSurveySub =this._UserSurveyService.submitUserSurvey(this.survayQuestionForm.value).subscribe((res:any) => {
        this.toastr.success('success', '',{
          progressBar:true,
          positionClass:'toast-bottom-left'
        });
        this.isLoading = false;
        this.route.navigate(['/survey/successfull_review/', this.slug])

      })
      this.unsubscribe.push(UserSurveySub)
    }
    else {
      this.toastr.error( 'عذرا برجاء اجابة جميع الاسئلة ماعدا الملاحظات','',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      });
    }
  }


  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
