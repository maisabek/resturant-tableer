import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkingSystemService {
  public datatableRerender: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http:HttpClient) { }

  EditWorkingSystem(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/EditWorkingSystem`,data)
  }

  AddWorkingSystem(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/AddWorkingSystem`,data)

  }

  listDataTable(dataTablesParameters: any) {
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/GetBranchWorkingSystemList`, dataTablesParameters)
  }

  DeleteWorkingSystem(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/DeleteWorkingSystem`,data)
  }
  GetWorkingSystemById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/GetBranchWorkingSystemById`,data)
  }

  getAllWorkingSystemTypes(){
    return this.http.post(`${environment.baseUrl}/admin/Lookup/GetAllWorkingSystemTypes`,'')
  }

  getWorkingSystemDays(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/GetWorkingSystemDays`,data)
  }

  GetAvailableWorkingSystemDays(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/GetAvailableWorkingSystemDays`,data)
  }

  AddOrEditWorkingSystemDay(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/AddOrEditWorkingSystemDay`,data)
  }

  DeleteWorkingSystemDay(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/DeleteWorkingSystemDay`,data)
  }

  GetWorkingSystemDayById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/GetWorkingSystemDayById`,data)
  }

  GetAvailableWorkingSystemDaysEdit(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystemDay/GetAvailableWorkingSystemDaysEdit`,data)
  }

  ChangeActiveWorkingSystem(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/ChangeActiveWorkingSystem`,data)
  }
  SetDefaultWorkingSystem(data:object){
    return this.http.post(`${environment.baseUrl}/admin/WorkingSystem/SetDefaultWorkingSystem`,data)
  }

}
