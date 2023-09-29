import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  todayDate: Date = new Date();
  reservationForm: FormGroup | any
  public Editor = ClassicEditor;
  private unsubscribe: Subscription[] = []

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BookingDetailsService: BookingDetailsService,
    private datePipe: DatePipe, private fb: FormBuilder,
    private route: Router,

    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.getSlug()
    this.reservationFormInit()
    this.GetPublicTenantById()
    this.GetTenantBranches()
  }

  TenantDetails: object | any
  bannerImage:any
  primaryColor:string=""
  secondaryColor:string=''
  GetPublicTenantById() {
   const PublicTenantSub = this._BookingDetailsService.GetPublicTenantById({ id: this.slug }).subscribe((res: any) => {
      this.TenantDetails = res.obj
      this.primaryColor=res.obj.primaryColor
      this.secondaryColor=res.obj.secondaryColor
      this.bannerImage=`http://209.126.85.136/tableers/uploads/${res.obj.bannerImage}`
    })
    this.unsubscribe.push(PublicTenantSub)

  }

  Branches: any
  GetTenantBranches() {
   const tenantBranchesSub= this._BookingDetailsService.GetTenantBranches({ id: this.slug }).subscribe((res: any) => {
      this.Branches = res.obj
    })
    this.unsubscribe.push(tenantBranchesSub)

  }
  branchId: string | any
  selectBranch($event: any) {
    this.availabelSlots = []
    this.waitingAvailabelSlots = []
    this.maxGuestsNumberPerReservation = 0
    this.waitingList = false
    this.reservationForm.get('dateTimeSlot').patchValue("")
    this.branchId = $event.value;
    this.GetBranchAvailableDays($event.value)
  }

  slug: any
  getSlug() {
   const GetParamsSub= this._ActivatedRoute.params.subscribe((res: any) => {
      this.slug = res.slug
    })
    this.unsubscribe.push(GetParamsSub)

  }

  reservationFormInit() {
    this.reservationForm = this.fb.group({
      id: null,
      dateTimeSlot: ["", [Validators.required]],
      partySize: 0,
      specialRequest: "",
      branchId: ["", [Validators.required]],
      isWaiting: false,
    })
  }

  AvailableDays: any[] = []
  GetBranchAvailableDays(slug: any) {
    this.AvailableDays = []
    const BranchAvailableDaySub=this._BookingDetailsService.GetBranchAvailableDays({ id: slug }).subscribe((res: any) => {
      if (res.obj != null) {
        res.obj.forEach((element: any) => {
          this.AvailableDays.push(this.datePipe.transform(element, 'dd-MM-yyyy'))
        });
      }
    })
    this.unsubscribe.push(BranchAvailableDaySub)
  }

  myFilter = (d: Date): boolean => {
    return this.AvailableDays.indexOf(this.datePipe.transform(d, 'dd-MM-yyyy')) != -1 ? true : false;
  }

  availabelSlots: any;
  waitingAvailabelSlots: any
  availableTimeLoading: boolean = false
  maxGuestsNumberPerReservation: number | any
  waitingList: boolean = false
  valueChanged($event: any) {
    this.availableTimeLoading = true

   const BranchAvailableDaySub= this._BookingDetailsService.GetBranchAvailableDaySlots({ id: this.branchId, "selectedDate": $event.target.value }).subscribe((res: any) => {
      if (res.obj != null) {
        this.availabelSlots = res.obj.availabelSlots
        this.waitingAvailabelSlots = res.obj.waitingAvailabelSlots
        this.maxGuestsNumberPerReservation = res.obj.maxGuestsNumberPerReservation
        this.waitingList = res.obj.allowWaitingList
      } else {
        this.availabelSlots = []
        this.waitingAvailabelSlots = []
        this.maxGuestsNumberPerReservation = 0
        this.waitingList = false
      }
    })
    this.unsubscribe.push(BranchAvailableDaySub)
  }


  TimeSlot: any
  IsAvaialbleTime:boolean=false
  selectAvailabelSlots(item: any) {
    this.removeSelectedAvailableTime()
    document.getElementById(item)?.classList.toggle('selectedTime')
    if (document.getElementById(item)?.classList.contains('selectedTime')) {
      this.TimeSlot = item
      this.IsAvaialbleTime=true
    }else{
      this.IsAvaialbleTime=false

    }
  }


  WaitingTimeSlot: any
  IsWaitingTime:boolean=false
  selectWaitingAvailabelSlots(item: any) {
    this.removeWaitingAvailabelSlots()
    document.getElementById(item)?.classList.toggle('selectedwaitingTime')
    if (document.getElementById(item)?.classList.contains('selectedwaitingTime')) {
      this.TimeSlot = item
      this.IsWaitingTime=true
      this.reservationForm.get('isWaiting').patchValue(true)
    }else{
      this.IsWaitingTime=false
      this.reservationForm.get('isWaiting').patchValue(false)
    }
  }

  removeSelectedAvailableTime() {
    var elems = document.querySelectorAll(".AvailableTime");
    [].forEach.call(elems, function (el: any) {
      el.classList.remove("selectedTime");
    });
  }


  removeWaitingAvailabelSlots() {
    var elems = document.querySelectorAll(".waitingAvailabelSlots");
    [].forEach.call(elems, function (el: any) {
      el.classList.remove("selectedwaitingTime");
    });
  }

  onTabChanged(event:any){
    if(event.index == 0 && this.IsWaitingTime){
      this.removeSelectedAvailableTime()
      this.reservationForm.get('isWaiting').patchValue(false)
    }else if(event.index == 1 && this.IsAvaialbleTime){
     this.removeWaitingAvailabelSlots()
    }
   }

  dateSlot: any
  IsValid: boolean = false
  AddReservation() {
    if(this.reservationForm.invalid){
      this.IsValid = true
    }else if (this.availabelSlots.length == 0) {
      this.toastr.error('No Available Time , choose Another Day', '',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      })
    }else if(this.TimeSlot == undefined){
      this.toastr.error('Please Choose Time', '',{
        progressBar:true,
        positionClass:'toast-bottom-left',
      })
    }else{
    if (this.reservationForm.valid) {
      if (this.reservationForm.get('dateTimeSlot').value != '') {
        this.dateSlot = this.datePipe.transform(this.reservationForm.get('dateTimeSlot').value, 'dd MMMM yyyy')
        const event = new Date(`${this.dateSlot} ${this.TimeSlot} UTC`);
        this.reservationForm.get('dateTimeSlot').patchValue(event.toISOString());
      } else {
        this.reservationForm.get('dateTimeSlot').patchValue(null);
      }
      this.reservationForm.get('branchId').patchValue(this.branchId);
      this.reservationForm.get('partySize').patchValue(this.count)
      const bookingDetailsSub = this._BookingDetailsService.AddReservation(this.reservationForm.value).subscribe((res:any) => {
        this.route.navigate(['Booking/create_account', this.slug])
      })
      this.unsubscribe.push(bookingDetailsSub)
    }
  }
  }


  count: number = 0
  increment() {
    if (this.count < this.maxGuestsNumberPerReservation) {
      this.count++;
      this.count = this.count
    }
  }
  decrement() {
    if (this.count > 1) {
      this.count--;
      this.count = this.count
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
