import { Component, ViewChild } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LookupService } from '../../../services/lookup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent {
  columns: object[] | any
  isValid: boolean = false
  private unsubscribe: Subscription[] = []
  @ViewChild('tenantDialogRef', { static: true }) TenantDialogRef: any
  tenantForm: FormGroup = this.fb.group({
    id: null,
    title: ["", [Validators.required]],
    slug: "",
    logoImage: "",
    bannerImage: "",
    primaryColor: "",
    secondaryColor: "",
    welcomeMsg: "",
    menuUrl: "",
    isActive: true,
    published: true,
    countryId: ["", [Validators.required]]
  })
  constructor(protected _TenantService: TenantService, private fb: FormBuilder,
    private matDialog: MatDialog, private route: Router, private _LookupService: LookupService) {
    this.columns = [
      {
        data: 'title',
        title: 'Title'
      },
      {
        data: 'endDate',
        title: 'End Date'
      },
      {
        data: 'isActive',
        title: 'Active'

      },
      {
        data: 'published',
        title: 'Published',

      },
      {
        data: 'setting',
        title: 'Actions'

      }
    ];
  }
  ngOnInit() {
    this.GetAllCountries()
  }

  eventHandler(event: any) {
    switch (event.type) {
      case 'update':
        this.route.navigate(['admin/tenant_build', event.payload])
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
            const DeleteTenantSub = this._TenantService.DeleteTenant({ id: event.payload }).subscribe((res) => {
              this._TenantService.datatableRerender.next(true)
            })
            this.unsubscribe.push(DeleteTenantSub)
          }
        });
        break;
      case 'published':
        Swal.fire({
          title: `Are you sure You Want To ${event.payload.flag ? 'Publish' : 'Not Publish'} This  Tenant?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('',`Tenant Is ${event.payload.flag ? 'Publish' : 'Not Publish'}`,'success')
            const ChangePublishTenantSub = this._TenantService.ChangePublishTenant(event.payload).subscribe((res) => {
              this._TenantService.datatableRerender.next(true)
            })
            this.unsubscribe.push(ChangePublishTenantSub)
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('',`Tenant Is Still ${event.payload.flag ? 'Not Publish' : 'Publish'}`,'error')
          }
        });
        break;
      case 'active':
        Swal.fire({
          title: `Are you sure You Want To ${event.payload.flag ? 'Active' : 'Not Active'} This Tenant?`,
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('',`Tenant Is ${event.payload.flag ? 'Active' : 'Not Active'}`,'success')
            const ChangeActiveTenantSub = this._TenantService.ChangeActiveTenant(event.payload).subscribe((res) => {
              this._TenantService.datatableRerender.next(true)
            })
            this.unsubscribe.push(ChangeActiveTenantSub)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('',`Tenant Is Still ${event.payload.flag ? 'Not Active' : 'Active'}`,'error')
          }
        });

        break;
      default:
        break;
    }
  }

  openDialog() {
    this.matDialog.open(this.TenantDialogRef)
  }

  AddTenant() {
    if (this.tenantForm.valid) {
      const AddTenantSub = this._TenantService.AddTenant(this.tenantForm.value).subscribe((res: any) => {
        this.route.navigate(["/admin/tenant_build", res.obj])
        this.matDialog.closeAll()
      })
      this.unsubscribe.push(AddTenantSub)

    } else {
      this.isValid = true
    }
  }

  AllCountries: any
  GetAllCountries() {
    const GetAllCountriesSub = this._LookupService.GetAllCountries('').subscribe((res: any) => {
      this.AllCountries = res.obj
    })
    this.unsubscribe.push(GetAllCountriesSub)

  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
