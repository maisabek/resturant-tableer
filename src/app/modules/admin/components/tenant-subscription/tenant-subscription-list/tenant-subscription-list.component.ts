import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-subscription-list',
  templateUrl: './tenant-subscription-list.component.html',
  styleUrls: ['./tenant-subscription-list.component.scss']
})
export class TenantSubscriptionListComponent {
  columns
  @ViewChild('addTenantSubscriptionRef') addTenantSubscriptionRef: TemplateRef<any> | any
  private unsubscribe: Subscription[] = []
  constructor(protected _TenantService: TenantService, private route: Router) {
    this.columns = [
      {
        data: 'numberOfBranches',
        title: 'Number Of Branches'
      },
      {
        data: 'numberOfUsers',
        title: 'Number Of Users'
      },
      {
        data: 'numberOfMonths',
        title: 'Number Of Months'

      },
      {
        data: 'amount',
        title: 'Amount',

      },
      {
        data: 'setting',
        title: 'Actions'

      }
    ];
  }


  eventHandler(event: any) {
    switch (event.type) {
      case 'update':
        this.route.navigate(['admin/tenant_subscription_update', event.payload])
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
           const DeleteTenantSubscriptionSub= this._TenantService.DeleteTenantSubscription({ id: event.payload }).subscribe((res) => {
              this._TenantService.datatableRerender.next(true)
            })
           this.unsubscribe.push(DeleteTenantSubscriptionSub)
          }
        });
        break;

      default:
        break;
    }
  }


  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
