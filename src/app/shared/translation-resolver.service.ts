import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationResolverService implements Resolve<any>{
  mySubscription: any;
  constructor(private translateService: TranslateService) {}
  resolve(): Observable<any> {
    return this.translateService.getTranslation(
      this.translateService.currentLang
    );
  }
}
