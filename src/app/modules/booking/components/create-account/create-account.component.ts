import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
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
