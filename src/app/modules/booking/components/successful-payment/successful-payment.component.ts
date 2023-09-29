import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrls: ['./successful-payment.component.scss']
})
export class SuccessfulPaymentComponent {
  private unsubscribe: Subscription[] = []
  constructor(private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(){
    this.getSlug()
  }

  slug:any
  getSlug(){
   const GetParamsSub=this._ActivatedRoute.params.subscribe((res:any)=>{
    this.slug=res.slug
   })
   this.unsubscribe.push(GetParamsSub)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
