import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { SuccessfulBookingComponent } from './components/successful-booking/successful-booking.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SuccessfulPaymentComponent } from './components/successful-payment/successful-payment.component';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  {path:'booking-details/:slug',component:BookingDetailsComponent},
  {path:'successfull_booking/:slug',component:SuccessfulBookingComponent},
  {path:'payment/:slug',component:PaymentComponent},
  {path:'successfull_payment/:slug',component:SuccessfulPaymentComponent},
  {path:'create_account/:slug',component:CreateAccountComponent},
  {path:'account_login/:slug',component:AccountLoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
