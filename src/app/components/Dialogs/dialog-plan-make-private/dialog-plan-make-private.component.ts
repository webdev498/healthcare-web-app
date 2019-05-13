//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit, Inject } 		from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 				from '@angular/router';
import { ActivatedRoute }		from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialog }			from '@angular/material';
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

//---------------------------
// Services
//---------------------------
import { PatientsService } 		from '../../../services/patients.service';


//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 			from '@angular/forms';
import { FormGroup } 			from '@angular/forms';
import { Validators } 			from '@angular/forms';


@Component({
	selector: 'app-dialog-plan-make-private',
	templateUrl: './dialog-plan-make-private.component.html',
	styleUrls: ['./dialog-plan-make-private.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogPlanMakePrivateComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _formMakePrivate		: FormGroup;
	public error				: string;
	public showError			: boolean;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef			: MatDialogRef<DialogPlanMakePrivateComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr				: MatDialogRef<DialogPlanMakePrivateComponent>,
		private rt		: Router,
		private ps		: PatientsService,
		private fb		: FormBuilder,
		public dialog	: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.dialogRef = dr;

		this.createForm();
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._formMakePrivate = this.fb.group({
			'email': [null,
				Validators.compose([
					Validators.required,
					Validators.email,
				])
			],
		});
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public cmdConfirmEmail_click() {
		let email = this._formMakePrivate.value.email;

		this.ps.MakeFamilyMemberPrivate(this.data.familyMemberPatientID.toString(), email, "").subscribe(resp => {
			console.log(resp);
			
			if(resp.Message == "Success"){
				this.dialogRef.close(true);
			}else{
				this.error = resp.Message;
				this.showError = true;
			}
		})
	}
	
	public closeDialog() {
        this.dialogRef.close();
    }
}
