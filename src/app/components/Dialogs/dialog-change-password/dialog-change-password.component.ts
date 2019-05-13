//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, Inject } 						from '@angular/core';
import { OnInit } 							from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 							from '@angular/router';
import { ActivatedRoute } 					from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialog } 						from '@angular/material';
import { MAT_DIALOG_DATA } 			 		from "@angular/material";
import { MatDialogRef } 				 	from "@angular/material";
import { DialogChangePasswordConfirmationComponent } from '../dialog-change-password-confirmation/dialog-change-password-confirmation.component'

//---------------------------
// Services
//---------------------------
import { PatientsService } 					from '../../../services/patients.service';
import { SecurityService } 					from '../../../services/security.service';


//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 						from '@angular/forms';
import { FormGroup } 						from '@angular/forms';
import { Validators } 						from '@angular/forms';
import { ProvidersService } from '../../../services/providers.service';
import { IPasswordDTO } from '../../../models/interfaces/provider/passwordDTO';


@Component({
	selector: 'app-dialog-change-password',
	templateUrl: './dialog-change-password.component.html',
	styleUrls: ['./dialog-change-password.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogChangePasswordComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _formPassword: FormGroup;
	public hide			: boolean 	= true;
	public hide1		: boolean 	= true;
	public hide2		: boolean 	= true;
	public error		: boolean 	= false;
	public errorText	: string 	= "";
	public isPatient    : boolean;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private dialogRef: MatDialogRef<DialogChangePasswordComponent>;
	private routerService: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		private fb							: FormBuilder,
		dr									: MatDialogRef<DialogChangePasswordComponent>,
		public dialog						: MatDialog,
		rt									: Router,
		private ps							: PatientsService,
		private providerservice				: ProvidersService,
		private ss							: SecurityService,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.dialogRef = dr;
		this.routerService = rt;

		
	}

	ngOnInit() {
		this.isPatient = this.data.isPatient;
		this.createForm();
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._formPassword = this.fb.group({
			'currentPassword': [null,
				Validators.compose([
					Validators.required,
					Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
				])
			],
			'newPassword': [null,
				Validators.compose([
					Validators.required,
					Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
				])
			],
			'confirmPassword': [null,
				Validators.compose([
					Validators.required,
					Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
				])
			],
		});
	}

	//---------------------------------------------------------------------------
	// Public Methods Section
	//---------------------------------------------------------------------------
	public cmdConfirmNewPassword_click() {
		let currentPassword 	= this._formPassword.value.currentPassword;
		let newPassword 		= this._formPassword.value.newPassword;
		let confirmPassword 	= this._formPassword.value.confirmPassword;

		if (newPassword === confirmPassword) {
			let patientID 	= this.ss.getCurrentUserApi().PatientID.toString();
			let providerID 	= this.ss.getCurrentUserApi().ProviderID;
			if(this.isPatient)
			{
				this.ps.UpdatePassword(patientID, currentPassword, newPassword).subscribe(resp => {
					console.log(resp);
					
					if (resp.Message == "Success" ) {
						this.dialogRef.close();
		
						let dialogRef1 = this.dialog.open(DialogChangePasswordConfirmationComponent, {
							data: {
								animal: ''
							},
							width: "550px",
						});
		
						dialogRef1.afterClosed().subscribe(result => {
						});
		
		
					} else {
						this.errorText = resp.Message;
						this.error = true;
					}
				});
			}
			else
			{
				let passworDto: IPasswordDTO = 
				{
					ID : providerID,
					CurrentPassword: currentPassword,
					NewPassword: newPassword
				}
				this.providerservice.updatePassword(passworDto).subscribe(resp =>{
					console.log(resp);
					
					if (resp.Message == "Success" ) {
						this.dialogRef.close();
		
						let dialogRef1 = this.dialog.open(DialogChangePasswordConfirmationComponent, {
							data: {
								animal: ''
							},
							width: "550px",
						});
		
						dialogRef1.afterClosed().subscribe(result => {
						});
		
		
					} else {
						this.errorText = resp.Message;
						this.error = true;
					}
				})
			}

			

			
		} else {
			this.error = true;
		}

	}

	public closeDialog()
  	{      
      this.dialogRef.close();
  	}
}
