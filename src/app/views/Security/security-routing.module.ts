import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { AuthenticationFactorsComponent }   from './authentication-factors/authentication-factors.component'
import { SetPasswordMakePrivateComponent }  from './set-password-make-private/set-password-make-private.component';
import { OauthTokenComponent } from './oauth-token/oauth-token.component';

const routes: Routes = [
  { path: 'login', 					          loadChildren: './login/login.module#LoginModule'},
  { path: 'self-paid', 				        loadChildren: './self-paid-user/self-paid.module#SelfPaidModule'},
  { path: 'pre-paid', 				        loadChildren: './pre-paid-user/pre-paid.module#PrePaidModule'},
  { path: 'forgot-password', 		      loadChildren: './forgot-password-user/forgot-password.module#ForgotPasswordModule'},
  { path: 'authentication-factors',               component: AuthenticationFactorsComponent},
  { path: 'patient-set-password-make-private',    component: SetPasswordMakePrivateComponent },
  { path: 'token',              component: OauthTokenComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
