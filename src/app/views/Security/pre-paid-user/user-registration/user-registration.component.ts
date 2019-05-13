//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit }                   from '@angular/core';

import { MatDialog }                from '@angular/material';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }              from '@angular/forms';
import { FormGroup }                from '@angular/forms';
import { Validators }               from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }                   from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }          from '../../../../services/security.service';
import { UserService }              from '../../../../services/user.service';


// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistrationComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _newUserData                 : any = {};
    public _userRegForm                 : FormGroup;

    public _passwordError               : boolean;
    public hide                         : boolean = true;

    public genders = [
        {value: 'female', viewValue: 'Female'},
        {value: 'male', viewValue: 'Male'},
        {value: 'other', viewValue: 'Other'},
        {value: 'decline', viewValue: 'Decline'}
    ];
    public titleAlert                   : string = 'This field is required';
    
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
        public dialog : MatDialog
    )
    {
        // Services
        this.securityService = ss;
        this.routerService   = rt;
        this.userService     = us;
        this.fb              = fb;

        // Form Configuration
        this.createForm();
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        // Debug:
    }

    //---------------------------------------------------------------------------
    // creating the Form
    //---------------------------------------------------------------------------
    createForm()
    {
        this._userRegForm  = this.fb.group({

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
    cmdRegisterUser_click()
    {        
        let firstName    = this._userRegForm.value.firstName;
        let lastName     = this._userRegForm.value.lastName;
        let dateOfBirth  = new Date(this._userRegForm.value.dateOfBirth).toLocaleDateString();

        this.securityService.FindPatient(firstName,lastName,dateOfBirth).subscribe((resp) => {
            console.log(resp);
        })       
        
    }

    cmdPrevious_click()
    {
        this.routerService.navigate(['/security/login'])
    }

}
