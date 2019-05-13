//---------------------------
// Libraries
//---------------------------
import { Component, Inject } 		from '@angular/core';
import { OnInit } 					from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 					from '@angular/router';
import { ActivatedRoute } 			from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA } 			from "@angular/material";
import { MatDialogRef } 			from "@angular/material";
import { PatientsService } 			from '../../../services/patients.service';

@Component({
	selector: 'app-dialog-remove-family-member',
	templateUrl: './dialog-remove-family-member.component.html',
	styleUrls: ['./dialog-remove-family-member.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogRemoveFamilyMemberComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public email 	: string = "";
	public newEmail : string = "";
	public isPrivate: string = "";
	public isLoaded	: boolean = false;


	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogRemoveFamilyMemberComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogRemoveFamilyMemberComponent>,
		rt: Router,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private ps : PatientsService
	) {
		this.dialogRef = dr;
		this.routerService = rt;
	}

	ngOnInit() {
		this.isPrivate = this.data.isPrivate;
		this.email = this.data.mail;

		if(this.isPrivate == "true"){
			this.ps.RemovePrivateFamilyMemberInfo(this.data.patientId).subscribe(resp => {
				console.log(resp);
				
				this.email = resp.Payload;
				this.isLoaded = true;
			})
		}else{
			this.isLoaded = true;
		}
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public onSubmit() {
		let data = {
			mail : this.email,
			newEmail : this.newEmail
		}
		console.log(this.email);
		
		this.dialogRef.close(data);

	}
	public closeDialog()
  	{      
      	this.dialogRef.close();
  	}

}
