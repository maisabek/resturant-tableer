import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public datatableRerender: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http:HttpClient) {}
  listDataTable(dataTablesParameters: any) {
    return this.http.post(`${environment.baseUrl}/admin/Tenant/GetTenantList`, dataTablesParameters)
  }

  listTenantSubscribtionTable(dataTablesParameters: any) {
    return this.http.post(`${environment.baseUrl}/admin/TenantSubscription/GetTenantSubscriptionList`, dataTablesParameters)
  }

  AddTenant(data:object){
   return this.http.post(`${environment.baseUrl}/admin/Tenant/AddTenant`,data)
  }

  EditTenant(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Tenant/EditTenant`,data)
  }

  GetTenantById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Tenant/GetTenantById`,data)
  }
  DeleteTenant(data:object){
   return this.http.post(`${environment.baseUrl}/admin/Tenant/DeleteTenant`,data)
  }

  AddOrEditTenantSubscription(data:object){
    return this.http.post(`${environment.baseUrl}/admin/TenantSubscription/AddOrEditTenantSubscription`,data)
  }

  GetTenantSubscriptionsByTenantId(data:object){
    return this.http.post(`${environment.baseUrl}/admin/TenantSubscription/GetTenantSubscriptionsByTenantId`,data)
  }

  DeleteTenantSubscription(data:object){
    return this.http.post(`${environment.baseUrl}/admin/TenantSubscription/DeleteTenantSubscription`,data)
  }

  GetTenantSubscriptionById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/TenantSubscription/GetTenantSubscriptionById`,data)
  }
  ChangePublishTenant(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Tenant/ChangePublishTenant`,data)
  }
  ChangeActiveTenant(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Tenant/ChangeActiveTenant`,data)
  }

  GetUserTenant(){
    return this.http.post(`${environment.baseUrl}/admin/Tenant/GetUserTenant`,'')
  }
}
