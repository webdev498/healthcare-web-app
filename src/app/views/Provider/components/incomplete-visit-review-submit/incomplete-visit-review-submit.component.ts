//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit, Input }           	from '@angular/core';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 			    			from '@angular/forms';
import { FormGroup } 			    			from '@angular/forms';
import { Validators } 			    			from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }            from '@angular/router';
//---------------------------
// Dialog
//---------------------------
import { MatDialog }                          	from '@angular/material';
import { DialogNotesDiagnosisComponent  }		from '../../../../components/DialogsProvider/dialog-notes-diagnosis/dialog-notes-diagnosis.component';


//---------------------------
// Models
//---------------------------

import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';
import { GenericRecord } from '../../../../models/interfaces/visits/generic-record.interface';
import { MedicalIssueService } from '../../../../services/medical-issue.service';
import { ProvidersService } from '../../../../services/providers.service';
import { VisitService } from '../../../../services/visit.service';
import { IEncounterNoteDTO } from '../../../../models/interfaces/visits/encounterNoteDTO';
import { ICompleteVisitDTO } from '../../../../models/interfaces/visits/completeVisitDTO';





//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-incomplete-visit-review-submit',
  templateUrl: './incomplete-visit-review-submit.component.html',
  styleUrls: ['./incomplete-visit-review-submit.component.scss']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class IncompleteVisitReviewSubmitComponent implements OnInit {
	//---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	@Input() visit			  : PatientVisitDTO;
	issues                    : GenericRecord[];
  	selectedValueP            : number;
	selectedValueS            : number;
	public form	              : FormGroup;
	isLoad                    : boolean = false;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		public dialog			: MatDialog,
		private medicalservice  : MedicalIssueService,
		private ps 				: ProvidersService,
		private fb              : FormBuilder,
		private vs              : VisitService,
		private routerService   : Router
	)
	{

	}

	//---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
	ngOnInit() {
		
		this.GetMedicalIssues();
			
	}
	createForm() {
		console.log(this.selectedValueP);
		
		this.form = this.fb.group({
			'pDiagnosis'	: [this.selectedValueP, Validators.compose([Validators.required])],
			'sDiagnosis'	: [this.selectedValueS, Validators.compose([Validators.required])],
			'notes'		    : [this.visit.EncounterNotes, Validators.compose([Validators.required])],	

		});
  }
	GetMedicalIssues()
  	{
		this.ps.GetCodes().subscribe(resp =>{
		this.issues = resp;	
		let primary = this.issues.find(x=> x.Value == this.visit.PrimaryDiagnosis);
		let second  = this.issues.find(x=>x.Value == this.visit.SecondaryDiagnosis);
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
		})
		
  	}

	//---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	public submitInfo()
	{
		let dialogRef = this.dialog.open(DialogNotesDiagnosisComponent, {
			data: {
				'name' : this.visit.PatientFirstName
			}                            
		});
		
		dialogRef.afterClosed().subscribe((result) => {				 
			this.vs.AddDiagnosis(this.visit.VisitID,this.form.value.pDiagnosis,this.form.value.sDiagnosis)
			.subscribe(resp =>{
				console.log(resp);
				let encounterNote: IEncounterNoteDTO = {
					VisitID : this.visit.VisitID,
					Note    : this.form.value.notes
				}
				this.vs.AddEncounterNote(encounterNote).subscribe(respE =>{
					console.log(respE);        
				});
			});	
			let completeVisit: ICompleteVisitDTO = {
				VisitID      : this.visit.VisitID,
				Note         : this.form.value.notes,
				Diagnosis1ID : +this.form.value.pDiagnosis,
				Diagnosis2ID : +this.form.value.sDiagnosis,
			  }
			  this.vs.CompleteVisit(completeVisit).subscribe(resp =>{
				console.log('complete Visit:' , resp);  
				this.routerService.navigate(['home/provider-home/my-incomplete-visits']);      
			  })	
		}); 
	}

}
