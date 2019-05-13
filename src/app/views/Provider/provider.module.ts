import { NgModule }                                     from '@angular/core';
import { CommonModule }                                 from '@angular/common';

// Angular Forms
import { FormsModule }                                  from '@angular/forms';
import { ReactiveFormsModule }                          from '@angular/forms';

// Angular Material Date Provider
import { MatMomentDateModule }                          from '@angular/material-moment-adapter';

// Flex Layout
import { FlexLayoutModule }                             from '@angular/flex-layout';

// Angular Material Components
import { MaterialModule }                               from '../../core/material/material.module';

// Application Modules
import { CoreModule }                                   from '../../core/core.module';

import { ProviderRoutingModule }                        from './provider-routing.module';

import { ProviderHomeComponent }                        from './provider-home/provider-home.component';
import { ProviderPatientsComponent }                    from './provider-patients/provider-patients.component';
import { ChatWithPatientComponent }                     from './chat-with-patient/chat-with-patient.component';
import { ProviderCompletedVisitsComponent }             from './provider-completed-visits/provider-completed-visits.component';
import { ProviderMyIncompleteVisitsComponent }          from './provider-my-incomplete-visits/provider-my-incomplete-visits.component';
import { ProviderSettingsComponent }                    from './provider-settings/provider-settings.component';

import { ProviderMetricsComponent }                     from '../../components/provider-metrics/provider-metrics.component';
import { ProviderPatientRegistrationMedicalInformationComponent } from './provider-patient-registration-medical-information/provider-patient-registration-medical-information.component';
import { ProviderSecurityQuestionsComponent }           from './provider-security-questions/provider-security-questions.component';
import { ProviderIncompleteVisitsQuestionaireComponent }from './provider-incomplete-visits-questionaire/provider-incomplete-visits-questionaire.component';
import { ProviderPatientDetailsComponent }              from '../Provider/provider-patient-details/provider-patient-details.component';
import { AddendumComponent }                            from '../Provider/components/addendum/addendum.component';
import { VisitSummaryComponent }                        from '../Provider/components/visit-summary/visit-summary.component';

import { ProviderProfileComponent } from '../Provider/components/provider-profile/provider-profile.component';
import { AbsenceNoteComponent }                         from '../Provider/components/absence-note/absence-note.component';
import { ProviderMyIncompleteVisitsDetailsComponent }   from './components/provider-my-incomplete-visits-details/provider-my-incomplete-visits-details.component';
import { VisitSummaryIncompleteComponent }              from './components/visit-summary-incomplete/visit-summary-incomplete.component';
import { IncompleteVisitReviewSubmitComponent }         from './components/incomplete-visit-review-submit/incomplete-visit-review-submit.component';

import { PatientVisitsProgressEncounterComponent }      from './patient-visits-progress-encounter/patient-visits-progress-encounter.component';


@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule
  ],
  declarations: [
    ProviderHomeComponent,
    ProviderPatientsComponent,
    ChatWithPatientComponent,
    ProviderCompletedVisitsComponent,
    ProviderMyIncompleteVisitsComponent,
    ProviderSettingsComponent,
    ProviderMetricsComponent,
    ProviderPatientRegistrationMedicalInformationComponent,
    ProviderSecurityQuestionsComponent,
    ProviderIncompleteVisitsQuestionaireComponent,
    ProviderPatientDetailsComponent,
    AddendumComponent,
    VisitSummaryComponent,
    
    AbsenceNoteComponent,
    ProviderProfileComponent,
    ProviderMyIncompleteVisitsDetailsComponent,
    VisitSummaryIncompleteComponent,
    IncompleteVisitReviewSubmitComponent,
    
    PatientVisitsProgressEncounterComponent
  ],
  exports: [
    ProviderHomeComponent,
    ProviderPatientsComponent,
    ChatWithPatientComponent,
    ProviderCompletedVisitsComponent,
    ProviderMyIncompleteVisitsComponent,
    ProviderSettingsComponent,
    ProviderMetricsComponent,
    ProviderPatientRegistrationMedicalInformationComponent,
    ProviderSecurityQuestionsComponent,
    ProviderIncompleteVisitsQuestionaireComponent,
    ProviderPatientDetailsComponent,
    AddendumComponent,
    VisitSummaryComponent,
    
    AbsenceNoteComponent,
    ProviderProfileComponent,
    ProviderMyIncompleteVisitsDetailsComponent,
    VisitSummaryIncompleteComponent,
    IncompleteVisitReviewSubmitComponent,
    
    PatientVisitsProgressEncounterComponent
  ]
})
export class ProviderModule { }
