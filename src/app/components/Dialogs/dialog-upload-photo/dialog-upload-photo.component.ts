//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 				from '@angular/core';
import { OnInit, Inject }			from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialogRef } 			from "@angular/material";
import { MAT_DIALOG_DATA } 			from "@angular/material";

//---------------------------
// Services
//---------------------------
import { API_URL } 					from '../../../core/config/config';
import { SecurityService } 			from '../../../services/security.service';
import { PatientsService } 			from '../../../services/patients.service';
import { ProvidersService } from '../../../services/providers.service';


@Component({
	selector: 'app-dialog-upload-photo',
	templateUrl: './dialog-upload-photo.component.html',
	styleUrls: ['./dialog-upload-photo.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogUploadPhotoComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public url 				: string;
	public error 			: boolean   = false ;
	public afuConfig		: any;
	public resetVar			: boolean 	= false;

	

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef		: MatDialogRef<DialogUploadPhotoComponent>;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		dr									: MatDialogRef<DialogUploadPhotoComponent>,
		private ps 							: PatientsService,
		private provs						: ProvidersService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.dialogRef 		= dr;
	}

	ngOnInit() {
		if(this.data.patientID != undefined)
		{
			this.url = API_URL + 'Patient/UpdatePhoto?patientID='+this.data.patientID;
		}
		else
		{
			this.url = API_URL + 'Provider/UpdatePhoto?providerID='+this.data.providerID;
		}
		
		console.log(this.url);
	}

	uploadFile(event) {
		let files = event.target.files;
		if (files.length > 0) {
			if(this.data.patientID != undefined)
			{
				this.ps.UpdatePhoto(this.data.patientID, files[0]).subscribe(resp => {
					console.log(resp);
					if(resp.Message.includes("Success")){
					  this.dialogRef.close(resp.Payload);
					}else{
						this.error = true;
					}
				});
			}
			else
			{
				this.provs.UpdatePhoto(this.data.providerID,files[0])
				.subscribe(resp =>{
					console.log(resp);
					if(resp.Message.includes("Success")){
						this.dialogRef.close(resp.Payload);
					  }
					
				})
			}
		  
		}
	}


	
	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public closeDialog() {
		this.dialogRef.close();
	}
}
