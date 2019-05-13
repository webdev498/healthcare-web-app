//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 				from '@angular/core';
import { OnInit } 					from '@angular/core';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 				from '@angular/forms';
import { FormGroup } 				from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }					from '@angular/router';

//---------------------------
// Services
//---------------------------
import { UserService } 				from '../../../../services/user.service';

@Component({
	selector: 'app-forgot-password-success',
	templateUrl: './forgot-password-success.component.html',
	styleUrls: ['./forgot-password-success.component.css']
})
//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class ForgotPasswordSuccessComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _forgotPassSQForm	: FormGroup;
	public titleAlert			: string = 'This field is required';

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService		: Router;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		fb: FormBuilder,
		rt: Router,
		us: UserService
	) {
		// Services
		this.routerService = rt;

	}

	ngOnInit() {
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------

	cmdLogin_click() {
		this.routerService.navigate(['/security/login'])
	}

}
