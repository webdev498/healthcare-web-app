import { NgModule }                               from '@angular/core';

import { Routes, RouterModule }                   from '@angular/router';

// Components
import { ForgotPasswordComponent }                from './forgot-password/forgot-password.component';
import { ForgotPasswordSecurityQuestionComponent }from './forgot-password-security-question/forgot-password-security-question.component';
import { ForgotPasswordSetNewComponent }          from './forgot-password-set-new/forgot-password-set-new.component';
import { ForgotPasswordSuccessComponent }         from './forgot-password-success/forgot-password-success.component';
import { RecoverPasswordComponent }               from './recover-password/recover-password.component';
import { FpAuthenticationFactorsComponent }       from './fp-authentication-factors/fp-authentication-factors.component';

const routes: Routes = [
  { path: 'forgot-password-authentication-factors/:id',   component: FpAuthenticationFactorsComponent },
  { path: 'forgot-password',                              component: ForgotPasswordComponent },
  {
    path: 'forgot-password-security-question',            component: ForgotPasswordSecurityQuestionComponent,
    data: { state: 'forgot-password-security-question' }
  },
  { path: 'forgot-password-set-new/:id',                  component: ForgotPasswordSetNewComponent },
  { path: 'forgot-password-success',                      component: ForgotPasswordSuccessComponent },
  { path: 'recover-password',                             component: RecoverPasswordComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
