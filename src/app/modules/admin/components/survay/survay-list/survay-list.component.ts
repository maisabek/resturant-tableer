import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { SurvayService } from '../../../services/survay.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SavedResponse } from 'src/app/shared/models/savedResponse';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-survay-list',
  templateUrl: './survay-list.component.html',
  styleUrls: ['./survay-list.component.scss']
})
export class SurvayListComponent {
  surveyMode: string | any
  selectedMode: any;
  @ViewChild('addSurvayDialogRef') addSurvayDialogRef: TemplateRef<any> | any;
  newSurveyForm = this.fb.group({
    title: [
      '',
      Validators.compose([
        Validators.required
      ]),
    ],
    SurveyRateStyleId: ['', [Validators.required]]
  });
  private unsubscribe: Subscription[] = []

  constructor(public _survayService: SurvayService, private route: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  columns: object[] | any

  ngOnInit() {
    this.getSurveyMode()
    // this.translateService.stream('admin.Title').subscribe((res) => {
    // if (res != 'admin.title') {
    this.columns = [
      {
        data: 'title',
        title: "Title",
      },
      {
        data: 'enableNotes',
        title: 'Enable Notes'
      },
      {
        data: 'description',
        title: 'Description',

      },
      {
        data: 'setting',
        title: 'Actions'

      }
    ];

    // }
    // })
  }



  eventHandler(event: any) {
    switch (event.type) {
      case 'update':
        this.route.navigate(['/admin/survay_build', event.payload])
        break;

      case 'delete':
        Swal.fire({
          title: 'Are you sure You Want To Delete?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            const DeleteSurveySub = this._survayService.DeleteSurvey({ id: event.payload }).subscribe(() => {
              this._survayService.datatableRerender.next(true)
            })
            this.unsubscribe.push(DeleteSurveySub)
          }
        });
        break;
      default:
        break;
    }
  }

  openDialog() {
    this.dialog.open(this.addSurvayDialogRef);
  }

  selectModeFn(ModeId: any, title: string) {
    this.selectedMode = title;
    this.newSurveyForm.get('SurveyRateStyleId')?.patchValue(ModeId)
  }
  getSurveyMode() {
    const GetAllSurveyRateStylesSub = this._survayService.GetAllSurveyRateStyles('').subscribe((res: any) => {
      this.surveyMode = res.obj
      this.selectedMode = this.surveyMode[0].title;
      this.newSurveyForm.get('SurveyRateStyleId')?.patchValue(this.surveyMode[0].id)
    })
    this.unsubscribe.push(GetAllSurveyRateStylesSub)

  }

  isValid: boolean = false
  addNewSurvey() {
    if (this.newSurveyForm.valid) {
      const AddOrEditSub = this._survayService.AddOrEdit(this.newSurveyForm.value).subscribe((res: SavedResponse | any) => {
        this.route.navigate(['/admin/survay_build', res.obj])
        this.dialog.closeAll()
      })
      this.unsubscribe.push(AddOrEditSub)

    } else {
      this.isValid = true
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
