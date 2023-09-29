import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SurvayService {
  loadingDatatable:boolean=false;
  public datatableRerender: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {}

  listDataTable(dataTablesParameters: any) {
    return this.http.post(`${environment.baseUrl}/admin/Survey/GetSurveyList`, dataTablesParameters)
  }

  AddOrEdit(data:any){
    return this.http.post(`${environment.baseUrl}/admin/Survey/AddOrEditSurvey`,data)
  }

  GetAllSurveyRateStyles(ExtraData:any){
    return this.http.post(`${environment.baseUrl}/admin/Lookup/GetAllSurveyRateStyles`,ExtraData)
  }

  AddOrEditSurveyQuestion(data:any){
    return this.http.post(`${environment.baseUrl}/admin/SurveyQuestion/AddOrEditSurveyQuestion`,data)
  }

  GetSurveyQuestions(id:any){
    return this.http.post(`${environment.baseUrl}/admin/SurveyQuestion/GetSurveyQuestions`,id)
  }

  DeleteSurveyQuestion(id:object){
    return this.http.post(`${environment.baseUrl}/admin/SurveyQuestion/DeleteSurveyQuestion`,id)
  }

  GetSurveyQuestionById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/SurveyQuestion/GetSurveyQuestionById`,data)
  }

  GetSurveyById(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Survey/GetSurveyById`,data)
  }

  DeleteSurvey(data:object){
    return this.http.post(`${environment.baseUrl}/admin/Survey/DeleteSurvey`,data)
  }

}
