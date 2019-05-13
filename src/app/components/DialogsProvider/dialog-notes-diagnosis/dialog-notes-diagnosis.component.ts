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
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

@Component({
  selector: 'app-dialog-notes-diagnosis',
  templateUrl: './dialog-notes-diagnosis.component.html',
  styleUrls: ['./dialog-notes-diagnosis.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogNotesDiagnosisComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogNotesDiagnosisComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogNotesDiagnosisComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.dialogRef = dr;
	}

	ngOnInit() {

	}

	//---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------

	public cancel() {
		this.dialogRef.close();
	}
}
