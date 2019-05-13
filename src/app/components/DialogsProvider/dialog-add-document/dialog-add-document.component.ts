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
import { ActivatedRoute } 		from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialog } 			from '@angular/material';
import { MAT_DIALOG_DATA } 		from "@angular/material";
import { MatDialogRef } 		from "@angular/material";

//---------------------------
// Services
//---------------------------
import { UserService } 			from '../../../services/user.service';


//---------------------------
// Configurations
//---------------------------
import { API_URL } 				from '../../../core/config/config';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-dialog-add-document',
  templateUrl: './dialog-add-document.component.html',
  styleUrls: ['./dialog-add-document.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAddDocumentComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public url 				: string;
	public afuConfig		: any;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef		: MatDialogRef<DialogAddDocumentComponent>;
	private routerService	: Router;
	private userService		: UserService;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		dr: MatDialogRef<DialogAddDocumentComponent>,
		rt: Router,
		us: UserService,
		private ps: ProvidersService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.dialogRef 		= dr;
		this.routerService 	= rt;
		this.userService 	= us;

	}

	ngOnInit() {
		this.url = "assets/images" ;//API_URL+'uploadFile';

		let token = localStorage.getItem("access_token");

		this.afuConfig = {
			multiple: false,
			formatsAllowed: ".jpg,.png",
			maxSize: "1",
			uploadAPI:  {
			  	url		:	this.url,
			  	headers	: {
			 		"Content-Type" : "text/plain;charset=UTF-8",
			 		"Authorization" : `Bearer ${token}`
				}
			},
			theme: "dragNDrop",
			hideProgressBar: true,
			hideResetBtn: true,
			hideSelectBtn: true
		};
	}

	
	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------

	uploadFile(event) {
		let files = event.target.files;
		if (files.length > 0) {
			if(this.data.providerId != undefined)
			{
				this.ps.AddProviderDocument(this.data.providerId, files[0]).subscribe(resp => {
					console.log(resp);	
				});
			}			
		  
		}
	}
	public cmdUploadPhoto() {
		this.dialogRef.close();
	}
	
	cancel()
	{
	  this.dialogRef.close();
	}
}
