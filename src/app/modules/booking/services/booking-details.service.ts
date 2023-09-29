import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {

  constructor(private http: HttpClient, private errorsHandler: ErrorHandler) { }
  GetBranchAvailableDays(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/WorkingSystem/GetBranchAvailableDays`, data)
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }
  GetBranchAvailableDaySlots(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/WorkingSystem/GetBranchAvailableDaySlots`, data)
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  AddReservation(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/Reservation/AddReservation`, data);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }
  GetPublicTenantById(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/Tenant/GetPublicTenantById`, data)
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  GetTenantBranches(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/Branch/GetTenantBranches`, data)
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }
}
