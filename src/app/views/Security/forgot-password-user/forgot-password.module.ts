import { NgModule }                                     from '@angular/core';
import { CommonModule }                                 from '@angular/common';

// Angular Forms
import { FormsModule }                                  from '@angular/forms';
import { ReactiveFormsModule }                          from '@angular/forms';

// Angular Material Components
import { MaterialModule }                               from '../../../core/material/material.module';

// Flex Layout
import { FlexLayoutModule }                             from '@angular/flex-layout';

// Routing
import { ForgotPasswordRoutingModule }                  from "./forgot-password-routing.module";

// Components
import { ForgotPasswordComponent }                      from './forgot-password/forgot-password.component';
import { ForgotPasswordSecurityQuestionComponent }      from './forgot-password-security-question/forgot-password-security-question.component';
import { ForgotPasswordSetNewComponent }                from './forgot-password-set-new/forgot-password-set-new.component';
import { ForgotPasswordSuccessComponent }               from './forgot-password-success/forgot-password-success.component';
import { RecoverPasswordComponent }                     from './recover-password/recover-password.component';
import { FpAuthenticationFactorsComponent }             from './fp-authentication-factors/fp-authentication-factors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [
    ForgotPasswordComponent,
    ForgotPasswordSecurityQuestionComponent,
    ForgotPasswordSetNewComponent,
    ForgotPasswordSuccessComponent,
    RecoverPasswordComponent,
    FpAuthenticationFactorsComponent
  ]
})
export class ForgotPasswordModule { }
