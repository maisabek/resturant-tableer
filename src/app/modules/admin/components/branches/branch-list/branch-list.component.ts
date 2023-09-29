import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BranchesService } from '../../../services/branches.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LookupService } from '../../../services/lookup.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent {
  columns: object[] | any;
  @ViewChild('BranchDialogRef') BranchDialogRef: TemplateRef<any> | any
  private unsubscribe: Subscription[] = []

  isValid: boolean = false
  branchForm: FormGroup = this.fb.group({
    id: null,
    title: ["", [Validators.required]],
    slug: "4aa46712-7e45-4b66-04be-08db9084e230",
    location: "",
    isActive: true,
    cityId: ["", [Validators.required]]
  })
  constructor(protected _BranchesService: BranchesService, private fb: FormBuilder,
    private matDialog: MatDialog, private route: Router, private _LookupService: LookupService) {
    this.columns = [
      {
        data: 'title',
        title: 'Title'
      },
      {
        data: 'code',
        title: 'Code'

      },
      {
        data: 'isActive',
        title: 'Is Active',

      },
      {
        data: 'setting',
        title: 'Actions'

      }
    ];
  }
  ngOnInit() {
    this.GetAllCitiesForUserTenant()
    this.GetTenantBranches()
  }
  eventHandler(event: any) {
    switch (event.type) {
      case 'update':
        this.route.navigate(["/admin/branch_build", event.payload])
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
            const DeleteBranchSub = this._BranchesService.DeleteBranch({ id: event.payload }).subscribe(() => {
              this._BranchesService.datatableRerender.next(true)
            })
            this.unsubscribe.push(DeleteBranchSub)
          }
        });
        break;
      case 'active':
        Swal.fire({
          title: `Are you sure You Want To ${event.payload.flag ? 'Active':'Not Active'} This Branch ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('',`Branch Is ${event.payload.flag ? 'Active': 'Not Active'}`,'success')
            const ChangeActiveBranchSub = this._BranchesService.ChangeActiveBranch(event.payload).subscribe((res) => { })
            this.unsubscribe.push(ChangeActiveBranchSub)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('',`Branch Is Still ${event.payload.flag ? 'Not Active': 'Active'}`,'error')
          }
        });

        break;
      default:
        break;
    }
  }

  openDialog() {
    this.matDialog.open(this.BranchDialogRef)
  }

  AddOrEditbranch() {
    if (this.branchForm.valid) {
      const AddOrEditBranchSub = this._BranchesService.AddOrEditBranch(this.branchForm.value).subscribe((res: any) => {
        this.route.navigate(['/admin/branch_build', res.obj])
        this.matDialog.closeAll()
      })
      this.unsubscribe.push(AddOrEditBranchSub)
    } else {
      this.isValid = true
    }

  }

  AllCities: any
  GetAllCitiesForUserTenant() {
    const GetAllCitiesForUserTenantSub = this._LookupService.GetAllCitiesForUserTenant('').subscribe((res: any) => {
      this.AllCities = res.obj
    })
    this.unsubscribe.push(GetAllCitiesForUserTenantSub)
  }

  TenantBranches: any
  loadingBranches: boolean = false
  GetTenantBranches() {
    this.loadingBranches = true
    const GetTenantBranchesSub = this._BranchesService.GetTenantBranches().subscribe((res: any) => {
      this.TenantBranches = res.obj
      this.loadingBranches = false
    })
    this.unsubscribe.push(GetTenantBranchesSub);
  }
  ToggleActive($event: any, id: any) {
    Swal.fire({
      title: `Are you sure You Want To ${$event ? 'Active':'Not Active'} This Branch ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        Swal.fire('',`Branch Is ${$event? 'Active' : 'Not Active'}`,'success')
           const ChangeActiveBranchSub = this._BranchesService.ChangeActiveBranch({ id: id, flag: $event }).subscribe((res) => {
                 this.GetTenantBranches()
            })
        this.unsubscribe.push(ChangeActiveBranchSub)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('',`Branch Is Still ${$event? 'Not Active' : 'Active'}`,'error')
      }
    });

  }
  updateBranch(id: string) {
    this.route.navigate(["/admin/branch_build", id])
  }
  DeleteBranch(id: string) {
    Swal.fire({
      title: 'Are you sure You Want To Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const DeleteBranchSub = this._BranchesService.DeleteBranch({ id: id }).subscribe(() => {
          this.GetTenantBranches()
        })
        this.unsubscribe.push(DeleteBranchSub)
      }
    });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
