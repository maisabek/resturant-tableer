import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { HomeComponent } from './componets/home/home.component';
import { ContactComponent } from './componets/contact/contact.component';
import { OwlModule } from 'ngx-owl-carousel';
import { StarRatingModule } from 'angular-star-rating';
import { NavbarComponent } from './componets/layouts/navbar/navbar.component';
import { FooterComponent } from './componets/layouts/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CountUpModule } from 'ngx-countup';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { HowItWorksComponent } from './componets/how-it-works/how-it-works.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    HowItWorksComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    OwlModule,
    StarRatingModule.forRoot(),
    // TranslateModule.forChild({
    //   extend: true
    // }),
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    CountUpModule,
    MatSlideToggleModule,
    SharedModule
  ]
})
export class GeneralModule { }
