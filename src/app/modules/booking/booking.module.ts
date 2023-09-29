import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessfulBookingComponent } from './components/successful-booking/successful-booking.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SuccessfulPaymentComponent } from './components/successful-payment/successful-payment.component';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    BookingDetailsComponent,
    SuccessfulBookingComponent,
    PaymentComponent,
    SuccessfulPaymentComponent,
    CreateAccountComponent,
    AccountLoginComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ]
})
export class BookingModule { }
