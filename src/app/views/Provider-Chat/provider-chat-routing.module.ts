import { NgModule }                                 from '@angular/core';
import { Routes, RouterModule }                     from '@angular/router';

import { ProviderChatHomeComponent }                from './provider-chat-home/provider-chat-home.component';
import { ProgressEncounterComponent }               from './progress-encounter/progress-encounter.component';
import { ProviderQuickPhrasesListComponent }        from './components/provider-quick-phrases-list/provider-quick-phrases-list.component';
'./components/provider-quick-phrases-list/provider-quick-phrases-list.component';
import { ProviderChatTabComponent } from './provider-chat-tab/provider-chat-tab.component';

import { EndVisitAbsenceNoteComponent } from '../Provider-Chat/components/end-visit-absence-note/end-visit-absence-note.component';
import { EndVisitEncounterNoteComponent } from '../Provider-Chat/components/end-visit-encounter-note/end-visit-encounter-note.component';
import { EndVisitDiagnosisComponent } from '../Provider-Chat/components/end-visit-diagnosis/end-visit-diagnosis.component';
import { EndVisitSummaryComponent } from '../Provider-Chat/components/end-visit-summary/end-visit-summary.component';
import { ProviderEndVisitContainerComponent } from '../Provider-Chat/provider-end-visit-container/provider-end-visit-container.component';


const routes: Routes = [{
  path: '', component: ProviderChatHomeComponent,
  children:[    
    { path: 'progress-encounter',       component: ProgressEncounterComponent },
    { path: 'end-visit-container',      component: ProviderEndVisitContainerComponent,
      children:[
        { path: '',   redirectTo:'end-visit-absence-note', pathMatch: 'full' },
        { path: 'end-visit-absence-note', component: EndVisitAbsenceNoteComponent },
        { path: 'end-visit-encounter-note', component: EndVisitEncounterNoteComponent},
        { path: 'end-visit-diagnosis', component: EndVisitDiagnosisComponent},
        { path: 'end-visit-summary', component: EndVisitSummaryComponent}
      ]
    },
    { path: 'provider-chat-tab/:id',    component: ProviderChatTabComponent },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ProviderChatRoutingModule { }
