import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BranchesService } from '../../../services/branches.service';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../../../services/lookup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-build',
  templateUrl: './branch-build.component.html',
  styleUrls: ['./branch-build.component.scss']
})
export class BranchBuildComponent {
  isValid: boolean = false;
  private unsubscribe: Subscription[] = []

  slug: string | any
  newBranchForm: FormGroup = this.fb.group({
    id: "",
    title: "",
    slug: "",
    location: "",
    isActive: true,
    cityId: ""
  })

  BranchAdminForm: FormGroup = this.fb.group({
    id: null,
    title: "",
    slug: "",
    location: '',
    tenantId: "",
    cityId: ""
  })

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private _LookupService: LookupService,
    private _BranchesService: BranchesService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.getSlug()
    this.GetAllCitiesForUserTenant()
    this.GetBranchById()
  }

  AddOrEditBranch() {
    this.newBranchForm.get('slug')?.patchValue('4aa46712-7e45-4b66-04be-08db9084e230')
    const AddOrEditBranchSub = this._BranchesService.AddOrEditBranch(this.newBranchForm.value).subscribe((res: any) => {
    })
    this.unsubscribe.push(AddOrEditBranchSub)
  }

  AddOrEditBranchAdmin() {
    this.BranchAdminForm.get('slug')?.patchValue('4aa46712-7e45-4b66-04be-08db9084e230')
    const AddOrEditBranchAdminSub = this._BranchesService.AddOrEditBranchAdmin(this.BranchAdminForm.value).subscribe((res) => {
    })
    this.unsubscribe.push(AddOrEditBranchAdminSub)
  }


  getSlug() {
   const GetParamsSub= this._activatedRoute.params.subscribe((res: any) => {
      this.slug = res.id
    })
    this.unsubscribe.push(GetParamsSub)
  }

  GetBranchById() {
   const GetBranchByIdSub= this._BranchesService.GetBranchById({ id: this.slug }).subscribe((res: any) => {
      this.newBranchForm.patchValue(res.obj)
    })
    this.unsubscribe.push(GetBranchByIdSub)
  }

  AllCities: any
  GetAllCitiesForUserTenant() {
   const GetAllCitiesForUserTenantSub=  this._LookupService.GetAllCitiesForUserTenant('').subscribe((res: any) => {
      this.AllCities = res.obj
    })
    this.unsubscribe.push(GetAllCitiesForUserTenantSub)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
