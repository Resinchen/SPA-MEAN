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

const routes: Routes = [
    { path: 'card-payment', component: CardPaymentComponent },
    { path: 'client-payment', component: ClientPaymentComponent },
    { path: 'requested-payment', component: RequestedPaymentComponent }
];

@NgModule({
    declarations: [
        PaymentsComponent,
        CardPaymentComponent,
        ClientPaymentComponent,
        RequestedPaymentComponent,
        HeadComponent,
        FootComponent
    ],
    imports: [RouterModule.forRoot(routes), CommonModule, ReactiveFormsModule],
})
export class PaymentsModule {}
