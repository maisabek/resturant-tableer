import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body.message && event.body.code == 200) {
          this.toastr.success(event.body.message, '',{
            progressBar:true,
            positionClass:'toast-bottom-left',
          });

        }
      })
    )
  }
}
