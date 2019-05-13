//---------------------------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------------------------
import { BrowserModule }                              from '@angular/platform-browser';
import { NgModule }                                   from '@angular/core';
import { AppComponent }                               from './app.component';

//Drag and Drop
import { DndModule }                                  from 'ngx-drag-drop';

//Http
//http
import { HttpClientModule, HTTP_INTERCEPTORS }       from '@angular/common/http';

// Angular Routing:
import { AppRoutingModule }                           from './app-routing.module';

// Angular Forms
import { FormsModule }                                from '@angular/forms';
import { ReactiveFormsModule }                        from '@angular/forms';

// Angular Material Animations
import { BrowserAnimationsModule }                    from '@angular/platform-browser/animations';

// Angular Material Date Provider
import { MatMomentDateModule }                        from '@angular/material-moment-adapter';

// Flex Layout
import { FlexLayoutModule }                           from '@angular/flex-layout';

// Angular Material Components
import { MaterialModule }                             from './core/material/material.module';
import { NgxUploaderModule }                          from 'ngx-uploader';


// Own Components
import { HeaderComponent }                            from './components/header/header.component';
import { NotLoggedInHeaderComponent }                 from './components/not-logged-in-header/not-logged-in-header.component';
import { FooterComponent }                            from './components/footer/footer.component';


/*import { NavigationButtonComponent }                  from './components/navigation-button/navigation-button.component';
import { NavigationColumnComponent }                  from './components/navigation-column/navigation-column.component';*/


// Dialogs
import { DialogSelectRoleComponent }                  from './components/Dialogs/dialog-select-role/dialog-select-role.component';
import { DialogFailedLoginComponent }                 from './components/Dialogs/dialog-failed-login/dialog-failed-login.component';
import { DialogLoginError02Component }                from './components/Dialogs/dialog-login-error-02/dialog-login-error-02.component';
import { DialogTermsOfUseComponent }                  from './components/Dialogs/dialog-terms-of-use/dialog-terms-of-use.component';
import { DialogPharmacyComponent }                    from './components/Dialogs/dialog-pharmacy/dialog-pharmacy.component';
import { DialogAllergyComponent }                     from './components/Dialogs/dialog-allergy/dialog-allergy.component';
import { DialogMedicationComponent }                  from './components/Dialogs/dialog-medication/dialog-medication.component';
import { DialogSurgeryComponent }                     from './components/Dialogs/dialog-surgery/dialog-surgery.component';
import { DialogPrimaryCareProviderComponent }         from './components/Dialogs/dialog-primary-care-provider/dialog-primary-care-provider.component';
import { DialogCardVerificationErrorComponent }       from './components/Dialogs/dialog-card-verification-error/dialog-card-verification-error.component';
import { DialogCardValidationComponent }              from './components/Dialogs/dialog-card-validation/dialog-card-validation.component';
import { DialogPaymentErrorComponent }                from './components/Dialogs/dialog-payment-error/dialog-payment-error.component';
import { DialogEmailAttempsComponent }                from './components/Dialogs/dialog-email-attemps/dialog-email-attemps.component';
import { DialogAddFamilyMemberComponent }             from './components/Dialogs/dialog-add-family-member/dialog-add-family-member.component';
import { DialogAmountSlotMembersComponent }           from './components/Dialogs/dialog-amount-slot-members/dialog-amount-slot-members.component';
import { DialogBillingPoliciesComponent }             from './components/Dialogs/dialog-billing-policies/dialog-billing-policies.component';
import { DialogMyaccountMoreInformationComponent }    from './components/Dialogs/dialog-myaccount-more-information/dialog-myaccount-more-information.component';
import { DialogMyaccountManageSubscriptionComponent } from './components/Dialogs/dialog-myaccount-manage-subscription/dialog-myaccount-manage-subscription.component';
import { DialogChangePasswordComponent }              from './components/Dialogs/dialog-change-password/dialog-change-password.component';
import { DialogChangePasswordConfirmationComponent }  from './components/Dialogs/dialog-change-password-confirmation/dialog-change-password-confirmation.component';
import { DialogUploadPhotoComponent }                 from './components/Dialogs/dialog-upload-photo/dialog-upload-photo.component';
import { DialogChangePlanComponent }                  from './components/Dialogs/dialog-change-plan/dialog-change-plan.component';
import { DialogCancelPlanComponent }                  from './components/Dialogs/dialog-cancel-plan/dialog-cancel-plan.component';
import { DialogPlanMakePrivateComponent }             from './components/Dialogs/dialog-plan-make-private/dialog-plan-make-private.component';
import { DialogDeactivateFamilyMemberComponent }      from './components/Dialogs/dialog-deactivate-family-member/dialog-deactivate-family-member.component';
import { DialogReactivateFamilyMemberComponent }      from './components/Dialogs/dialog-reactivate-family-member/dialog-reactivate-family-member.component';
import { DialogRemoveFamilyMemberComponent }          from './components/Dialogs/dialog-remove-family-member/dialog-remove-family-member.component';
import { DialogFamilyMemberAddedComponent }           from './components/Dialogs/dialog-family-member-added/dialog-family-member-added.component';
import { DialogEndVisitRequestComponent }             from './components/Dialogs/dialog-end-visit-request/dialog-end-visit-request.component';
import { DialogCodeVerificationSentComponent }        from './components/Dialogs/dialog-code-verification-sent/dialog-code-verification-sent.component';

// Providers Dialogs
import { DialogSecurityQuestionComponent }            from './components/DialogsProvider/dialog-security-question/dialog-security-question.component';
import { DialogAddPrimaryCareProviderSearchComponent }from './components/DialogsProvider/dialog-add-primary-care-provider-search/dialog-add-primary-care-provider-search.component';
import { DialogDeletePrimaryCareProviderComponent }   from './components/DialogsProvider/dialog-delete-primary-care-provider/dialog-delete-primary-care-provider.component';
import { DialogChangeRoleComponent }                  from './components/DialogsProvider/dialog-change-role/dialog-change-role.component';
import { DialogAddPharmacyComponent }                 from './components/DialogsProvider/dialog-add-pharmacy/dialog-add-pharmacy.component';
import { DialogDeletePharmacyComponent }              from './components/DialogsProvider/dialog-delete-pharmacy/dialog-delete-pharmacy.component';
import { DialogDeleteAllergyComponent }               from './components/DialogsProvider/dialog-delete-allergy/dialog-delete-allergy.component';
import { DialogDeleteMedicationComponent }            from './components/DialogsProvider/dialog-delete-medication/dialog-delete-medication.component';
import { DialogDeleteSurgeryComponent }               from './components/DialogsProvider/dialog-delete-surgery/dialog-delete-surgery.component';
import { DialogCompleteVisitComponent }               from './components/DialogsProvider/dialog-complete-visit/dialog-complete-visit.component';
import { DialogPatientRegistrationComponent }         from './components/DialogsProvider/dialog-patient-registration/dialog-patient-registration.component';
import { DialogNoChangeRoleComponent }                from './components/DialogsProvider/dialog-no-change-role/dialog-no-change-role.component';
import { DialogAddQuickPhraseComponent }              from './components/DialogsProvider/dialog-add-quick-phrase/dialog-add-quick-phrase.component';
import { DialogDeleteQuickPhraseComponent }           from './components/DialogsProvider/dialog-delete-quick-phrase/dialog-delete-quick-phrase.component';
import { DialogAddendumComponent }                    from './components/DialogsProvider/dialog-addendum/dialog-addendum.component';
import { DialogAbsenceNoteComponent }                 from './components/DialogsProvider/dialog-absence-note/dialog-absence-note.component';
import { DialogNotesDiagnosisComponent }              from './components/DialogsProvider/dialog-notes-diagnosis/dialog-notes-diagnosis.component';
import { DialogDeleteDocumentComponent }              from './components/DialogsProvider/dialog-delete-document/dialog-delete-document.component';
import { DialogAddDocumentComponent  }                from './components/DialogsProvider/dialog-add-document/dialog-add-document.component';
import { DialogVideoVisitRequestComponent }           from './components/DialogsProvider/dialog-video-visit-request/dialog-video-visit-request.component';
import { DialogVideoVisitWaitingComponent }           from './components/DialogsProvider/dialog-video-visit-waiting/dialog-video-visit-waiting.component';
import { DialogVideoVisitDeniedComponent }            from './components/DialogsProvider/dialog-video-visit-denied/dialog-video-visit-denied.component';
import { DialogVideoVisitErrorComponent }             from './components/DialogsProvider/dialog-video-visit-error/dialog-video-visit-error.component';
import { DialogEndVideoRequestComponent }             from './components/DialogsProvider/dialog-end-video-request/dialog-end-video-request.component';
import { DialogEndVisitComponent }                    from './components/DialogsProvider/dialog-end-visit/dialog-end-visit.component';
import { DialogConfirmEcounterNotesComponent }        from './components/DialogsProvider/dialog-confirm-ecounter-notes/dialog-confirm-ecounter-notes.component';
import { DialogVoiceVisitRequestComponent }           from './components/DialogsProvider/dialog-voice-visit-request/dialog-voice-visit-request.component';
import { DialogVoiceVisitWaitingComponent }           from './components/DialogsProvider/dialog-voice-visit-waiting/dialog-voice-visit-waiting.component';
import { DialogCloseSessionComponent }                from './components/Dialogs/dialog-close-session/dialog-close-session.component';


// Views By Section Modules
// Main
import { MainHomeComponent }                          from './views/Main/main-home/main-home.component';
import { AboutComponent }                             from './views/Main/about/about.component';
import { NotFoundComponent }                          from './views/Main/not-found/not-found.component';

// Application Services
import { PatientsService }                            from './services/patients.service';
import { ProvidersService }                           from './services/providers.service';
import { ConsultationsService }                       from './services/consultations.service';
import { SecurityService }                            from './services/security.service';
import { UserService }                                from './services/user.service';
import { VisitService }                               from './services/visit.service';
import { MessagingService  }                          from './services/messaging.service';
import { MedicalIssueService  }                       from './services/medical-issue.service';

// Flash message
import { NgFlashMessagesModule }                      from 'ng-flash-messages';


// Application Modules
import { CoreModule }                                 from './core/core.module';
import { ValidatorsLibrary }                          from './core/services/validators.service';
import { TokenInterceptor }                           from './services/token.interceptor';







//---------------------------------------------------------------------------------------
// Module Section
//---------------------------------------------------------------------------------------
@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    NotLoggedInHeaderComponent,
    FooterComponent,
    //NavigationButtonComponent,
   // NavigationColumnComponent,    

    DialogSelectRoleComponent,
    DialogFailedLoginComponent,
    DialogLoginError02Component,
    DialogTermsOfUseComponent,  
    DialogPharmacyComponent,
    DialogAllergyComponent,  
    DialogMedicationComponent,
    DialogSurgeryComponent,
    DialogPrimaryCareProviderComponent,
    DialogCardVerificationErrorComponent,
    DialogCardValidationComponent,
    DialogEmailAttempsComponent,
    DialogAddFamilyMemberComponent,
    DialogPharmacyComponent,
    DialogAllergyComponent,
    DialogMedicationComponent,
    DialogSurgeryComponent,
    DialogPrimaryCareProviderComponent,    
    DialogPaymentErrorComponent, 
    DialogEmailAttempsComponent, 
    DialogAmountSlotMembersComponent,
    DialogBillingPoliciesComponent, 
    DialogMyaccountManageSubscriptionComponent,             
    DialogMyaccountMoreInformationComponent,
    DialogChangePasswordComponent,      
    DialogChangePasswordConfirmationComponent,
    DialogUploadPhotoComponent,
    DialogChangePlanComponent,
    DialogCancelPlanComponent,
    DialogPlanMakePrivateComponent,
    DialogDeactivateFamilyMemberComponent,
    DialogReactivateFamilyMemberComponent, 
    DialogRemoveFamilyMemberComponent,
    DialogFamilyMemberAddedComponent,
    DialogEndVisitRequestComponent,

    //provider dialogs
    DialogSecurityQuestionComponent,
    DialogAddPrimaryCareProviderSearchComponent,
    DialogDeletePrimaryCareProviderComponent,
    DialogSecurityQuestionComponent,
    DialogChangeRoleComponent,
    DialogAddPharmacyComponent,
    DialogDeletePharmacyComponent,
    DialogDeleteAllergyComponent,
    DialogDeleteMedicationComponent,
    DialogDeleteSurgeryComponent,
    DialogCompleteVisitComponent,
    DialogPatientRegistrationComponent,
    DialogNoChangeRoleComponent,
    DialogAddendumComponent,
    DialogAddQuickPhraseComponent,
    DialogDeleteQuickPhraseComponent,
    DialogAbsenceNoteComponent,
    DialogNotesDiagnosisComponent,
    DialogDeleteDocumentComponent,
    DialogAddDocumentComponent,
    DialogVideoVisitRequestComponent,
    DialogVideoVisitWaitingComponent,
    DialogVideoVisitDeniedComponent,
    DialogVideoVisitErrorComponent, 
    DialogEndVideoRequestComponent,
    DialogEndVisitComponent,
    DialogConfirmEcounterNotesComponent,
    DialogVoiceVisitRequestComponent,
    DialogVoiceVisitWaitingComponent,
    DialogCloseSessionComponent,
    DialogCodeVerificationSentComponent,

    MainHomeComponent,
    AboutComponent,
    NotFoundComponent,
    
       
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMomentDateModule, 
    DndModule,

    NgFlashMessagesModule.forRoot(),
    MaterialModule,  
    NgxUploaderModule,  
    

    CoreModule
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    PatientsService, ProvidersService, ConsultationsService, SecurityService, UserService, ValidatorsLibrary, VisitService, MessagingService, MedicalIssueService ],
  entryComponents: [ 
    DialogTermsOfUseComponent, DialogSelectRoleComponent, DialogLoginError02Component, 
    DialogFailedLoginComponent, DialogPharmacyComponent, DialogAllergyComponent, DialogMedicationComponent,
    DialogSurgeryComponent, DialogPrimaryCareProviderComponent, DialogCardVerificationErrorComponent,
    DialogCardValidationComponent, DialogPaymentErrorComponent, DialogEmailAttempsComponent, DialogAddFamilyMemberComponent,
    DialogAmountSlotMembersComponent, DialogBillingPoliciesComponent, DialogMyaccountManageSubscriptionComponent, 
    DialogMyaccountMoreInformationComponent, DialogChangePasswordComponent, DialogChangePasswordConfirmationComponent,
    DialogUploadPhotoComponent, DialogChangePlanComponent,DialogCancelPlanComponent, DialogPlanMakePrivateComponent,
    DialogDeactivateFamilyMemberComponent,  DialogReactivateFamilyMemberComponent, DialogRemoveFamilyMemberComponent,
    DialogFamilyMemberAddedComponent,DialogEndVisitRequestComponent,DialogSecurityQuestionComponent,
    DialogAddPrimaryCareProviderSearchComponent, DialogDeletePrimaryCareProviderComponent, DialogAddPharmacyComponent,
    DialogDeletePharmacyComponent, DialogDeleteAllergyComponent,DialogDeleteMedicationComponent, DialogDeleteSurgeryComponent,
    DialogCompleteVisitComponent, DialogChangeRoleComponent, DialogPatientRegistrationComponent,
    DialogNoChangeRoleComponent, DialogAddendumComponent, DialogAddQuickPhraseComponent, DialogDeleteQuickPhraseComponent, 
    DialogAbsenceNoteComponent, DialogNotesDiagnosisComponent,DialogDeleteDocumentComponent, DialogAddDocumentComponent,
    DialogVideoVisitRequestComponent, DialogVideoVisitWaitingComponent,DialogVideoVisitDeniedComponent, 
    DialogVideoVisitErrorComponent, DialogEndVideoRequestComponent, DialogEndVisitComponent,DialogConfirmEcounterNotesComponent,
    DialogVoiceVisitRequestComponent, DialogVoiceVisitWaitingComponent, DialogCloseSessionComponent,
    DialogCodeVerificationSentComponent
    
    
  ],
  bootstrap: [ AppComponent ],
  
})
//---------------------------------------------------------------------------------------
// Class Section
//---------------------------------------------------------------------------------------
export class AppModule { }
