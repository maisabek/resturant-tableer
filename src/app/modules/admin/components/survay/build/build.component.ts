import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SurvayService } from '../../../services/survay.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GetDataResponse } from 'src/app/shared/models/getResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class BuildComponent {
  @ViewChild('addSurvayQuestionsRef') addSurvayQuestionsRef: TemplateRef<any> | any;
  private unsubscribe: Subscription[] = []

  public Editor = ClassicEditor;
  survayQuestionForm: FormGroup | any
  slug: string | any;
  surveyMode: any
  selectedMode: string | any;
  SurveyQuestions: object[] = []
  survaySettingForm = this.fb.group({
    "id": '',
    "title": "",
    "description": "",
    "enableNotes": false,
    "isActive": false,
    "surveyRateStyleId": ""
  })

  constructor(private fb: FormBuilder, private _survayService: SurvayService,
    private _ActivatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.initSurvayQuestion()

  }

  ngOnInit() {
    this.getSlug()
    this.survaySettingForm.get('id')?.patchValue(this.slug)
    this.survayQuestionForm.get('id')?.patchValue(null)
    this.survayQuestionForm.get('surveyId')?.patchValue(this.slug)
    this.survayQuestionForm.get('enableNotes')?.patchValue(false)
    this.survayQuestionForm.get('isActive')?.patchValue(false)

    this.getSurveyMode()
    this.GetSurveyById(this.slug);
  }

  initSurvayQuestion() {
    this.survayQuestionForm = this.fb.group({
      id: null,
      text: "",
      enableNotes: [false, []],
      isActive: [false, []],
      surveyId: this.slug
    });
  }

  getSlug() {
    const GetParamsSub = this._ActivatedRoute.params.subscribe((res: any) => {
      this.slug = res.id
    })
    this.GetSurveyQuestions(this.slug)
    this.unsubscribe.push(GetParamsSub)
  }

  selectModeFn(ModeId: any, title: string) {
    this.selectedMode = title;
    this.survaySettingForm.get('surveyRateStyleId')?.patchValue(ModeId)
  }

  getSurveyMode() {
    const GetAllSurveyRateStylesSub = this._survayService.GetAllSurveyRateStyles('').subscribe((res: GetDataResponse | any) => {
      this.surveyMode = res.obj
      this.selectedMode = this.surveyMode[0].title;
      this.survaySettingForm.get('surveyRateStyleId')?.patchValue(this.surveyMode[0].id)
    })
    this.unsubscribe.push(GetAllSurveyRateStylesSub)

  }

  addOrEdit() {
    const AddOrEditSub = this._survayService.AddOrEdit(this.survaySettingForm.value).subscribe((res) => { })
    this.unsubscribe.push(AddOrEditSub)

  }

  AddOrEditSurveyQuestion() {
    const AddOrEditSurveyQuestionSub = this._survayService.AddOrEditSurveyQuestion(this.survayQuestionForm.value).subscribe((res) => {
      this.dialog.closeAll()
      this.survayQuestionForm.reset(
        {
          id: null,
          text: "",
          enableNotes: false,
          isActive: false,
          surveyId: this.slug
        }
      )
      this.GetSurveyQuestions(this.slug)
    })
    this.unsubscribe.push(AddOrEditSurveyQuestionSub)
  }


  loadingSurvayQuestion: boolean = false
  GetSurveyQuestions(slug: string) {
    this.loadingSurvayQuestion = true
   const GetSurveyQuestionsSub= this._survayService.GetSurveyQuestions({ "id": slug }).subscribe((res: any) => {
      this.loadingSurvayQuestion = false
      this.SurveyQuestions = res.obj
    })
    this.unsubscribe.push(GetSurveyQuestionsSub)

  }

  DeleteSurveyQuestion(slug: any) {
    Swal.fire({
      title: 'Are you sure You Want To Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
       const DeleteSurveyQuestionSub= this._survayService.DeleteSurveyQuestion({ "id": slug }).subscribe((res) => {
          this.GetSurveyQuestions(this.slug)
        })
        this.unsubscribe.push(DeleteSurveyQuestionSub)
      }
    });

  }

  addQuestionsDialog() {
    this.dialog.open(this.addSurvayQuestionsRef);
  }

  EditLoading: boolean = false;
  GetSurveyQuestionById(slug: any) {
    const GetSurveyQuestionByIdSub= this._survayService.GetSurveyQuestionById({ id: slug }).subscribe((res: GetDataResponse | any) => {
      this.dialog.open(this.addSurvayQuestionsRef);
      this.survayQuestionForm.patchValue(res.obj)
    })
    this.unsubscribe.push(GetSurveyQuestionByIdSub)

  }

  selectedModeIndex: number | any
  GetSurveyById(slug: string) {
    const GetSurveyByIdSub =this._survayService.GetSurveyById({ id: slug }).subscribe((res: GetDataResponse | any) => {
      this.selectedModeIndex = this.surveyMode.findIndex((index: any) => index.id == res.obj.surveyRateStyleId)
      this.selectedMode = this.surveyMode[this.selectedModeIndex].title
      this.survaySettingForm.patchValue(res.obj)
      this.survaySettingForm.get('surveyRateStyleId')?.patchValue(res.obj.surveyRateStyleId)

    })
    this.unsubscribe.push(GetSurveyByIdSub)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
