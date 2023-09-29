import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resturant';
  private unsubscribe: Subscription[] = []

  onActivate(event:any) {
    window.scroll(0,0);
  }
  currentLang: string='en';
  constructor(public translateService: TranslateService){
    this.currentLang = localStorage.getItem('currentLanguage') || 'en';
    this.translateService.use(this.currentLang);
  }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if(event.lang == 'ar'){
        document.body.setAttribute('dir','rtl');
      }else{
        document.body.setAttribute('dir','ltr');
      }
    })
  }

    ngDoCheck() {
    this.currentLang = localStorage.getItem('currentLanguage') || 'en'
    this.translateService.use(this.currentLang);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
