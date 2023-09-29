import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  public datatableRerender: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http:HttpClient) {}
  listDataTable(dataTablesParameters: any) {
    return this.http.post(`${environment.baseUrl}/admin/Branch/GetBranchList`, dataTablesParameters)
  }

  AddOrEditBranch(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/AddOrEditBranch`, data)
  }

  DeleteBranch(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/DeleteBranch`, data)
  }

  GetBranchById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/GetBranchById`, data)
  }
  GetTenantBranches(){
    return this.http.post(`${environment.baseUrl}/Branch/GetTenantBranches`,'')
  }
  GetAdminTenantBranches(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/GetAdminTenantBranches`, data)
  }

  AddOrEditBranchAdmin(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/AddOrEditBranchAdmin`, data)

  }

  ChangeActiveBranch(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Branch/ChangeActiveBranch`, data)
  }
}
