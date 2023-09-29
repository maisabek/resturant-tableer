import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,
  private errorsHandler: ErrorHandler) { }
  login(user: object): Observable<any> | any {
    try {
      return this.http.post<any>(`${environment.baseUrl}/Auth/GetToken`, user);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  register(data: object) : Observable<any> | any{
    try {
    return this.http.post(`${environment.baseUrl}/Auth/Register`, data)
    }
    catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  userLogout() {
    this.router.navigate(["/auth/login"]);
    return localStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

}
