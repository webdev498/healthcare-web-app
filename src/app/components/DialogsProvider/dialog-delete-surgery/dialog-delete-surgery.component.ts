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
  selector: 'app-dialog-delete-surgery',
  templateUrl: './dialog-delete-surgery.component.html',
  styleUrls: ['./dialog-delete-surgery.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogDeleteSurgeryComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogDeleteSurgeryComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogDeleteSurgeryComponent>,
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
