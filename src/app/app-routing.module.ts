import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found-page/not-found.component';
import { TranslationResolverService } from './shared/translation-resolver.service';

const routes: Routes = [
  // {
  // path:'',
  // redirectTo:'portal',
  // pathMatch:'full'
  // },
  {
    path:'',
    resolve:{translate:TranslationResolverService},
    loadChildren:()=>import('../app/modules/general/general.module').then((m)=>m.GeneralModule)
  },
  {
  path:'auth',
  loadChildren:()=>import('../app/modules/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
   path:'Booking',
   loadChildren:()=>import('../app/modules/booking/booking.module').then((m)=>m.BookingModule)
  },
  {
   path:'Payment',
   loadChildren:()=>import('../app/modules/payment/payment.module').then((m)=>m.PaymentModule)
  },
  {
   path:'survey',
   loadChildren:()=>import('../app/modules/survay/survay.module').then((m)=>m.SurvayModule)

  },
  {
    path:'admin',
    resolve:{translate:TranslationResolverService},
    loadChildren:()=>import('../app/modules/admin/admin.module').then((m)=>m.AdminModule)
  },
  {
    path:'**',
    component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',
    preloadingStrategy:PreloadAllModules,
    useHash:true
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
