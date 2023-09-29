import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgwWowModule } from 'ngx-wow';
import { PreloaderComponent } from './preloader/preloader.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NotFoundComponent } from './not-found-page/not-found.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoadingComponent } from './loading/loading.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoaderComponent } from './loader/loader.component';

const lang = 'en-US';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    PreloaderComponent,
    TimelineComponent,
    NotFoundComponent,
    DatatableComponent,
    LoadingComponent,
    ImageCropperComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgwWowModule,
    DataTablesModule,
    CKEditorModule,
    HttpClientModule,
    NgxMatTimepickerModule.setLocale(lang),
    ToastrModule.forRoot(),
    CarouselModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),

  ],
  exports:[
    MaterialModule,
    NgwWowModule,
    PreloaderComponent,
    TimelineComponent,
    NotFoundComponent,
    DatatableComponent,
    DataTablesModule,
    CKEditorModule,
    LoadingComponent,
    HttpClientModule,
    NgxMatTimepickerModule,
    ToastrModule,
    TranslateModule,
    ImageCropperComponent,
    CarouselModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: lang },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    DatePipe
  ]

})
export class SharedModule { }
