import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent {
  slug:string | any
  private unsubscribe: Subscription[] = []

  constructor(private _activatedRoute: ActivatedRoute,private _ReservationService:ReservationService) { }
  ngOnInit() {
    this.getSlug()
    this.GetReservationById()
  }

  getSlug(){
   const GetParamsSub= this._activatedRoute.params.subscribe((res:any)=>{
      this.slug=res.id
    })
    this.unsubscribe.push(GetParamsSub)
  }

  reservationDetails:object | any
  data:boolean=false
  GetReservationById(){
   const GetReservationByIdSub= this._ReservationService.GetReservationById({id:this.slug}).subscribe((res:any)=>{
      if(res.obj != null){
        this.reservationDetails=res.obj
      }else{
       this.data=true
      }
    })
    this.unsubscribe.push(GetReservationByIdSub)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
