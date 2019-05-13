import { NgModule }                                   from '@angular/core';
import { CommonModule }                               from '@angular/common';

// Angular Forms
import { FormsModule }                                from '@angular/forms';
import { ReactiveFormsModule }                        from '@angular/forms';

// Angular Material Date Provider
import { MatMomentDateModule }                        from '@angular/material-moment-adapter';
// Angular Material Components
import { MaterialModule }                             from '../../../core/material/material.module';

// Flex Layout
import { FlexLayoutModule }                           from '@angular/flex-layout';


// Routing
import { SelfPaidRoutingModule }                      from './self-paid-routing.module';


// Component
import { EnteringPaymentInformationComponent }        from './entering-payment-information/entering-payment-information.component';
import { SelectPaymentPlanComponent }                 from './select-payment-plan/select-payment-plan.component';
import { UserRegistration2Component }                 from './user-registration-2/user-registration-2.component';

@NgModule({
  imports: [
    CommonModule,
    SelfPaidRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatMomentDateModule,    
    MaterialModule,
    FlexLayoutModule,        
    
  ],
  declarations: [
    SelectPaymentPlanComponent,
    EnteringPaymentInformationComponent,
    UserRegistration2Component
  ]
})
export class SelfPaidModule { }
