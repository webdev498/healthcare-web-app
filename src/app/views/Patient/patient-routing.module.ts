import { NgModule }                                     from '@angular/core';

import { Routes, RouterModule }                         from '@angular/router';
import { PatientHomeComponent }                         from './patient-home/patient-home.component';
import { PatientProvidersComponent }                    from './patient-providers/patient-providers.component';
import { ChatWithProviderComponent }                    from './chat-with-provider/chat-with-provider.component';
import { PatientPlaceholderComponent }                  from './patient-placeholder/patient-placeholder.component';
import { PatientSettingsComponent }                     from './patient-settings/patient-settings.component';
import { PatientAddFamilyMembersComponent }             from './patient-add-family-members/patient-add-family-members.component';
import { PatientListFamilyMembersComponent }            from './patient-list-family-members/patient-list-family-members.component';
import { PatientMainComponent }                         from './patient-main/patient-main.component';
import { PatientSelectComponent }                       from './patient-select/patient-select.component';
import { PatientSelectReasonsVisitComponent }           from './patient-select-reasons-visit/patient-select-reasons-visit.component';
import { PatientMyaccountTabComponent }                 from './patient-myaccount-tab/patient-myaccount-tab.component';
import { MyaccountContainerComponent }                  from './components/myaccount-container/myaccount-container.component';
import { PatientUpdateCardInformationComponent }        from './patient-update-card-information/patient-update-card-information.component'
import { ManageSubscriptionComponent }                  from './components/manage-subscription/manage-subscription.component';
import { PatientProfileComponent }                      from './patient-profile/patient-profile.component';
import { PatientMedicalInformationComponent }           from '../Patient/patient-medical-information/patient-medical-information.component';
import { PatientMedicalInformationReadComponent }       from '../Patient/patient-medical-information-read/patient-medical-information-read.component';
import { MemberInformationPrivateComponent }            from './components/member-information-private/member-information-private.component';
import { PatientVisitsComponent }                       from '../Patient/patient-visits/patient-visits.component';
import { PatientFamilyMemberProfileComponent }          from '../Patient/patient-family-member-profile/patient-family-member-profile.component';
import { FamilyMemberProfileComponent }                 from '../Patient/components/family-member-profile/family-member-profile.component';
import { FamilyMemberMedicalInfoComponent }             from '../Patient/components/family-member-medical-info/family-member-medical-info.component';
import { PatientFamilyMemberMedicalInfoComponent }      from '../Patient/patient-family-member-medical-info/patient-family-member-medical-info.component';
import { PatientVisitDetailsComponent }                 from './patient-visit-details/patient-visit-details.component';
import { PatientPostVisitComponent }                    from './patient-post-visit/patient-post-visit.component';

const routes: Routes = [
  { 
    path: '', component: PatientHomeComponent,
      children: [
        { path: '',          redirectTo:'patient-main', pathMatch: 'full' },
        { path: 'visits',                                         component: PatientVisitsComponent },
        { path: 'providers/:id/:adultID/:error',                  component: PatientProvidersComponent, data: { state: 'patients' } },
        { path: 'chat-with-provider/:id/:providerId/:visitID/:adultID',    component: ChatWithProviderComponent, data: { state: 'chat-with-patient'} },
        { path: 'patient-placeholder',                            component: PatientPlaceholderComponent, data: { state: 'completed-visits' } },
        { path: 'settings',                                       component: PatientSettingsComponent, data: { state: 'settings' } },
        { path: 'patient-add-family-members',                     component: PatientAddFamilyMembersComponent, data: { state: 'patient-add-family-members'} },
        { path: 'patient-list-family-members',                    component: PatientListFamilyMembersComponent }, 
        { path: 'patient-main',                                   component: PatientMainComponent },  
        { path: 'patient-select',                                 component: PatientSelectComponent }, 
        { path: 'patient-select-reasons-visit/:id/:adultID/:providerID',component: PatientSelectReasonsVisitComponent },
        { path: 'patient-medical-info/:id/:redirect/:adultID',    component: PatientMedicalInformationComponent },
        { path: 'patient-medical-info-read/:id/:adult',           component: PatientMedicalInformationReadComponent },
        
        { path: 'patient-profile',                                component: PatientProfileComponent },
        { path: 'patient-member-information-private/:name',       component: MemberInformationPrivateComponent },
        { path: 'patient-myaccount-tab/:tabIndex',                component: PatientMyaccountTabComponent,
          children: [
            {path: '',                                            component: MyaccountContainerComponent},
            {path: 'patient-update-card-info',                    component: PatientUpdateCardInformationComponent}, 
            {path: 'patient-manage-subscription/:name/:userId/:primaryId/:isPrivate/:isActive',   component: ManageSubscriptionComponent},              
          ]
        },
        { path: 'patient-family-member-profile/:id',              component: PatientFamilyMemberProfileComponent },
        { path: 'patient-family-member-medical-info',             component: PatientFamilyMemberMedicalInfoComponent }, 
        
        { path: 'patient-visit-details/:id',                      component: PatientVisitDetailsComponent },
        { path: 'patient-post-visit/:id',                         component: PatientPostVisitComponent },
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
