import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private _AuthService:AuthService,private toastr: ToastrService) { }
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(req).pipe(
        catchError((err:HttpErrorResponse)=> {
          let error = null
           if([401,403].indexOf(err.status) !== -1){
            this.toastr.error('session was expired', '',{
              progressBar:true,
              positionClass:'toast-bottom-left',
            });
            this._AuthService.userLogout();
           }else if(err.status == 404){
            this.toastr.error(err.message, '',{
              progressBar:true,
              positionClass:'toast-bottom-left',
            })
            error = err.message || err.status;
           }else if(err.status == 400 || err.status == 500){
            this.toastr.error(err.error.title, '',{
              progressBar:true,
              positionClass:'toast-bottom-left',
            })
            error = err.message || err.status;
           }else if (err.status === 0 && err.error instanceof ProgressEvent) {
            this.toastr.error('Server Disconnected', '',{
              progressBar:true,
              positionClass:'toast-bottom-left',
            })
          }
          return throwError(error)
        })
       )
     }
}
