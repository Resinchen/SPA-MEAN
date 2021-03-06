import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { CardPaymentComponent } from './payments/card-payment/card-payment.component';
import { ClientPaymentComponent } from './payments/client-payment/client-payment.component';
import { RequestedPaymentComponent } from './payments/requested-payment/requested-payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PayComponent } from './payments/pay/pay.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'pay/card-payment', pathMatch: 'full' },
    {
        path: '',
        component: PaymentsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'pay',
                component: PayComponent,
                children: [
                    { path: 'card-payment', component: CardPaymentComponent },
                    {
                        path: 'client-payment',
                        component: ClientPaymentComponent
                    }
                ]
            },
            { path: 'requested-payment', component: RequestedPaymentComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
