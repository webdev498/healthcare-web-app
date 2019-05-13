//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit, Input } from '@angular/core';
//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 			    		from '@angular/forms';
import { FormGroup } 			    			from '@angular/forms';
import { Validators } 			    		from '@angular/forms';

import { MatSnackBar } 						  from "@angular/material/snack-bar";

import { VisitService }             from '../../../../services/visit.service';
import { IVisit }                   from '../../../../models/interfaces/visits/visit.interface';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';
import { GenericRecord } from '../../../../models/interfaces/visits/generic-record.interface';
import { MedicalIssueService } from '../../../../services/medical-issue.service';
import { ProvidersService } from '../../../../services/providers.service';
import { IEncounterNoteDTO } from '../../../../models/interfaces/visits/encounterNoteDTO';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-visit-summary-incomplete',
  templateUrl: './visit-summary-incomplete.component.html',
  styleUrls: ['./visit-summary-incomplete.component.css']
})
export class VisitSummaryIncompleteComponent implements OnInit {
  @Input('visitId') visitId : number;
  visit                     : PatientVisitDTO;
  public form	              : FormGroup;
  isLoad                    : boolean = false;
  issues                    : GenericRecord[];
  selectedValueP            : number;
  selectedValueS            : number;

  constructor(
    private vs              : VisitService,
    private fb              : FormBuilder,
    private medicalservice  : MedicalIssueService,
    private ps              : ProvidersService,
    private snackBarService :MatSnackBar
  ) {
    
   }

  ngOnInit() {        
    this.GetMedicalIssues();
  }
  //---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this.form = this.fb.group({
			'pDiagnosis'			  : [this.selectedValueP, Validators.compose([Validators.required])],
			'sDiagnosis'		    : [this.selectedValueS, Validators.compose([Validators.required])],
			'notes'		          : [this.visit.EncounterNotes, Validators.compose([Validators.required])],			

		});
  }
  GetMedicalIssues()
  {
    this.ps.GetCodes().subscribe(resp =>{
      this.issues = resp;      
      this.GetSummary();      
    })
  }
  GetSummary()
  {
      this.vs.Visit(this.visitId).subscribe(resp =>{
        console.log(resp);
        
          this.visit = resp;          
          console.log(resp.PrimaryDiagnosis);
         
          
          let primary = this.issues.find(x=> x.Value == resp.PrimaryDiagnosis);
          let second  = this.issues.find(x=>x.Value == resp.SecondaryDiagnosis);
          console.log(primary);
          
          if(primary != undefined)
          {
            this.selectedValueP  = primary.ID;
          }
          if(second != undefined)
          {
            this.selectedValueS  = second.ID;
          }         
          this.createForm();
          this.isLoad = true;        
                    
      });
  }
  save()
  {
    this.visit.PrimaryDiagnosis   = this.form.value.pDiagnosis;
    this.visit.SecondaryDiagnosis = this.form.value.sDiagnosis;
    this.visit.EncounterNotes     = this.form.value.notes;
    this.vs.AddDiagnosis(this.visitId,this.form.value.pDiagnosis,this.form.value.sDiagnosis)
    .subscribe(resp =>{
      console.log(resp);
      let encounterNote: IEncounterNoteDTO = {
        VisitID : this.visitId,
        Note    : this.form.value.notes
      }
      this.vs.AddEncounterNote(encounterNote).subscribe(respE =>{
        console.log(respE);
        this.snackBarService.dismiss();
		    this.snackBarService.open( respE.Message, undefined, {duration: 2000} );        
      });
    })
  }

}
