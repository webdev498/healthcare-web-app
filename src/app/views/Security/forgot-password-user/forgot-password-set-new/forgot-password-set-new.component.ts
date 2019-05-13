//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 						from '@angular/core';
import { OnInit } 							from '@angular/core';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 						from '@angular/forms';
import { FormGroup } 						from '@angular/forms';
import { Validators } 						from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router, ActivatedRoute }               from '@angular/router';

//---------------------------
// Services
//---------------------------
import { UserService } 						from '../../../../services/user.service';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog } 						from '@angular/material';
import { DialogFailedLoginComponent } 		from '../../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';
import { SecurityService } 					from '../../../../services/security.service';

@Component({
	selector: 'app-forgot-password-set-new',
	templateUrl: './forgot-password-set-new.component.html',
	styleUrls: ['./forgot-password-set-new.component.css']
})

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class ForgotPasswordSetNewComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	public _forgotPassSNForm	: FormGroup;
	public titleAlert			: string = 'This field is required';
	public errorMessage			: string;
	public hide					: boolean = true;
	public userID				: number;
	public error 				: boolean = false;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService		: Router;
	private fb					: FormBuilder;
	private countFails			: number = 0;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//--------------------------------------------------------------------------- 
	constructor(
		fb: FormBuilder,
		rt: Router,
		private ar : ActivatedRoute,
		private ss: SecurityService,
		public dialog	: MatDialog,
	) {
		// Services
		this.routerService = rt;
		this.fb = fb;

		// Form Configuration
		this.createForm();
	}


	ngOnInit() {
		this.userID = +this.ar.snapshot.paramMap.get('id');
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._forgotPassSNForm = this.fb.group({
			'newpassword'	: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			'retypepassword': ['', Validators.compose([
				Validators.required, 
				Validators.minLength(4),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
			])]

		});
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------

	cmdSubmit_click() {
		if (this._forgotPassSNForm.value.newpassword == this._forgotPassSNForm.value.retypepassword) {
			let password = this._forgotPassSNForm.value.newpassword;
			this.error = false;

			this.ss.ResetPassword(this.userID, password)
				.subscribe(resp => {
					console.log(resp);
					
					if (resp.Message == "Success") {
						this.routerService.navigate(['/security/forgot-password/forgot-password-success'])
					}
				})
		}
		else {
			this.error = true;
			this.errorMessage = "The password must match";
			this.countFails++;

			if(this.countFails > 4){
				let dialogRef = this.dialog.open(DialogFailedLoginComponent, {
				});
			}
		}

	}

}
