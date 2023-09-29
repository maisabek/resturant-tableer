import { Component } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-data',
  templateUrl: './tenant-data.component.html',
  styleUrls: ['./tenant-data.component.scss']
})
export class TenantDataComponent {
  constructor(private _TenantService: TenantService) { }
  private unsubscribe: Subscription[] = []

  ngOnInit() {
    this.GetUserTenant()
  }

  UserTenant: any
  GetUserTenant() {
    const GetUserTenantSub = this._TenantService.GetUserTenant().subscribe((res: any) => {
      this.UserTenant = res.obj
    })
    this.unsubscribe.push(GetUserTenantSub)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
