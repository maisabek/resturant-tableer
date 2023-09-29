import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm:FormGroup=this.fb.group({
    email:["",[Validators.required]],
    password: ["",[Validators.required]]
  })
  isValid: boolean = false
  private unsubscribe: Subscription[] = []

  constructor(private _AuthService:AuthService,private fb:FormBuilder,
    private toastr:ToastrService,private router:Router){}

  login(){
    if(this.LoginForm.valid){
    const authLogin = this._AuthService.login(this.LoginForm.value).subscribe((res:any)=>{
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
      this.unsubscribe.push(authLogin)

    }else{
     this.isValid = true
    }

  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
