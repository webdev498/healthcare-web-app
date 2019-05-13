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

// Routing 
import { PatientRoutingModule}                          from './patient-routing.module';

// Components
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
import { PatientUpdateCardInformationComponent }        from '../Patient/patient-update-card-information/patient-update-card-information.component';
import { PatientProfileComponent }                      from './patient-profile/patient-profile.component';
import { MemberInformationPrivateComponent }            from './components/member-information-private/member-information-private.component';

//components into components
import { ManageSubscriptionComponent }                  from './components/manage-subscription/manage-subscription.component';
import { ManageMembersComponent }                       from './components/manage-members/manage-members.component';
import { PaymentPlanComponent }                         from './components/payment-plan/payment-plan.component';
import { MyaccountContainerComponent }                  from './components/myaccount-container/myaccount-container.component';
import { PatientMedicalInformationComponent }           from '../Patient/patient-medical-information/patient-medical-information.component';
import { PatientVisitsComponent }                       from '../Patient/patient-visits/patient-visits.component';
import { MyaccountFinePrintComponent }                  from '../Patient/components/myaccount-fine-print/myaccount-fine-print.component';
import { PatientFamilyMemberProfileComponent }          from '../Patient/patient-family-member-profile/patient-family-member-profile.component';
import { FamilyMemberProfileComponent }                 from '../Patient/components/family-member-profile/family-member-profile.component';
import { FamilyMemberMedicalInfoComponent }             from '../Patient/components/family-member-medical-info/family-member-medical-info.component';
import { PatientFamilyMemberMedicalInfoComponent }      from '../Patient/patient-family-member-medical-info/patient-family-member-medical-info.component';
import { PatientVisitDetailsComponent }                 from './patient-visit-details/patient-visit-details.component';
import { PatientMedicalInformationReadComponent }       from './patient-medical-information-read/patient-medical-information-read.component';
import { PatientPostVisitComponent }                    from './patient-post-visit/patient-post-visit.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    FlexLayoutModule,
    MaterialModule,
    PatientRoutingModule,
    CoreModule
  ],
  declarations: [
    PatientHomeComponent,
    PatientProvidersComponent,
    ChatWithProviderComponent,
    PatientPlaceholderComponent,
    PatientSettingsComponent, 
    PatientAddFamilyMembersComponent,
    PatientListFamilyMembersComponent,
    PatientMainComponent,
    PatientSelectComponent,
    PatientSelectReasonsVisitComponent,
    PatientMyaccountTabComponent,
    ManageSubscriptionComponent,
    ManageMembersComponent,
    PaymentPlanComponent,
    PatientUpdateCardInformationComponent,
    MyaccountContainerComponent,
    PatientProfileComponent,
    PatientMedicalInformationComponent,
    MemberInformationPrivateComponent,
    PatientVisitsComponent,
    MyaccountFinePrintComponent,
    PatientFamilyMemberProfileComponent,
    FamilyMemberProfileComponent,
    FamilyMemberMedicalInfoComponent,
    PatientFamilyMemberMedicalInfoComponent,
    PatientVisitDetailsComponent,
    PatientMedicalInformationReadComponent,
    PatientPostVisitComponent,



  ]
})
export class PatientModule { }
