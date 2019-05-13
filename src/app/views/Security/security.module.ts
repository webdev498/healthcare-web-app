import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

// Angular Forms
import { FormsModule }                      from '@angular/forms';
import { ReactiveFormsModule }              from '@angular/forms';

// Angular Material Components
import { MaterialModule }                   from '../../core/material/material.module';
// Flex Layout
import { FlexLayoutModule }                 from '@angular/flex-layout';


// routing
import { SecurityRoutingModule }            from './security-routing.module';
import { AuthenticationFactorsComponent }   from './authentication-factors/authentication-factors.component';
import { SetPasswordMakePrivateComponent }  from './set-password-make-private/set-password-make-private.component';
import { OauthTokenComponent } from './oauth-token/oauth-token.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SecurityRoutingModule
  ],
  declarations: [
    AuthenticationFactorsComponent,
    SetPasswordMakePrivateComponent,
    OauthTokenComponent
  ]
})
export class SecurityModule { }
