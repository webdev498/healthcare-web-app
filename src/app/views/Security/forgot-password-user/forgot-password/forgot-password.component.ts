//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 			from '@angular/core';
import { OnInit }	 			from '@angular/core';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 			from '@angular/forms';
import { FormGroup } 			from '@angular/forms';
import { Validators } 			from '@angular/forms';
import { ValidatorsLibrary } 	from '../../../../core/services/validators.service';

//---------------------------
// Router
//---------------------------
import { Router } 				from '@angular/router';

//---------------------------
// Services
//---------------------------
import { UserService } 			from '../../../../services/user.service';
import { SecurityService } from '../../../../services/security.service';


@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class ForgotPasswordComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	public _forgotPassForm	: FormGroup;
	public titleAlert		: string = 'This field is required';
	public errorMessage		: string = "";
	public showError		: boolean = false;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService	: Router;
	private fb				: FormBuilder;
	private us				: UserService;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------  

	constructor(
		fb: FormBuilder,
		rt: Router,
		us: UserService,
		private ss  : SecurityService
	) {
		// Services
		this.routerService = rt;
		this.fb = fb;
		this.us = us;

		// Form Configuration
		this.createForm();
	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._forgotPassForm = this.fb.group({
			'email'			: ['', Validators.compose([Validators.required, Validators.email])],
			'firstName'		: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			'lastName'		: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			'dateOfBirth'	: ['', Validators.compose([Validators.required])],

		});
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------

	cmdResetPass_click() {
		let user = {
			firstname	: this._forgotPassForm.value.firstName,
			lastname	: this._forgotPassForm.value.lastName,
			dob			: new Date(this._forgotPassForm.value.dateOfBirth).toLocaleDateString(),
			email		: this._forgotPassForm.value.email,
			isPatient	: true
		}

		this.ss.getSecurityQuestion(user).subscribe(resp => {
			console.log(resp);
			if(resp != null){
				this.routerService.navigate(['/security/forgot-password/forgot-password-security-question/',
				{ 
					firstname: user.firstname, 
					lastname: user.lastname,
					email: user.email,
					dateOfBirth: new Date(user.dob).toLocaleDateString()
				}])
			}else{
				this.errorMessage = "Incorrect data."
				this.showError = true;
			}

		})

		
	}

}
