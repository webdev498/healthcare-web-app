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
  selector: 'app-dialog-delete-document',
  templateUrl: './dialog-delete-document.component.html',
  styleUrls: ['./dialog-delete-document.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogDeleteDocumentComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogDeleteDocumentComponent>;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogDeleteDocumentComponent>,
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
