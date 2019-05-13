//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 					from '@angular/core';
import { OnInit } 						from '@angular/core';
import { MatSnackBar } 					from '@angular/material';

//---------------------------
// Routing
//---------------------------
import { Router } 						from '@angular/router';
import { ActivatedRoute } 				from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService } 				from '../../../services/security.service';


//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 					from '@angular/forms';
import { FormGroup } 					from '@angular/forms';
import { Validators } 					from '@angular/forms';
import { FormControl } 					from '@angular/forms';
import { ValidatorsLibrary } 			from '../../../core/services/validators.service';


//---------------------------
// Dialogs
//---------------------------
import { MatDialog } 					from '@angular/material';
import { DialogFailedLoginComponent } 	from '../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';


//---------------------------
// Interfaces
//---------------------------
import { CreatePasswordPageDTO } 		from '../../../models/interfaces/useraccount/create-password-pageDTO.interface';

@Component({
	selector: 'app-set-password-make-private',
	templateUrl: './set-password-make-private.component.html',
	styleUrls: ['./set-password-make-private.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class SetPasswordMakePrivateComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _formPassword	: FormGroup;
	public passwordID		: string;
	public hide				: boolean;
	public hide1			: boolean;
	public error			: boolean = false;
	public isLoaded			: boolean = false;
	public attemptsPassword	: number;
	public CreatePasswordPageDTO : CreatePasswordPageDTO;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService: Router;

	//-------------------------------------------------------------------------------
	// Component Class Section
	//-------------------------------------------------------------------------------
	constructor(
		private fb: FormBuilder,
		rt: Router,
		private ss: SecurityService,
		private routerActivate: ActivatedRoute,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) {
		this.routerService = rt;

		this.createForm();
	}

	ngOnInit() {
		this.hide 	= true;
		this.hide1 	= true;
		this.attemptsPassword = 0;

		this.routerActivate.queryParams.subscribe(params => {
			this.passwordID = params['passwordID'];

            this.ss.GetMakePrivateLinkInfo(this.passwordID).subscribe(resp => {
				this.CreatePasswordPageDTO = resp;
				console.log(resp);
				this.isLoaded = true;
			})
        }); 
		
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._formPassword = this.fb.group({
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

	public cmdConfirmPassword_click() {
		let email = this._formPassword.value.email;

		if (this._formPassword.value.newPassword == this._formPassword.value.confirmPassword) {
			this.ss.CreatePrivateMemberPassword(this.passwordID, this._formPassword.controls['newPassword'].value).subscribe(resp => {
				console.log(resp);
				
				if(resp.Message == "Success"){
					this.snackBar.open(resp.Message);
					console.log(this.CreatePasswordPageDTO.PatientEmail);
					console.log(this._formPassword.controls['newPassword'].value);
					

					this.ss.loginEndpoint(this.CreatePasswordPageDTO.PatientEmail,this._formPassword.controls['newPassword'].value)
                        .subscribe(response => {
                            this.setUser(response);
                            
                            let role : number = response.role;
                            let isPatient : string = 'false';

                            if(response.role < 3){
                                role = response.role;
                                isPatient = (role == 2) ? 'false' : 'true';    
                            }

                            this.ss.GetUserInfo(isPatient).subscribe(resp =>{
                                this.ss.setCurrentUserApi(resp);
                
                                let availity = (resp.Availability) ? 'true' : 'false';                    
                                
                                localStorage.setItem('available',availity);
                            })

							console.log(localStorage);
							
							localStorage.setItem('authFactor','true');
							this.routerService.navigate(
								[
								'/home/patient-home/patient-main',
								]
							);
                            
                            
                        });

				}else{
					this.snackBar.open(resp.Message, "", {
						duration: 2000,
					  });
				}
			})

		} else {
			this.error = true;
			this.attemptsPassword++;

			if (this.attemptsPassword >= 5) {
				let dialogRef = this.dialog.open(DialogFailedLoginComponent);
				dialogRef.afterClosed().subscribe(result => {
				});
			}
		}

	}

	public setUser(user:any)
    {
        console.log(user);
        
        localStorage.setItem('access_token',user.access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('token_type', user.token_type);
        localStorage.setItem('expires_in', user.expires_in);
        localStorage.setItem('email', user.email);
        localStorage.setItem('loginid',user.loginid);
        localStorage.setItem('userid',user.userid);
        localStorage.setItem('isLoggedin', 'true');

        // control vars
        localStorage.setItem('authFactor','false');
    }   


}
