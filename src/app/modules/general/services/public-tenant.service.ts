import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicTenantService {

  constructor(private http:HttpClient) { }
  GetPublicTenantList(){
    return this.http.post(`${environment.baseUrl}/Tenant/GetPublicTenantList`,'')
  }

}
