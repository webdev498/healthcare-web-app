import { NgModule }                                               from '@angular/core';
import { Routes, RouterModule }                                   from '@angular/router';

import { ProviderHomeComponent }                                  from './provider-home/provider-home.component';
import { ProviderPatientsComponent }                              from './provider-patients/provider-patients.component';
import { ChatWithPatientComponent }                               from './chat-with-patient/chat-with-patient.component';
import { ProviderCompletedVisitsComponent }                       from './provider-completed-visits/provider-completed-visits.component';
import { ProviderMyIncompleteVisitsComponent }                    from './provider-my-incomplete-visits/provider-my-incomplete-visits.component';
import { ProviderSettingsComponent }                              from './provider-settings/provider-settings.component';
import { ProviderPatientRegistrationMedicalInformationComponent } from './provider-patient-registration-medical-information/provider-patient-registration-medical-information.component';
import { ProviderIncompleteVisitsQuestionaireComponent }          from './provider-incomplete-visits-questionaire/provider-incomplete-visits-questionaire.component';
import { ProviderPatientDetailsComponent }                        from '../Provider/provider-patient-details/provider-patient-details.component';

import { ProviderMyIncompleteVisitsDetailsComponent }             from './components/provider-my-incomplete-visits-details/provider-my-incomplete-visits-details.component';
import { PatientVisitsProgressEncounterComponent }                from './patient-visits-progress-encounter/patient-visits-progress-encounter.component';


const routes: Routes = [
  {
     path: '', component: ProviderHomeComponent,
        children: [
            { path: '',                       redirectTo:'patients', pathMatch: 'full' },
            { path: 'patients',               component: ProviderPatientsComponent,             data: { state: 'patients' } },
            { path: 'chat-with-patient/:id',  component: ChatWithPatientComponent,              data: { state: 'chat-with-patient'} },
            { path: 'completed-visits',       component: ProviderCompletedVisitsComponent,      data: { state: 'completed-visits' } },
            { path: 'my-incomplete-visits',   component: ProviderMyIncompleteVisitsComponent,   data: { state: 'my-incomplete-visits' } },
            { 
              path: 'my-incomplete-visits-details/:id',   
              component: ProviderMyIncompleteVisitsDetailsComponent,
            },
            { 
              path: 'patient-visits-progress-encounter',   
              component: PatientVisitsProgressEncounterComponent
            },
            { 
              path: 'my-incomplete-visits-questionaire',   
              component: ProviderIncompleteVisitsQuestionaireComponent
            },
            { 
              path: 'settings',               
              component: ProviderSettingsComponent,             
              data: { state: 'settings' } },
            { 
              path: 'patient-registration-medical-information',   
              component: ProviderPatientRegistrationMedicalInformationComponent
            },
            {path: 'provider-patient-details/:id',  component: ProviderPatientDetailsComponent},            

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
