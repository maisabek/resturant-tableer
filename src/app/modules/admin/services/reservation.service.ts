import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public datatableRerender: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http:HttpClient) { }

  GetReservationList(dataTablesParameters: any){
    return this.http.post(`${environment.baseUrl}/admin/Reservation/GetReservationList`,dataTablesParameters)
  }

  GetReservationById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Reservation/GetReservationById`,data)
  }

}
