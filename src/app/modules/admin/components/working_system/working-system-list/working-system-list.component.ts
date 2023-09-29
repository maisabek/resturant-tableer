import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WorkingSystemService } from '../../../services/working-system.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-working-system-list',
  templateUrl: './working-system-list.component.html',
  styleUrls: ['./working-system-list.component.scss']
})
export class WorkingSystemListComponent {
  isValid: boolean = false
  newWorkingSystemForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    workingSystemTypeId: ['', [Validators.required]]
  })
  columns: object[] | any
  private unsubscribe: Subscription[] = []

  @ViewChild('addWorkingSystemDialogRef', { static: true }) WorkingSystemDialogRef: TemplateRef<any> | any
  constructor(private fb: FormBuilder, private matDialog: MatDialog, private translate: TranslateService,
    protected _WorkingSystemService: WorkingSystemService, private route: Router) {
    this.columns = [
      {
        data: 'title',
        title: 'Title'
      },
      {
        data: 'isActive',
        title: 'Is Active'

      },
      {
        data: 'isDefault',
        title: 'Is Default',

      },
      {
        data: 'setting',
        title: 'Actions'

      }
    ];
  }

  ngOnInit() {
    this.GetBranchAvailableDays()

  }
  openDialog() {
    this.matDialog.open(this.WorkingSystemDialogRef)
  }

  addNewWorkingSystem() {
    if (this.newWorkingSystemForm.valid) {
      const workingSystemSub = this._WorkingSystemService.AddWorkingSystem(this.newWorkingSystemForm.value).subscribe((res: any) => {
        this.route.navigate(['admin/Working_System_build', res.obj])
        this.matDialog.closeAll()
      })
      this.unsubscribe.push(workingSystemSub)

    } else {
      this.isValid = true;
    }
  }

  WorkingSystemTypes: any
  GetBranchAvailableDays() {
    const WorkingSystemTypesSub = this._WorkingSystemService.getAllWorkingSystemTypes().subscribe((res: any) => {
      this.WorkingSystemTypes = res.obj
    })
    this.unsubscribe.push(WorkingSystemTypesSub)
  }

  eventHandler(event: any) {
    switch (event.type) {
      case 'update':
        this.route.navigate(['admin/Working_System_build', event.payload])
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
            const DeleteWorkingSystemSub = this._WorkingSystemService.DeleteWorkingSystem({ id: event.payload }).subscribe(() => {
              this._WorkingSystemService.datatableRerender.next(true)
            })
            this.unsubscribe.push(DeleteWorkingSystemSub)
          }
        });
        break;

      case 'active':
        Swal.fire({
          title: `Are you sure You Want To ${event.payload.flag ? 'Active':'Not Active'}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('',`Working System Is ${event.payload.flag ? 'Active' : 'Not Active'}`,'success')
            const ChangeActiveWorkingSystemSub = this._WorkingSystemService.ChangeActiveWorkingSystem(event.payload).subscribe((res) => {
              this._WorkingSystemService.datatableRerender.next(true)
            })
            this.unsubscribe.push(ChangeActiveWorkingSystemSub)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('',`Working System Is Still ${event.payload.flag ? 'Not Active' : 'Active'}`,'error')
          }
        });

        break;

      case 'default':
        Swal.fire({
          title: `Are you sure You Want To  This Working system Defaultly?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('',`Working System Is Default`,'success')
            const WorkingSystemDefaultSub = this._WorkingSystemService.SetDefaultWorkingSystem(event.payload).subscribe((res) => {
              this._WorkingSystemService.datatableRerender.next(true)
            })
            this.unsubscribe.push(WorkingSystemDefaultSub)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('',`Working System Is Still Not Default`,'error')
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
