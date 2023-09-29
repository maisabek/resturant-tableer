import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserSurveyService {

  constructor(private http: HttpClient, private errorsHandler: ErrorHandler) { }
  GetUserQuestionsSurvey(slug: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/Survey/GetUserSurvey`, slug, httpOptions);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  submitUserSurvey(data: object): Observable<any> | any {
    try {
      return this.http.post(`${environment.baseUrl}/Survey/SubmitUserSurvey`, data, { responseType: 'text' });
    } catch (err) {
      this.errorsHandler.handleError(err);
    }

  }


}
