//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 					from '@angular/core';
import { OnInit } 						from '@angular/core';

import { MatDialog } 					from '@angular/material';
import { DialogCompleteVisitComponent }	from '../../../components/DialogsProvider/dialog-complete-visit/dialog-complete-visit.component'

//---------------------------
// Router
//---------------------------

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 					from '@angular/forms';
import { FormGroup } 					from '@angular/forms';
import { Validators } 					from '@angular/forms';
import { ValidatorsLibrary } 			from '../../../core/services/validators.service';

//---------------------------
// Router
//---------------------------
import { Router } 						from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }				from '../../../services/security.service';
import { GlobalsService } 				from '../../../core/services/globals.service';
import { User } 						from '../../../models/user.model';



@Component({
  selector: 'app-provider-incomplete-visits-questionaire',
  templateUrl: './provider-incomplete-visits-questionaire.component.html',
  styleUrls: ['./provider-incomplete-visits-questionaire.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderIncompleteVisitsQuestionaireComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _questionnaireForm		: FormGroup;
	
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService	: Router;
	private securityService	: SecurityService;
	private globalsService	: GlobalsService;
	private fb		  		: FormBuilder;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		fb: FormBuilder,
		rt: Router,
		ss: SecurityService,
		public dialog: MatDialog
	) {
		// Services
		this.securityService 	= ss;
		this.routerService 		= rt;
		this.globalsService 	= GlobalsService.getInstance();
		this.fb					= fb;

		// Form Configuration
		this.createForm();
	}

	//---------------------------------------------------------------------------
	// LifeCycle Handlers
	//---------------------------------------------------------------------------
	ngOnInit() {
		
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	public createForm() {
		this._questionnaireForm = this.fb.group({

			'encounter': ['', Validators.compose([
				Validators.required,
			])
			],

			'rx': ['', Validators.compose([
				Validators.required,
			])
			],
			
			'lab': ['', Validators.compose([
			])
			],
			
			'radiology': ['', Validators.compose([
			])
			],
			
			'followPCP': ['', Validators.compose([
			])
			],
			
			'followSpecialist': [{value: '',disabled : true}, Validators.compose([
			])
			],
			
			'goER': ['', Validators.compose([
			])
			],
			
			'goAfterHoursUrgentCare': ['', Validators.compose([
			])
			],
			
			'followTelemedicine': [{value: '',disabled : true}, Validators.compose([
			])
			],
			
		});
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------
	public cmdCompleteVisit_click() {
		let dialogRef = this.dialog.open(DialogCompleteVisitComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	public enableFieldSpecialty(event : any)
	{
		if(event.checked){
			this._questionnaireForm.controls['followSpecialist'].enable();
		}else{
			this._questionnaireForm.controls['followSpecialist'].disable();
		}
	}
	
	public enableFieldFollowUpTelemedicine(event : any)
	{
		if(event.checked){
			this._questionnaireForm.controls['followTelemedicine'].enable();
		}else{
			this._questionnaireForm.controls['followTelemedicine'].disable();
			this._questionnaireForm.controls['followTelemedicine'].setValue("");
		}
	}

}
