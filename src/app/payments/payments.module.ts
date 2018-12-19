import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RequestedPaymentComponent } from './requested-payment/requested-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { ClientPaymentComponent } from './client-payment/client-payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestedPaymentComponent,
    CardPaymentComponent,
    ClientPaymentComponent,
    PaymentsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaymentsModule {}
