import { NgModule }                                   from '@angular/core';
import { Routes, RouterModule }                       from '@angular/router';

// Component
import { EnteringPaymentInformationComponent }        from './entering-payment-information/entering-payment-information.component';
import { SelectPaymentPlanComponent }                 from './select-payment-plan/select-payment-plan.component';
import { UserRegistration2Component }                 from './user-registration-2/user-registration-2.component';

const routes: Routes = [
  { 
    path: 'select-payment-plan', 
    component: SelectPaymentPlanComponent     
  },
  { 
    path: 'entering-payment-information/:total/:promotionalCode', 
    component: EnteringPaymentInformationComponent    
  },
  { 
    path: 'user-registration-2', 
    component: UserRegistration2Component,
    data : {state : 'user-registration-2'}
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfPaidRoutingModule { }
