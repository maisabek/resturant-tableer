import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }
  GetAllCountries(data:any){
   return this.http.post(`${environment.baseUrl}/admin/Lookup/GetAllCountries`,data)
  }

  GetAllCitiesForUserTenant(data:any){
    return this.http.post(`${environment.baseUrl}/admin/Lookup/GetAllCitiesForUserTenant`,data)
  }
}
