import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkingSystemService } from '../../../services/working-system.service';
import { ThemePalette } from '@angular/material/core';
import { DateTime } from 'ts-luxon';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-working-system-build',
  templateUrl: './working-system-build.component.html',
  styleUrls: ['./working-system-build.component.scss']
})
export class WorkingSystemBuildComponent {
  @ViewChild('addDayRef') addDayRef: TemplateRef<any> | any
  newWorkingSystemForm: FormGroup = this.fb.group({
    id: "",
    title: "",
    startDate: "",
    endDate: "",
    maxFutureDays: 0,
    isDefault: true,
    isActive: true,
    workingSystemTypeId: ""
  })
  workingSystemDaysForm: FormGroup | any
  maxTime: DateTime = DateTime.local().set({ hour: 16 });
  minTime: DateTime = DateTime.local().set({ hour: 14 });
  @ViewChild('timepicker') timepicker: any;
  private unsubscribe: Subscription[] = []

  slug: string | any
  constructor(private fb: FormBuilder, private _activatedRoute: ActivatedRoute,
    protected _WorkingSystemService: WorkingSystemService,
    private matDialog: MatDialog, private datePipe: DatePipe) { }
  ngOnInit() {
    this.workingSystemDaysFormInit()
    this.getSlug()
    this.GetBranchAvailableDays()
  }

  workingSystemDaysFormInit() {
    this.workingSystemDaysForm = this.fb.group({
      id: null,
      dayOfWeek: ["", [Validators.required]],
      openTime: ["", [Validators.required]],
      closeTime: ["", [Validators.required]],
      timeIncrement: [0, [Validators.required]],
      maxReservationsNumber: [0, [Validators.required]],
      maxGuestsNumber: [0, [Validators.required]],
      downPaymentPerReservation: [0, [Validators.required]],
      downPaymentPerGuest: [0, [Validators.required]],
      allowWaitingList: false,
      waitingOpenTime: "",
      waitingCloseTime: "",
      maxWaitingReservationsNumber: 0,
      maxWaitingGuestsNumber: [0, [Validators.required]],
      maxGuestsNumberPerReservation: [1, [Validators.required]],
      workingSystemId: ""
    })
  }

  maxFutureDaysCount: number = 0
  maxFutureDaysCountFn() {
    this.maxFutureDaysCount++;
    this.maxFutureDaysCount = this.maxFutureDaysCount
    this.newWorkingSystemForm.get('maxFutureDays')?.patchValue(this.maxFutureDaysCount);
  }

  getSlug() {
    const GetParamsSub = this._activatedRoute.params.subscribe((res: any) => {
      this.slug = res.id
    })
    this.unsubscribe.push(GetParamsSub)
    this.GetWorkingSystemById(this.slug)
    this.getAvailableWorkingSystemDays(this.slug)
    this.getWorkingSystemDays(this.slug)
  }

  GetWorkingSystemById(slug: string) {
    const WorkingSystemSub = this._WorkingSystemService.GetWorkingSystemById({ id: slug }).subscribe((res: any) => {
      this.newWorkingSystemForm.patchValue(res.obj)
    })
    this.unsubscribe.push(WorkingSystemSub)
  }
  isValid: boolean = false
  addOrEditWorkingSystem() {
    if (this.newWorkingSystemForm.valid) {
     const EditWorkingSystemSub=  this._WorkingSystemService.EditWorkingSystem(this.newWorkingSystemForm.value).subscribe((res) => {
      })
      this.unsubscribe.push(EditWorkingSystemSub)

    } else {
      this.isValid = true;
    }
  }

  WorkingSystemTypes: any
  GetBranchAvailableDays() {
   const WorkingSystemTypesSub= this._WorkingSystemService.getAllWorkingSystemTypes().subscribe((res: any) => {
      this.WorkingSystemTypes = res.obj
    })
    this.unsubscribe.push(WorkingSystemTypesSub)
  }

  AllDays: any[] = []
  getAvailableWorkingSystemDays(slug: string) {
   const AvailableWorkingSystemDaysSub=  this._WorkingSystemService.GetAvailableWorkingSystemDays({ id: slug }).subscribe((res: any) => {
      this.AllDays = res.obj;
    })
    this.unsubscribe.push(AvailableWorkingSystemDaysSub)

  }

  WorkingSystemDays: any[] = []
  loadingWorkingSystemDays: boolean = false
  getWorkingSystemDays(slug: string) {
    this.loadingWorkingSystemDays = true
   const getWorkingSystemDaysSub=  this._WorkingSystemService.getWorkingSystemDays({ id: slug }).subscribe((res: any) => {
      this.WorkingSystemDays = res.obj;
      this.loadingWorkingSystemDays = false
    })
    this.unsubscribe.push(getWorkingSystemDaysSub)

  }

  AddOrEditIsValid: boolean = false
  workingSystemDaysData: object | any
  AddOrEditWorkingSystemDay() {

    if (this.workingSystemDaysForm.valid) {

      this.workingSystemDaysForm.get('workingSystemId')?.patchValue(this.slug);
      const openTime = new Date(`${this.datePipe.transform(new Date(), 'dd MMMM yyyy')} ${this.workingSystemDaysForm.get('openTime').value} UTC`);
      const closeTime = new Date(`${this.datePipe.transform(new Date(), 'dd MMMM yyyy')} ${this.workingSystemDaysForm.get('closeTime').value} UTC`);

      const waitingOpenTime = new Date(`${this.datePipe.transform(new Date(), 'dd MMMM yyyy')} ${this.workingSystemDaysForm.get('waitingOpenTime').value} UTC`);
      const waitingCloseTime = new Date(`${this.datePipe.transform(new Date(), 'dd MMMM yyyy')} ${this.workingSystemDaysForm.get('waitingCloseTime').value} UTC`);
      this.workingSystemDaysData = {
        id: this.workingSystemDaysForm.get('id').value,
        dayOfWeek: this.workingSystemDaysForm.get('dayOfWeek').value,
        openTime: openTime,
        closeTime: closeTime,
        timeIncrement: this.workingSystemDaysForm.get('timeIncrement').value,
        maxReservationsNumber: this.workingSystemDaysForm.get('maxReservationsNumber').value,
        maxGuestsNumber: this.workingSystemDaysForm.get('maxGuestsNumber').value,
        downPaymentPerReservation: this.workingSystemDaysForm.get('downPaymentPerReservation').value,
        downPaymentPerGuest: this.workingSystemDaysForm.get('downPaymentPerGuest').value,
        allowWaitingList: this.workingSystemDaysForm.get('allowWaitingList').value,
        waitingOpenTime: this.workingSystemDaysForm.get('allowWaitingList').value ? waitingOpenTime : null,
        waitingCloseTime: this.workingSystemDaysForm.get('allowWaitingList').value ? waitingCloseTime : null,
        maxWaitingReservationsNumber: this.workingSystemDaysForm.get('allowWaitingList').value ? this.workingSystemDaysForm.get('maxWaitingReservationsNumber').value : 0,
        maxWaitingGuestsNumber: this.workingSystemDaysForm.get('allowWaitingList').value ? this.workingSystemDaysForm.get('maxWaitingGuestsNumber').value : 0,
        workingSystemId: this.workingSystemDaysForm.get('workingSystemId').value,
        maxGuestsNumberPerReservation:this.workingSystemDaysForm.get('maxGuestsNumberPerReservation').value
      }
    const AddOrEditWorkingSystemDaySub=  this._WorkingSystemService.AddOrEditWorkingSystemDay(this.workingSystemDaysData).subscribe((res) => {
        this.getWorkingSystemDays(this.slug)
        this.getAvailableWorkingSystemDays(this.slug)
        this.workingSystemDaysForm.reset({
          id: null,
          dayOfWeek: "",
          openTime: "",
          closeTime: "",
          timeIncrement: 0,
          maxReservationsNumber: 0,
          maxGuestsNumber: 0,
          downPaymentPerReservation: 0,
          downPaymentPerGuest: 0,
          allowWaitingList: false,
          waitingOpenTime: "",
          waitingCloseTime: "",
          maxWaitingReservationsNumber: 0,
          maxWaitingGuestsNumber: 0,
          maxGuestsNumberPerReservation: 1,
          workingSystemId: ""
        })
        this.matDialog.closeAll()
      })
      this.unsubscribe.push(AddOrEditWorkingSystemDaySub)

    } else {
      this.AddOrEditIsValid = true;
    }
  }

  DeleteWorkingSystemDay(slug: string) {
    Swal.fire({
      title: 'Are you sure You Want To Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const DeleteWorkingSystemDaySub= this._WorkingSystemService.DeleteWorkingSystemDay({ id: slug }).subscribe((res) => {
          this.getWorkingSystemDays(this.slug)
          this.getAvailableWorkingSystemDays(this.slug)
        })
        this.unsubscribe.push(DeleteWorkingSystemDaySub)
      }
    });

  }

  GetWorkingSystemDayById(slug: string) {
   const GetWorkingSystemDayByIdSub= this._WorkingSystemService.GetWorkingSystemDayById({ id: slug }).subscribe((res: any) => {
    let dialogRef= this.matDialog.open(this.addDayRef, {
        panelClass: 'AddDaysDialog'
      });
      this.GetAvailableWorkingSystemDaysEdit(slug)
      this.workingSystemDaysForm.patchValue(res.obj)
      this.workingSystemDaysForm.get('openTime').patchValue(this.datePipe.transform(res.obj.openTime, 'h:mm a'))
      this.workingSystemDaysForm.get('closeTime').patchValue(this.datePipe.transform(res.obj.closeTime, 'h:mm a'))

      if (this.workingSystemDaysForm.get('allowWaitingList').value) {
        this.workingSystemDaysForm.get('waitingOpenTime').patchValue(this.datePipe.transform(res.obj.waitingOpenTime, 'h:mm a'))
        this.workingSystemDaysForm.get('waitingCloseTime').patchValue(this.datePipe.transform(res.obj.waitingCloseTime, 'h:mm a'))
      }
      dialogRef.afterClosed().subscribe(() => {
        this.workingSystemDaysForm.reset({
          id: null,
          dayOfWeek: "",
          openTime: "",
          closeTime: "",
          timeIncrement: 0,
          maxReservationsNumber: 0,
          maxGuestsNumber: 0,
          downPaymentPerReservation: 0,
          downPaymentPerGuest: 0,
          allowWaitingList: false,
          waitingOpenTime: "",
          waitingCloseTime: "",
          maxWaitingReservationsNumber: 0,
          maxWaitingGuestsNumber: 0,
          maxGuestsNumberPerReservation: 1,
          workingSystemId: ""
        })
      });
    })
    this.unsubscribe.push(GetWorkingSystemDayByIdSub)
  }

  GetAvailableWorkingSystemDaysEdit(slug: any) {
   const GetAvailableWorkingSystemDaysEditSub= this._WorkingSystemService.GetAvailableWorkingSystemDaysEdit({ id: slug }).subscribe((res: any) => {
      this.AllDays = res.obj
    })
    this.unsubscribe.push(GetAvailableWorkingSystemDaysEditSub)

  }
  openFromIcon(timepicker: { open: () => void }) {
    timepicker.open();
  }
  OpenDialog() {
    // this.workingSystemDaysForm.reset()
    this.matDialog.open(this.addDayRef, {
      panelClass: 'AddDaysDialog'
    })
    this.workingSystemDaysForm.get('id')?.patchValue(null);
    this.getAvailableWorkingSystemDays(this.slug)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }


}
