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

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                          from '@angular/forms';
import { FormGroup }                            from '@angular/forms';
import { Validators }                           from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }                               from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }                      from '../../../../services/security.service';
import { UserService  }                         from '../../../../services/user.service';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-user-registration-0',
  templateUrl: './user-registration-0.component.html',
  styleUrls: ['./user-registration-0.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistration0Component implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _newUserData                 : any = {};
    public _userRegForm0                : FormGroup;

    public titleAlert                   : string = 'This field is required';
    public error                        : string;
    public showError                    : boolean = false
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    private userService     : UserService;
    private fb              : FormBuilder;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        rt: Router,
        ss: SecurityService,
        us: UserService,
    )
    {
        // Services
        this.securityService    = ss;
        this.userService        = us;
        this.routerService      = rt;
        this.fb                 = fb;

        // Form Configuration
        this.createForm();
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {

    }

    //---------------------------------------------------------------------------
    // creating the Form
    //---------------------------------------------------------------------------
    createForm()
    {
        this._userRegForm0  = this.fb.group({

            'firstName'            : ['', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(3)
                                     ])
                                   ],

            'lastName'             : ['', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(3)
                                     ])
                                    ],
            'dateOfBirth'          : ['', Validators.compose([
                                        Validators.required                                
                                        ])
                                    ],
            
        });
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    cmdRegisterUser0_click()
    {        
        let firstName   = this._userRegForm0.value.firstName;
        let lastName    = this._userRegForm0.value.lastName;
        let dateOfBirth = new Date(this._userRegForm0.value.dateOfBirth).toLocaleDateString();

        

        this.securityService.FindPatient(firstName, lastName, dateOfBirth,"").subscribe(resp => {
            console.log(resp);

            if(resp.Message == "Already Registered")
            {
                this.routerService.navigate(
                [
                    '/security/pre-paid/user-registration-taken'               
                        
                ])
            }
            else{
                if(resp.Message == "Activation Email Sent"){
                    this.routerService.navigate(
                        [
                            '/security/pre-paid/verification-email-sent',
                            resp.Payload
                        ])
                }else{            
                    if(resp.Message == "Error"){
                        this.error = resp.Message;
                        this.showError = true;
                    }else{            
                        this.userService.setUserName(firstName);
                        this.userService.setUserLastName(lastName);
                        this.userService.setUserDob(dateOfBirth);
                        this.routerService.navigate(
                        [
                            '/security/self-paid/select-payment-plan'               
                            
                        ])
                    }
                }
            } 
            
        });  
    }

}
