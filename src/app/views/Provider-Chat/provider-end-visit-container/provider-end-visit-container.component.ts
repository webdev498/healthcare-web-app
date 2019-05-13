import { Component, OnInit, Input, Output, EventEmitter }     from '@angular/core';
import { Router }                       from '@angular/router';
import { ProvidersService }             from '../../../services/providers.service';
import { Patient }                      from '../../../models/patient.model';

// Dialogs
import { MatDialog }                    from '@angular/material';
import { DialogConfirmEcounterNotesComponent } from '../../../components/DialogsProvider/dialog-confirm-ecounter-notes/dialog-confirm-ecounter-notes.component';
import { DialogCompleteVisitComponent } from '../../../components/DialogsProvider/dialog-complete-visit/dialog-complete-visit.component';
import { IPatientWaitInfoDTO } from '../../../models/interfaces/visits/patientWaitInfoDTO.interface';
import { PatientVisitDTO } from '../../../models/interfaces/visits/patient-visitDTO.interface';
import { MedicalIssueService } from '../../../services/medical-issue.service';
import { GenericRecord } from '../../../models/interfaces/visits/generic-record.interface';
import { VisitService } from '../../../services/visit.service';
import { AbsenceNoteDTO } from '../../../models/interfaces/visits/absence-noteDTO.interface';
import { IEncounterNoteDTO } from '../../../models/interfaces/visits/encounterNoteDTO';
import { ICompleteVisitDTO } from '../../../models/interfaces/visits/completeVisitDTO';
import { IVisitQuestionnaireDTO } from '../../../models/interfaces/visits/visitQuestionnaireDTO';


@Component({
  selector: 'app-provider-end-visit-container',
  templateUrl: './provider-end-visit-container.component.html',
  styleUrls: ['./provider-end-visit-container.component.css']
})
export class ProviderEndVisitContainerComponent implements OnInit {
  @Input('patient') patient:PatientVisitDTO; // detalle de la visita
  //@Input('tabIndex') tabIndex: number;
  @Output() closeTab = new EventEmitter<any>();
  @Output() changeVisitId = new EventEmitter<any>();

  absencenote: boolean = true;
  enconter   : boolean = false;
  diagnosis  : boolean = false;
  summary    : boolean = false;
  survey     : boolean = false;

  

  encouterValue       : string  = "";  
  issues              : GenericRecord[];
  selectedValueP      : number;
  selectedValueS      : number;
  selectedSumary      : number;
  absenceNoteSummary  : AbsenceNoteDTO[] = [];

  // Questionary
  qEncounterType          : string  = "";
  qMedicationPrescribed   : string;
  qLab                    : boolean = false;
  qRadiology              : boolean = false;
  qSpecialistName         : string  = "";
  qFollowPCP              : boolean = false;
  qTelemedFollowUp        : boolean = false;
  qSentToER               : boolean = false;
  qDate                   : any;

  noDate                  : boolean = false;

  constructor(
    private route           : Router,
    private provider        : ProvidersService,
    public dialog           : MatDialog,
    private medicalservice  : MedicalIssueService,
    private vs              : VisitService
  ) { }

  ngOnInit() {
   // this.route.navigate(['/home/provider-chat/end-visit-container/'])
   this.encouterValue   = this.patient.EncounterNotes;   
   
   this.GetMedicalIssues();  
   
  }
  GetMedicalIssues()
  {
    this.provider.GetCodes().subscribe(resp =>{
      this.issues = resp;  
      let primary = this.issues.find(x=> x.Value == this.patient.PrimaryDiagnosis);
          let second  = this.issues.find(x=>x.Value == this.patient.SecondaryDiagnosis);
          if(primary != undefined)
          {
            this.selectedValueP  = primary.ID;
          }
          if(second != undefined)
          {
            this.selectedValueS  = second.ID;
          }    
           
    })
    
  }
  nextToEncounter()
  {
    this.absencenote  = false;
    this.enconter     = true;
  }
  backToAbsence()
  {
    this.absencenote  = true;
    this.enconter     = false;
  }
  nextToDiagnosis()
  {
    this.diagnosis    = true;
    this.absencenote  = false;
    this.enconter     = false;
    this.summary      = false; 
    
    let encounterNotes: IEncounterNoteDTO = {
      VisitID : this.patient.VisitID,
      Note    : this.encouterValue
    }
    this.vs.AddEncounterNote(encounterNotes).subscribe(resp => {
        console.log('Add Encounter Notes ', resp);        
    });     
   
  }
  backToEncounter()
  {
    this.diagnosis    = false;
    this.absencenote  = false;
    this.enconter     = true;
    this.summary      = false;
  }
  nextToSummary()
  {
    this.summary        = true;
    this.diagnosis      = false;
    this.absencenote    = false;
    this.enconter       = false; 
    this.selectedSumary = this.selectedValueP;   
    this.GetListAbsenNotes();
    console.log(this.selectedValueP);
    console.log(this.selectedValueS);
    this.vs.AddDiagnosis(this.patient.VisitID,+this.selectedValueP,+this.selectedValueS)
    .subscribe(resp =>{
      console.log('Add Diagnosis:' , resp);
      
    });
  
  }
  GetListAbsenNotes()
	{
			this.vs.getVisitAbsenceNotes(this.patient.VisitID).subscribe(resp =>{
        this.absenceNoteSummary = resp;				
			});
	}
  Confirm()
  {
    let dialogRef = this.dialog.open(DialogConfirmEcounterNotesComponent, {
      data:{Name:this.patient.PatientFirstName},
      width:'700px'                                
    });
    dialogRef.afterClosed().subscribe(result => {
      this.survey         = true;   
      this.summary        = false;
      this.diagnosis      = false;
      this.absencenote    = false;
      this.enconter       = false;
      
      let completeVisit: ICompleteVisitDTO = {
        VisitID      : this.patient.VisitID,
        Note         : this.encouterValue,
        Diagnosis1ID : +this.selectedValueP,
        Diagnosis2ID : +this.selectedValueS,
      }
      this.vs.CompleteVisit(completeVisit).subscribe(resp =>{
        console.log('complete Visit:' , resp);        
      })
      
    });
  }
  CheckDate()
  {      
    
    if(this.qDate != "" || this.qDate != null)
    {
      this.noDate = true;
    }
    else
    {
      this.noDate = false;
    }
  }
  CompleteVisit()
  {  
    if(this.qDate == "" || this.qDate == null)
    {
      alert('please select a date.')
        return;
    }
    let questionary : IVisitQuestionnaireDTO = {
      VisitID               : this.patient.VisitID,
      EncounterType         : this.qEncounterType,
      MedicationPrescribed  : this.qMedicationPrescribed == '1' ? true: false,
      LabOrdered            : this.qLab,
      RadiologyOrdered      : this.qRadiology,
      PCPFollowUp           : this.qFollowPCP,
      SpecialistFollowUP    : this.qFollowPCP,
      SpecialistName        : this.qSpecialistName,
      SentToER              : this.qSentToER,
      TelemedFollowUp       : this.qTelemedFollowUp,
      TelemedFollowUpDate   : this.getDateString(this.qDate)
    }
    
    this.vs.AddQuestionnaire(questionary).subscribe(resp =>{
      console.log(resp);
      if(resp.Message == "Success")
      {
        this.closeTab.emit(true);  
        this.changeVisitId.emit(this.patient.VisitID);

        let dialogRef = this.dialog.open(DialogCompleteVisitComponent, {
          data:{Name:this.patient.PatientFirstName},
          width:'700px'                               
        });
      }
      else{
        alert('there was an error ending the visit')
        return;
      }
      
    })   

   
  }
  getDateString(date : any) : string
  {
      let year  = date.getFullYear(); //this will give you full year eg : 1990
      let day   = date.getDate(); //gives you the date from 1 to 31
      let month = date.getMonth() + 1;
      return month.toString() + "/" + day.toString() + "/" + year.toString();
  }

}
