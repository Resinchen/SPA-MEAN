import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { CardPaymentComponent } from './payments/card-payment/card-payment.component';
import { ClientPaymentComponent } from './payments/client-payment/client-payment.component';
import { RequestedPaymentComponent } from './payments/requested-payment/requested-payment.component';

const routes: Routes = [
    { path: 'admin', component: AdminPanelComponent },
    {
        path: '',
        component: PaymentsComponent,
        children: [
            { path: 'card-payment', component: CardPaymentComponent },
            { path: 'client-payment', component: ClientPaymentComponent },
            { path: 'requested-payment', component: RequestedPaymentComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
