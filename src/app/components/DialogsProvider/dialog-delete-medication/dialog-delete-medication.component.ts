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
  selector: 'app-dialog-delete-medication',
  templateUrl: './dialog-delete-medication.component.html',
  styleUrls: ['./dialog-delete-medication.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogDeleteMedicationComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogDeleteMedicationComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogDeleteMedicationComponent>,
	) {
		this.dialogRef = dr;
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
	public confirm() {
		this.dialogRef.close(true);
	}

	public cancel() {
		this.dialogRef.close();
	}
}
