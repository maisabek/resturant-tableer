import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TenantService } from '../../../services/tenant.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-subscription-add',
  templateUrl: './tenant-subscription-add.component.html',
  styleUrls: ['./tenant-subscription-add.component.scss']
})
export class TenantSubscriptionAddComponent {
  TenantSubscriptionForm: FormGroup = this.fb.group({
    id: null,
    numberOfBranches: 0,
    numberOfUsers: 0,
    numberOfMonths: 0,
    amount: 0,
    tenantId: ""
  })
  TenantSubscriptionIsValid:boolean=false
  private unsubscribe: Subscription[] = []

  constructor(private fb:FormBuilder,private _TenantService:TenantService,private _activatedRoute:ActivatedRoute){}
  loadingTenant: boolean = false
  slug:string | any
  ngOnInit(){
    this.getSlug()
    this.GetTenantSubscriptionById(this.slug)
  }
  getSlug(){
    const GetParamsSub=this._activatedRoute.params.subscribe((res:any)=>{
     this.slug=res.id
    })
    this.unsubscribe.push(GetParamsSub)

  }
  GetTenantSubscriptionById(slug:any){
   const GetTenantSubscriptionByIdSub= this._TenantService.GetTenantSubscriptionById({id: slug }).subscribe((res:any)=>{
      this.TenantSubscriptionForm.patchValue(res.obj)
    })
    this.unsubscribe.push(GetTenantSubscriptionByIdSub)

  }
  AddOrEditTenantSubscription() {
   const AddOrEditTenantSubscription= this._TenantService.AddOrEditTenantSubscription(this.TenantSubscriptionForm.value).subscribe((res) => {})
   this.unsubscribe.push(AddOrEditTenantSubscription)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
