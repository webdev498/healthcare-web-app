//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit, Inject } 		from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

@Component({
	selector: 'app-dialog-terms-of-use',
	templateUrl: './dialog-terms-of-use.component.html',
	styleUrls: ['./dialog-terms-of-use.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogTermsOfUseComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogTermsOfUseComponent>;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(dr: MatDialogRef<DialogTermsOfUseComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
		this.dialogRef = dr;
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public closeDialog() {
		this.dialogRef.close();
	}

}
