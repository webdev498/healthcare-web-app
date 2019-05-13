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
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";


@Component({
	selector: 'app-dialog-add-family-member',
	templateUrl: './dialog-add-family-member.component.html',
	styleUrls: ['./dialog-add-family-member.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAddFamilyMemberComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogAddFamilyMemberComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr 	: MatDialogRef<DialogAddFamilyMemberComponent>, 
		rt 	: Router,
	) {
		this.dialogRef = dr;
		this.routerService = rt;
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public closeDialog() {
		this.dialogRef.close();
	}

	public confirmRegistration() {
		let value = true;
		this.dialogRef.close(value);
	}
}
