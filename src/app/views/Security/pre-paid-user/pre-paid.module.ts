import { NgModule }                                     from '@angular/core';
import { CommonModule }                                 from '@angular/common';

// Flex Layout
import { FlexLayoutModule }                             from '@angular/flex-layout';

// Angular Forms
import { FormsModule }                                  from '@angular/forms';
import { ReactiveFormsModule }                          from '@angular/forms';

// Angular Material Components
import { MaterialModule }                               from '../../../core/material/material.module';

// Flash message
import { NgFlashMessagesModule }                        from 'ng-flash-messages';

// Routing
import { PrePaidRoutingModule }                         from './pre-paid-routing.module';

// Components
import { UserRegistrationComponent }                    from './user-registration/user-registration.component';
import { UserRegistration0Component }                   from './user-registration-0/user-registration-0.component';
import { UserRegistration1Component }                   from './user-registration-1/user-registration-1.component';
import { UserRegistrationMedicalInformationComponent }  from './user-registration-medical-information/user-registration-medical-information.component';
import { UserRegistrationSecurityQuestionComponent }    from './user-registration-security-question/user-registration-security-question.component';
import { UserRegistrationTakenComponent }               from './user-registration-taken/user-registration-taken.component';
import { VerificationEmailSentComponent }               from './verification-email-sent/verification-email-sent.component';
import { VerifyAccountComponent }                       from './verify-account/verify-account.component';
import { AllergyComponent }                             from '../../Security/pre-paid-user/components/allergy/allergy.component';

@NgModule({
  imports: [
    CommonModule,
    PrePaidRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,  
    FlexLayoutModule,
    
  ],
  declarations: [
    UserRegistrationComponent,
    UserRegistration0Component,
    UserRegistration1Component,
    UserRegistrationSecurityQuestionComponent,
    UserRegistrationMedicalInformationComponent,
    UserRegistrationTakenComponent,
    VerificationEmailSentComponent,
    VerifyAccountComponent,
    AllergyComponent
  ]
})
export class PrePaidModule { }
