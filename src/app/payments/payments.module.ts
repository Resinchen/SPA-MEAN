import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RequestedPaymentComponent } from './requested-payment/requested-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { ClientPaymentComponent } from './client-payment/client-payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadComponent } from './head/head.component';
import { FootComponent } from './foot/foot.component';
import { RouterModule, Routes } from '@angular/router';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
    { path: 'pay/card-payment', component: CardPaymentComponent },
    { path: 'pay/client-payment', component: ClientPaymentComponent },
    { path: 'requested-payment', component: RequestedPaymentComponent }
];

@NgModule({
    declarations: [
        PayComponent,
        PaymentsComponent,
        CardPaymentComponent,
        ClientPaymentComponent,
        RequestedPaymentComponent,
        HeadComponent,
        FootComponent
    ],
    imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
})
export class PaymentsModule {}
