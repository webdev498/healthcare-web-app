import { NgModule }                                   from '@angular/core';
import { CommonModule }                               from '@angular/common';

import { Routes, RouterModule }                       from '@angular/router';

// Angular Forms
import { FormsModule }                                from '@angular/forms';
import { ReactiveFormsModule }                        from '@angular/forms';

// Angular Material Date Provider
import { MatMomentDateModule }                        from '@angular/material-moment-adapter';

// Flex Layout
import { FlexLayoutModule }                           from '@angular/flex-layout';

// Angular Material Components
import { MaterialModule }                             from '../../../core/material/material.module';

// Components
import { LoginComponent }                             from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }
];


@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatMomentDateModule,

    FlexLayoutModule,
    MaterialModule,

    RouterModule.forChild(routes)


  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
