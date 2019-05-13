import { Component, OnInit, Input, Output, EventEmitter }         from '@angular/core';
import { Patient }                          from '../../../models/patient.model';

// Dialogs
import { MatDialog }                        from '@angular/material';
import { DialogVideoVisitRequestComponent } from '../../../components/DialogsProvider/dialog-video-visit-request/dialog-video-visit-request.component';
import { DialogVideoVisitWaitingComponent } from '../../../components/DialogsProvider/dialog-video-visit-waiting/dialog-video-visit-waiting.component';
import { getVisits }                        from '../../../services/mockups/visits.mockup';
import { ProvidersService }                 from '../../../services/providers.service';
import { Router }                           from '@angular/router';
import { DialogEndVisitComponent } from '../../../components/DialogsProvider/dialog-end-visit/dialog-end-visit.component';
import { DialogVoiceVisitRequestComponent } from '../../../components/DialogsProvider/dialog-voice-visit-request/dialog-voice-visit-request.component';
import { DialogVoiceVisitWaitingComponent } from '../../../components/DialogsProvider/dialog-voice-visit-waiting/dialog-voice-visit-waiting.component';
import { IPatientWaitInfoDTO } from '../../../models/interfaces/visits/patientWaitInfoDTO.interface';
import { VisitService } from '../../../services/visit.service';
import { IVisits } from '../../../models/interfaces/visits.interface';
import { PatientVisitDTO } from '../../../models/interfaces/visits/patient-visitDTO.interface';
import { SecurityService } from '../../../services/security.service';
import { PatientsService } from '../../../services/patients.service';
import { IMedicalHistory } from '../../../models/interfaces/patient/medicalhistory.interface';
import { IProfile } from '../../../models/interfaces/patient/profile.interface';
import { PatientVisitSummaryDTO } from '../../../models/interfaces/patient/patient-visit-summaryDTO.interface';
import { GenericRecord } from '../../../models/interfaces/visits/generic-record.interface';
import { MedicalIssueService } from '../../../services/medical-issue.service';



@Component({
  selector: 'app-progress-encounter',
  templateUrl: './progress-encounter.component.html',
  styleUrls: ['./progress-encounter.component.css']
})
export class ProgressEncounterComponent implements OnInit {
  @Input('patient') patient: PatientVisitDTO;
 // @Input('tabIndex') tabIndex: number;
 @Output() closeTab = new EventEmitter<any>();
 @Output() changeVisitId = new EventEmitter<any>();

  //datos falsos para pasar
  datevisit                   : Date;
  summary                     : string;
  endvisit                    : boolean = false;
  absencenote                 : boolean = false;
  visit                       : PatientVisitDTO;
  isLoad                      : boolean = false;
  medicalH                    : IMedicalHistory;
  patientProfile              : IProfile;
  patientVisits               : PatientVisitSummaryDTO[];
  medicalIssueList            : GenericRecord[] = [];
  indivudalMedicalIssue       : GenericRecord;

  isDisabledMH                : boolean = true;

  constructor(
    public dialog: MatDialog,
    private providerService: ProvidersService,
    private route: Router,
    private vs   : VisitService,
    private ss   : SecurityService,
    private ps   : PatientsService,
    private ms   : MedicalIssueService    
  ) { }

  ngOnInit() {
   
    this.ProviderStartVisit();

    // here I going to put in the local storage the current VisitID
    localStorage.setItem('VisitID',this.patient.VisitID.toString());

    let visits = getVisits();      
    

      	visits.forEach(function (value) {
        	if(value.PatientName == this.patient.FirstName ){
             // this.visit = value;              
              this.providerService.setSummaryVisits(value)
        	}
		}, this);
  }
  CloseTab(event: any)
  {
    this.closeTab.emit(true);    
  }
  ChangeVisitId(ev:any)
  {
    this.changeVisitId.emit(ev)
    console.log(ev);
    
  }
  Endvisit(event: boolean)
  {
    this.endvisit = event;
  }
  GetVisitDetails()
  {
    this.vs.Visit(this.patient.VisitID).subscribe(resp =>{      
      this.visit = resp;     
             
    })
  }
  ProviderStartVisit()
  {
    this.ss.GetUserInfo('false').subscribe(respU =>{
      console.log(respU);
      console.log(this.patient.VisitID);
      this.vs.ProviderStartVisit(this.patient.VisitID, respU.ProviderID)
      .subscribe(resp => {
        console.log(resp);
        this.ps.GetMedicalHistory(resp.PatientID.toString())
        .subscribe(respMh =>{
          this.medicalH = respMh;
          respMh.MedicalIssues.forEach(element => {
            this.ms.GetMedicalIssue(element).subscribe(respM =>{
              this.indivudalMedicalIssue = respM;
              this.medicalIssueList.push(this.indivudalMedicalIssue);
            });
          });
          if(this.medicalIssueList.length > 0)
          {
            this.isDisabledMH = true;
          }   
          console.log(this.medicalIssueList);
                  
          this.ps.GetProfile(resp.PatientID.toString()).subscribe(respP =>{
            this.patientProfile = respP;
            console.log(respP);
            
            this.vs.PatientVisits(resp.PatientID).subscribe(respV =>{
              this.patientVisits = respV;
              this.isLoad = true;
            });
            
          })       
        });        
      });
    });
  }  

}
