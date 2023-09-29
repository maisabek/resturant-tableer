import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public translate: TranslateService,private router:Router) {
    this.currentLn=localStorage.getItem('currentLanguage') || 'en'
    this.translate.use(this.currentLn)
  }
  direction: any = localStorage.getItem('direction');
  currentLn: any
  selectedLn: any =
  localStorage.getItem('selectedLn') || 'assets/images/portal/saudi-arabia-flag.svg';
  ngOnInit() {

  }

  changeCurrentLang(language: any, img: any) {
    localStorage.clear();
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    localStorage.setItem('currentLanguage', language);
    this.selectedLn = img;
    localStorage.setItem('selectedLn', this.selectedLn);
    if (language == 'ar') {
      localStorage.setItem('direction', 'rtl');
      this.direction = 'rtl'
    } else if (language == 'en') {
      localStorage.setItem('direction', 'ltr');
      this.direction = 'ltr'
    }
  }

  public navigateToSection(section: string) {
    this.router.navigate([''], { fragment: section })
   }
}
