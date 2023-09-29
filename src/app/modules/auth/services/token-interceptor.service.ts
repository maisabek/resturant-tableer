import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _AuthService=this.injector.get(AuthService)
    const tokenReq=req.clone({
      setHeaders: {
        Authorization: `${_AuthService.getToken()}`
      }
    })
    return next.handle(tokenReq);

  }
}
