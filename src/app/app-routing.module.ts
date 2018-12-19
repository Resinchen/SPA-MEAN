import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { RequestedPaymentComponent } from './payments/requested-payment/requested-payment.component';

const routes: Routes = [
  { path: 'admin', component: AdminPanelComponent },
  { path: '', component: PaymentsComponent },
  { path: 'requested-payment', component: RequestedPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
