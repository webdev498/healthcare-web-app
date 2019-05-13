//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';


//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                  from '@angular/forms';
import { FormGroup }                    from '@angular/forms';
import { Validators }                   from '@angular/forms';
import { ValidatorsLibrary }            from '../../../core/services/validators.service';

//---------------------------
// Router
//---------------------------
import { Router }                       from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }              from '../../../services/security.service';
import { GlobalsService }               from '../../../core/services/globals.service';
import { LogService }                   from '../../../core/services/log.service';
import { UserService }                  from '../../../services/user.service';


//---------------------------
// Dialogs
//---------------------------
import { MatDialog } 					from '@angular/material';
import { DialogFailedLoginComponent } 	from '../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';
import { DialogLoginError02Component } from '../../../components/Dialogs/dialog-login-error-02/dialog-login-error-02.component';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class LoginComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _credentials                 : any = {};
    public _authForm                    : FormGroup;

    public _passwordError               : boolean;
    public _showForgotPassword          : boolean;
    public _max_password_retries        : number;
    public _passwordRetries             : number;
    public textMessage                  : string;
    public hide                         : boolean = true;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    private userService     : UserService;
    private globalsService  : GlobalsService;
    private logService      : LogService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        rt: Router,
        ss: SecurityService,
        ls: LogService,
        us: UserService,
        public dialog: MatDialog,
       
    )
    {
        // Services
        this.securityService = ss;
        this.routerService   = rt;
        this.logService      = ls;
        this.userService     = us;
        this.globalsService  = GlobalsService.getInstance();

        // Form Configuration
        this._authForm  = fb.group({

            'username'  : ['', Validators.compose([
                                    Validators.required,
                                    Validators.minLength(8)
                               ])
                          ],

            'password'  : ['', Validators.compose([
                                    Validators.required,
                                    Validators.minLength(8)
                               ])
                          ]

        });

        // Control Variable Declarations
        this._passwordRetries = 0;
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        // Debug:
       // this.cmdLogin_click();
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    cmdLogin_click()
    {
        // Debug:
        // TODO: Remove Force variable and values from fields to activate security
        let force: boolean = true;        

        if (this._authForm.valid)
        {
           // this.logService.logEvent("Form is Valid");

            this.securityService.loginEndpoint(this._authForm.value.username,this._authForm.value.password)
            .subscribe(response => {
                console.log(response);
                
                this.setUser(response);

                this.routerService.navigate(['/home']);
            },
            (error) => {
                this._passwordRetries++;
                this._passwordError = true;
                this.logService.logEvent("Error in Endpoint API call: " + error);
                console.log(error);
                


                if (this._passwordRetries >= 5) {
                    let dialogRef = this.dialog.open(DialogFailedLoginComponent);
                    dialogRef.afterClosed().subscribe(result => {
                    });
                }
            }
        )          

        }
        else
        {
            this.logService.logEvent("Form is *NOT* Valid");

            this._passwordRetries++;
            if (this._passwordRetries <= 2)
            {
                this._passwordError = true;
            }
            else
            {
                this._passwordError = false;
                this._showForgotPassword = true;
            }
        }

    }
    showFailInfo()
    {
        let dialogRef = this.dialog.open(DialogLoginError02Component,
            {
                width: '70%'
            }
            );
            dialogRef.afterClosed().subscribe(result => {                
            });
    }
    public cmdCreateUser_click()
    {        
        this.routerService.navigate(['/security/pre-paid/user-registration'])
    }
    /**
     * changeState
     */
    public changeState() {
        this._passwordError = false;
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
