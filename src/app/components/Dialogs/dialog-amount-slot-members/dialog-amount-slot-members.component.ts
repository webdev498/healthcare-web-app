//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit, Inject } 		from '@angular/core';

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

//---------------------------
// Services
//---------------------------
import { PatientsService } 		from '../../../services/patients.service';

//---------------------------
// Interfaces
//---------------------------
import { AccountAddFamilyMemberInfoDTO } from '../../../models/interfaces/patient/AccountAddFamilyMemberInfoDTO.interface';


@Component({
	selector: 'app-dialog-amount-slot-members',
	templateUrl: './dialog-amount-slot-members.component.html',
	styleUrls: ['./dialog-amount-slot-members.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAmountSlotMembersComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	public infoAddMember	: AccountAddFamilyMemberInfoDTO;
	public isLoaded			: boolean = false;
	
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogAmountSlotMembersComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogAmountSlotMembersComponent>, rt: Router,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private ps : PatientsService
	) {
		this.dialogRef = dr;
		this.routerService = rt;
	}

	//---------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //---------------------------------------------------------------------------
	ngOnInit() {
		this.ps.GetAddFamilyMemberInfo().subscribe(resp => {
			this.infoAddMember = resp;
			console.log(resp);
			this.isLoaded = true;
		})
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public closeDialog() {
		this.dialogRef.close();
	}

	public confirm() {
		this.dialogRef.close(true);
	}
}
