import { NgModule }                                     from '@angular/core';
import { Routes, RouterModule }                         from '@angular/router';
import { UserRegistrationComponent }                    from './user-registration/user-registration.component';
import { UserRegistration0Component }                   from './user-registration-0/user-registration-0.component';
import { UserRegistration1Component }                   from './user-registration-1/user-registration-1.component';
import { UserRegistrationMedicalInformationComponent }  from './user-registration-medical-information/user-registration-medical-information.component';
import { UserRegistrationSecurityQuestionComponent }    from './user-registration-security-question/user-registration-security-question.component';
import { UserRegistrationTakenComponent }               from './user-registration-taken/user-registration-taken.component';
import { VerificationEmailSentComponent }               from './verification-email-sent/verification-email-sent.component';
import { VerifyAccountComponent }                       from './verify-account/verify-account.component';

const routes: Routes = [
  { path: 'user-registration-0',                    component: UserRegistrationComponent },
  { path: 'user-registration',                      component: UserRegistration0Component },
  { path: 'user-registration-1',                    component: UserRegistration1Component },
  { path: 'user-registration-medical-information/:id',  component: UserRegistrationMedicalInformationComponent },
  { path: 'user-registration-security-question',    component: UserRegistrationSecurityQuestionComponent },
  { path: 'user-registration-taken',                component: UserRegistrationTakenComponent },
  { path: 'verification-email-sent/:email',         component: VerificationEmailSentComponent },
  { path: 'verify-account',                         component: VerifyAccountComponent, data : { patient : 'patient' } },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrePaidRoutingModule { }
