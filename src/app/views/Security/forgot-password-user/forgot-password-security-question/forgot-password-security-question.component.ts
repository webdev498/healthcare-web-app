//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 								from '@angular/core';
import { OnInit } 									from '@angular/core';

import { MatDialog } 								from '@angular/material';
import { DialogFailedLoginComponent }				from '../../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 								from '@angular/forms';
import { FormGroup } 								from '@angular/forms';
import { Validators } 								from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router } 									from '@angular/router';
import { ActivatedRoute } 							from '@angular/router';

//---------------------------
// Services
//---------------------------
import { UserService } 								from '../../../../services/user.service';

//---------------------------
// Models and Interfaces
//---------------------------
import { SecurityQuestionAnswersDTO } 				from '../../../../models/interfaces/securityquestion/security-question-answersDTO';
import { SecurityService } from '../../../../services/security.service';

@Component({
	selector: 'app-forgot-password-security-question',
	templateUrl: './forgot-password-security-question.component.html',
	styleUrls: ['./forgot-password-security-question.component.css']
})

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class ForgotPasswordSecurityQuestionComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	public _forgotPassSQForm	: FormGroup;
	public titleAlert			: string = 'This field is required';
	public counter				: number = 0;
	public errorMessage			: string;
	public securityQuestion		: string;
	public SecurityQuestionAnswersDTO	: SecurityQuestionAnswersDTO;
	public isLoaded				: boolean = false;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService		: Router;
	private fb					: FormBuilder;
	private us					: UserService;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		fb: FormBuilder,
		rt: Router,
		us: UserService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private ss 	: SecurityService
	) {
		// Services
		this.routerService = rt;
		this.fb = fb;
		this.us = us;

		// Form Configuration
		this.createForm();
	}

	ngOnInit() {
		let user = {
			firstname	: this.route.snapshot.paramMap.get('firstname'),
			lastname	: this.route.snapshot.paramMap.get('lastname'),
			dob			: new Date(this.route.snapshot.paramMap.get('dateOfBirth')).toLocaleDateString(),
			email		: this.route.snapshot.paramMap.get('email'),
			isPatient	: true
		}
		
		this.ss.getSecurityQuestion(user).subscribe(resp => {
			this.SecurityQuestionAnswersDTO = resp;
			console.log(resp);

			let question = (resp != null) ? resp.QuestionText : "";
			this.securityQuestion = question;
			this.isLoaded = true;
		})
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._forgotPassSQForm = this.fb.group({
			'securityQuestion': ['', Validators.compose([Validators.required])],
		});
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------

	cmdSubmit_click() {
		this.SecurityQuestionAnswersDTO.AnswerText = this._forgotPassSQForm.controls["securityQuestion"].value;
		console.log(this.SecurityQuestionAnswersDTO);
		
		this.ss.checkSecurityQuestion(this.SecurityQuestionAnswersDTO)
			.subscribe(resp => {
				console.log(resp);
				
				if (resp.StatusCode != "13" ) {
					this.routerService.navigate(['/security/forgot-password/forgot-password-authentication-factors/'+this.SecurityQuestionAnswersDTO.UserID])
				}
				else {
					this.errorMessage = "Your answer do not match.";
					this._forgotPassSQForm.reset();
					this.counter++;
				}
			})
		if (this.counter == 5) {

			let dialogRef = this.dialog.open(DialogFailedLoginComponent, {
				width: '750px'
			});
		}

	}

}
