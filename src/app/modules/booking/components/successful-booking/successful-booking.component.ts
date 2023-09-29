import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-successful-booking',
  templateUrl: './successful-booking.component.html',
  styleUrls: ['./successful-booking.component.scss']
})
export class SuccessfulBookingComponent {
  constructor(private _ActivatedRoute:ActivatedRoute){}
  private unsubscribe: Subscription[] = []

  ngOnInit(){
    this.getSlug()
  }

  slug:any
  getSlug(){
  const GetParamsSub= this._ActivatedRoute.params.subscribe((res:any)=>{
    this.slug=res.slug
   })
   this.unsubscribe.push(GetParamsSub)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
