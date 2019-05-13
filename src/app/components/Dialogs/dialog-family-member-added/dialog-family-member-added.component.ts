//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, Inject } 	from '@angular/core';
import { OnInit } 				from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 				from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

@Component({
	selector: 'app-dialog-family-member-added',
	templateUrl: './dialog-family-member-added.component.html',
	styleUrls: ['./dialog-family-member-added.component.css']
})

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class DialogFamilyMemberAddedComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public anotherMember: boolean = false;
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogFamilyMemberAddedComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		dr	: MatDialogRef<DialogFamilyMemberAddedComponent>, 
		rt	: Router,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.dialogRef = dr;
		this.routerService = rt;
	}

	ngOnInit() {
		console.log(this.data);
		
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public closeDialog() {
		this.dialogRef.close();
	}

	public confirmRegistration() {
		let value = true;
		let content = {
			value: value,
			anotherMember: this.anotherMember
		}
		this.dialogRef.close(content);
	}

	public changeAnotherMember(ev) {
		this.anotherMember = ev['checked'];
	}
}
