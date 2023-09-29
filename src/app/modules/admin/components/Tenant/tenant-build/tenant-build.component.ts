import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TenantService } from '../../../services/tenant.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LookupService } from '../../../services/lookup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-build',
  templateUrl: './tenant-build.component.html',
  styleUrls: ['./tenant-build.component.scss']
})
export class TenantBuildComponent {
  @ViewChild('cropper', { static: true }) cropper: TemplateRef<any> | any;
  @ViewChild('BannerImageCropper', { static: true }) BannerImageCropper: TemplateRef<any> | any;
  @ViewChild('preview', { static: true }) preview: TemplateRef<any> | any;
  @ViewChild('addTenantSubscriptionRef') addTenantSubscriptionRef: TemplateRef<any> | any
  imgsrc: string | any;
  isValid: boolean = false;
  TenantSubscriptionIsValid: boolean = false
  croppedImg: string | any
  BannerImage: string | any
  slug: string | any;
  AllTenantSubscriptions: any[] = []
  private unsubscribe: Subscription[] = []

  newTenantForm: FormGroup = this.fb.group({
    id: [null, [Validators.required]],
    title: "",
    slug: "",
    isLogoChanged: false,
    logoImageFile: "",
    isBannerChanged: false,
    bannerImageFile: "",
    primaryColor: "",
    secondaryColor: "",
    welcomeMsg: "",
    menuUrl: "",
    isActive: false,
    published: false,
    countryId: ""
  })
  TenantSubscriptionForm: FormGroup = this.fb.group({
    id: "",
    numberOfBranches: 0,
    numberOfUsers: 0,
    numberOfMonths: 0,
    amount: 0,
    tenantId: ""
  })
  constructor(protected _TenantService: TenantService, private fb: FormBuilder,
    private matDialog: MatDialog, private _activatedRoute: ActivatedRoute, private _LookupService: LookupService) { }
  ngOnInit() {
    this.croppedImg = "assets/images/default-vector-img.jpg";
    this.BannerImage = "assets/images/default-vector-img.jpg"
    this.getSlug()
    this.GetTenantSubscriptionsByTenantId()
    this.GetAllCountries()
    this.GetTenantById()
  }
  handleLogoImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgsrc = reader.result;
      this.openCropperDialog(this.cropper);
    };
    event.target.value = ''
  }


  LogoImgHandler(event: any) {
    this.croppedImg = event.image;
    this.matDialog.closeAll()
  }

  handleBannerImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgsrc = reader.result;
      this.openCropperDialog(this.BannerImageCropper);
    };
    event.target.value = ''
  }

  BannerImageHandler(event: any) {
    this.BannerImage = event.image;
    this.matDialog.closeAll()
  }

  openCropperDialog(template: TemplateRef<any>) {
    this.matDialog.open(template, {
      panelClass: 'cropper_container_dialog'
    });
  }

  OpenTenantDialog() {
    this.TenantSubscriptionForm.get('id')?.patchValue(null)
    this.TenantSubscriptionForm.get('tenantId')?.patchValue(this.slug)
    let dialogRef = this.matDialog.open(this.addTenantSubscriptionRef)

  }

  getSlug() {
    const GetParamsSub = this._activatedRoute.params.subscribe((res: any) => {
      this.slug = res.id
    })
    this.unsubscribe.push(GetParamsSub)
  }

  LogoDeleted: boolean = false
  DeleteLogoImg() {
    this.croppedImg = "assets/images/default-vector-img.jpg";
    this.LogoDeleted = true
  }

  BannerDeleted: boolean = false
  DeleteBannerImg() {
    this.BannerImage = "assets/images/default-vector-img.jpg";
    this.BannerDeleted = true
  }

  isLoading: boolean = false
  EditTenant() {
    this.isLoading = true
    this.newTenantForm.get('id')?.patchValue(this.slug)
    const splitLogoDataURI = this.croppedImg.split(',')
    if (splitLogoDataURI[0].indexOf('base64') >= 0) {
      this.newTenantForm.get('logoImageFile')?.patchValue(this.croppedImg)
      this.newTenantForm.get('isLogoChanged')?.patchValue(true);
    } else if (this.LogoDeleted) {
      this.newTenantForm.get('logoImageFile')?.patchValue(null)
      this.newTenantForm.get('isLogoChanged')?.patchValue(true);
    } else {
      this.newTenantForm.get('logoImageFile')?.patchValue(null)
      this.newTenantForm.get('isLogoChanged')?.patchValue(false);
    }

    const splitbannerDataURI = this.BannerImage.split(',')
    if (splitbannerDataURI[0].indexOf('base64') >= 0) {
      this.newTenantForm.get('bannerImageFile')?.patchValue(this.BannerImage)
      this.newTenantForm.get('isBannerChanged')?.patchValue(true);
    } else if (this.BannerDeleted) {
      this.newTenantForm.get('bannerImageFile')?.patchValue(null)
      this.newTenantForm.get('isBannerChanged')?.patchValue(true);
    } else {
      this.newTenantForm.get('bannerImageFile')?.patchValue(null);
      this.newTenantForm.get('isBannerChanged')?.patchValue(false);

    }
    this._TenantService.EditTenant(this.newTenantForm.value).subscribe((res) => {
      this.isLoading = false
    })
  }


  loadingTenant: boolean = false
  AddOrEditTenantSubscription() {
    const AddOrEditTenantSubscription = this._TenantService.AddOrEditTenantSubscription(this.TenantSubscriptionForm.value).subscribe((res) => {
      this.GetTenantSubscriptionsByTenantId()
      this.TenantSubscriptionForm.reset({
        id: "",
        numberOfBranches: 0,
        numberOfUsers: 0,
        numberOfMonths: 0,
        amount: 0,
        tenantId: ""
      })
      this.matDialog.closeAll()
    })
    this.unsubscribe.push(AddOrEditTenantSubscription)

  }

  GetTenantSubscriptionsByTenantId() {
    this.loadingTenant = true
    const GetTenantSubscriptionsByTenantIdSub = this._TenantService.GetTenantSubscriptionsByTenantId({ id: this.slug }).subscribe((res: any) => {
      this.AllTenantSubscriptions = res.obj;
      this.loadingTenant = false
    })
    this.unsubscribe.push(GetTenantSubscriptionsByTenantIdSub)

  }

  DeleteTenantSubscription(id: string) {
    Swal.fire({
      title: 'Are you sure You Want To Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const DeleteTenantSubscription = this._TenantService.DeleteTenantSubscription({ id: id }).subscribe((res) => {
          this.GetTenantSubscriptionsByTenantId()
        })
        this.unsubscribe.push(DeleteTenantSubscription)
      }
    });
  }

  GetTenantSubscriptionById(slug: any) {
    const GetTenantSubscriptionByIdSub = this._TenantService.GetTenantSubscriptionById({ id: slug }).subscribe((res: any) => {
     let dialogRef= this.matDialog.open(this.addTenantSubscriptionRef)
      dialogRef.afterClosed().subscribe(() => {
        this.TenantSubscriptionForm.reset({
          id: "",
          numberOfBranches: 0,
          numberOfUsers: 0,
          numberOfMonths: 0,
          amount: 0,
          tenantId: ""
        })
      });
      this.TenantSubscriptionForm.patchValue(res.obj)
    })
    this.unsubscribe.push(GetTenantSubscriptionByIdSub)

  }



  GetTenantById() {
    const imageUrl = 'http://209.126.85.136/tableers/uploads'
    const GetTenantByIdSub = this._TenantService.GetTenantById({ id: this.slug }).subscribe((res: any) => {
      this.newTenantForm.patchValue(res.obj)
      if (res.obj.logoImage != "") {
        this.croppedImg = `${imageUrl}/${res.obj.logoImage}`;
      } else {
        this.croppedImg = "assets/images/default-vector-img.jpg";
      }
      if (res.obj.bannerImage != "") {
        this.BannerImage = `${imageUrl}/${res.obj.bannerImage}`;
      } else {
        this.BannerImage = "assets/images/default-vector-img.jpg"
      }

    })
    this.unsubscribe.push(GetTenantByIdSub)

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
