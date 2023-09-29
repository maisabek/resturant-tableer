import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    username: ["", [Validators.required]],
    email: ["", [Validators.required]],
    mobile: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })
  isValid: boolean = false
  passwordMessage: string = ''
  AuthenticateData: object = {}
  private unsubscribe: Subscription[] = []

  constructor(private fb: FormBuilder, private _AuthService: AuthService,
    private toastr: ToastrService,private router:Router) { }

  register() {
    if (this.registerForm.valid) {
    const authSub=  this._AuthService.register(this.registerForm.value).subscribe((res: any) => {
        this.AuthenticateData = res.obj
        if (res.message != '') {
          this.toastr.error(res.message, '', {
            progressBar: true,
            positionClass: 'toast-bottom-left',
          })
        }
        if(res.obj != null){
          localStorage.setItem("token", res.obj.token);
          this.router.navigate([""]);
        }

      })
      this.unsubscribe.push(authSub)
    } else {
      this.isValid = true
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
