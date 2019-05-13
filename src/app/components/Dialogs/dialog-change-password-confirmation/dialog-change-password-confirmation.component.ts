//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit } 				from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

@Component({
	selector: 'app-dialog-change-password-confirmation',
	templateUrl: './dialog-change-password-confirmation.component.html',
	styleUrls: ['./dialog-change-password-confirmation.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogChangePasswordConfirmationComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef	: MatDialogRef<DialogChangePasswordConfirmationComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogChangePasswordConfirmationComponent>,
	) {
		this.dialogRef = dr;
	}

	ngOnInit() {
	}

	public cmdCloseDialog() {
		this.dialogRef.close();
	}

}
