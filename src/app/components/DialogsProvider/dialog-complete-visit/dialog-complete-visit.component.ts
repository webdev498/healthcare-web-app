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
  selector: 'app-dialog-complete-visit',
  templateUrl: './dialog-complete-visit.component.html',
  styleUrls: ['./dialog-complete-visit.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogCompleteVisitComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogCompleteVisitComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogCompleteVisitComponent>,
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
