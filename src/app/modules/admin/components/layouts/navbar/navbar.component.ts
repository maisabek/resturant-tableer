import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AdminService } from '../../../services/admin.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 @Input('drawerIsOpened') drawerIsOpened:boolean | any;
 currentLn: any
 selectedLn: any = localStorage.getItem('selectedLn') || 'assets/images/portal/saudi-arabia-flag.svg';
 constructor(public translate:TranslateService){
  this.currentLn=localStorage.getItem('currentLanguage') || 'en'
  this.translate.use(this.currentLn)
 }
 direction: any = localStorage.getItem('direction');

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
}
