import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

// Angular Forms
import { FormsModule }                                  from '@angular/forms';
import { ReactiveFormsModule }                          from '@angular/forms';

//Drag and Drop
import { DndModule }                                  from 'ngx-drag-drop';

// Angular Material Date Provider
import { MatMomentDateModule }                          from '@angular/material-moment-adapter';

// Flex Layout
import { FlexLayoutModule }                             from '@angular/flex-layout';

// Angular Material Components
import { MaterialModule }                               from '../../core/material/material.module';

// Application Modules
import { CoreModule }                                   from '../../core/core.module';
import { ProviderModule }                               from '../Provider/provider.module';


import { ProviderChatRoutingModule }    from './provider-chat-routing.module';

import { ProviderChatHomeComponent }    from './provider-chat-home/provider-chat-home.component';
import { ProgressEncounterComponent }   from './progress-encounter/progress-encounter.component';
import { ProviderDocumentLibraryComponent }             from './components/provider-document-library/provider-document-library.component';
import { ProviderQuickPhrasesListComponent }            from './components/provider-quick-phrases-list/provider-quick-phrases-list.component';
import { ProviderChatTabComponent } from './provider-chat-tab/provider-chat-tab.component';
import { ProviderVisitSummaryComponent } from '../Provider-Chat/components/provider-visit-summary/provider-visit-summary.component';
import { ProviderChatPatientComponent } from '../Provider-Chat/components/provider-chat-patient/provider-chat-patient.component';
import { EndVisitAbsenceNoteComponent } from '../Provider-Chat/components/end-visit-absence-note/end-visit-absence-note.component';
import { EndVisitEncounterNoteComponent } from '../Provider-Chat/components/end-visit-encounter-note/end-visit-encounter-note.component';
import { EndVisitDiagnosisComponent } from '../Provider-Chat/components/end-visit-diagnosis/end-visit-diagnosis.component';
import { EndVisitSummaryComponent } from '../Provider-Chat/components/end-visit-summary/end-visit-summary.component';
import { ProviderEndVisitContainerComponent } from '../Provider-Chat/provider-end-visit-container/provider-end-visit-container.component';


@NgModule({
  imports: [
    CommonModule,
    ProviderChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    ProviderModule,
    DndModule
  ],
  declarations: [
    ProviderChatHomeComponent,
    ProgressEncounterComponent,
    ProviderDocumentLibraryComponent,
    ProviderQuickPhrasesListComponent,
    ProviderChatTabComponent,
    ProviderVisitSummaryComponent,
    ProviderChatPatientComponent,
    EndVisitAbsenceNoteComponent,
    EndVisitEncounterNoteComponent,
    EndVisitDiagnosisComponent,
    EndVisitSummaryComponent,
    ProviderEndVisitContainerComponent,
  ]
})
export class ProviderChatModule { }
