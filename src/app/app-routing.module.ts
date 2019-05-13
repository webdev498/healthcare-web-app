//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { NgModule }                                 from '@angular/core';
import { Routes }                                   from '@angular/router';
import { RouterModule }                             from '@angular/router';

import { AuthGuard }                                from './auth.guard';

//---------------------------
// Application Views
//---------------------------



// Dialogs
import { DialogSelectRoleComponent }                from './components/Dialogs/dialog-select-role/dialog-select-role.component';
import { DialogFailedLoginComponent }               from './components/Dialogs/dialog-failed-login/dialog-failed-login.component';
import { DialogLoginError02Component }              from './components/Dialogs/dialog-login-error-02/dialog-login-error-02.component';
import { DialogPharmacyComponent }                  from './components/Dialogs/dialog-pharmacy/dialog-pharmacy.component';

import { MainHomeComponent }                        from './views/Main/main-home/main-home.component';
import { AboutComponent }                           from './views/Main/about/about.component';
import { NotFoundComponent }                        from './views/Main/not-found/not-found.component';






//-------------------------------------------------------------------------------
// Routes Configuration Array
//-------------------------------------------------------------------------------
const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainHomeComponent,
        canActivate:[AuthGuard],       
        children: [
            {
                path: 'provider-home',
                loadChildren: './views/Provider/provider.module#ProviderModule'
            },
            {
                path: 'patient-home',
                loadChildren: './views/Patient/patient.module#PatientModule'
            },
            {path: 'provider-chat',
                loadChildren: './views/Provider-Chat/provider-chat.module#ProviderChatModule'
            }
        ]
    },
    { 
        path: 'security', 
        loadChildren: './views/Security/security.module#SecurityModule' 
    },
    {
        path: 'about',
        component: AboutComponent
    },
    
    {
        path: '**',
        component: NotFoundComponent
    }
];


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class AppRoutingModule { }
