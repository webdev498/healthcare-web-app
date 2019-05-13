//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit } 				from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 				from '@angular/router';
import { ActivatedRoute } 		from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialog } 			from '@angular/material';
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";


@Component({
	selector: 'app-dialog-end-visit-request',
	templateUrl: './dialog-end-visit-request.component.html',
	styleUrls: ['./dialog-end-visit-request.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogEndVisitRequestComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogEndVisitRequestComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogEndVisitRequestComponent>,
		rt: Router,
		public dialog: MatDialog,
	) {
		this.dialogRef = dr;
		this.routerService = rt;
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------

	public endSession_click() {
		this.dialogRef.close(true);
	}

	public closeDialog_click() {
		this.dialogRef.close();
	}
}
