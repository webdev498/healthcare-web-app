//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                            from '@angular/core';
import { OnInit }                               from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router, ActivatedRoute }               from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                          from '@angular/forms';
import { FormGroup }                            from '@angular/forms';
import { Validators }                           from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { SecurityService }                      from '../../../../services/security.service';
import { UserService }                          from '../../../../services/user.service';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog } 							from '@angular/material';
import { DialogCodeVerificationSentComponent}   from '../../../../components/Dialogs/dialog-code-verification-sent/dialog-code-verification-sent.component';
import { DialogFailedLoginComponent }           from '../../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';


//---------------------------
// Interfaces
//---------------------------
import { ResponseDTO }                          from '../../../../models/interfaces/useraccount/responseDTO.interface';
import { LoginVerificationResponseDTO }         from '../../../../models/interfaces/useraccount/login-verification-responseDTO.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-fp-authentication-factors',
  templateUrl: './fp-authentication-factors.component.html',
  styleUrls: ['./fp-authentication-factors.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export  class FpAuthenticationFactorsComponent  implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _formFactors     : FormGroup;
    public email            : string;
    public phone            : string;
    public isLoad           : boolean = false;
    public isDisabled       : boolean = true;
    public isDisabledSubmit : boolean = true;
    public attemptsLeft     : number;
    public failedVerfication: boolean = false;

    public userID           : number;
    public ResponseDTO      : ResponseDTO;
    public LoginVerificationResponseDTO :   LoginVerificationResponseDTO;
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private verificationMethod  :   string;
    private routerService   : Router;
    private securityService : SecurityService;
    private fb              : FormBuilder;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        ss: SecurityService,
        us: UserService,
        rt: Router,
        public dialog : MatDialog,
        private ar: ActivatedRoute
    )
    {
        // Services
        this.securityService = ss;
        this.fb              = fb;
        this.routerService   = rt;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.userID = +this.ar.snapshot.paramMap.get('id');
        this.attemptsLeft = 5;
        
        // Form Configuration
        this.GetEmailPhone();
        this.createForm();
    }

    //---------------------------------------------------------------------------
    // creating the Form (Michel)
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._formFactors = this.fb.group({
			'email': [null,
				Validators.compose([
					Validators.email
				])
			],
			'phone': [null,
				Validators.compose([
				])
            ],
            'code': [
                {value: '', disabled: true},
				Validators.compose([
          			Validators.required
				])
			],
		
		});
	}
    
	selectOption(e)
	{
        this.verificationMethod = e.value
        this.isDisabled = false;
    }
    // Get data from user
    GetEmailPhone()
    {
        this.securityService.GetUserContactPreference(this.userID.toString()).subscribe(resp =>{
            console.log(resp);
            this.email = resp.Email;
            this.phone = resp.Phone;
            
            this.isLoad = true;
        })
    }

    sendCode()
    {
        let sendMethod = (this.verificationMethod == 'email') ? "email" : "phone";

        this.securityService.sendCode(this.userID, sendMethod, true,"").subscribe(res => {
            this.ResponseDTO = res;
            console.log(res);
            
            if(res.Message == "Success"){
                let dialogRef = this.dialog.open(DialogCodeVerificationSentComponent, {
                    data: {
                        
                    },
                });
                
                this._formFactors.controls["code"].enable();
            }
        });
    }

    someCode(value){
        if(value.length != 6){
            this._formFactors.controls["code"].setErrors(["Code Invalid"]);
        }
        this.isDisabledSubmit = (value.length == 6) ?  false : true;
    }

    onSubmit()
    {
        let code : string = this._formFactors.value.code;

        this.securityService.authenticateCode(code, this.userID).subscribe(res => {
            this.ResponseDTO = res;
			console.log(res);

			//res.Message = "Success";// for now, delete when the api will be ok.
			if(res.Message == "Success"){
				this.routerService.navigate(
					[
                      '/security/forgot-password/forgot-password-set-new',
                      this.userID
					]
				);
			}else{
                this.failedVerfication = true;
                this.attemptsLeft--;

                if(this.attemptsLeft == 0){
                    let dialogRef = this.dialog.open(DialogFailedLoginComponent, {
                        data: {
                            
                        },
                    });
                }
            }
            
        });
	}
}
