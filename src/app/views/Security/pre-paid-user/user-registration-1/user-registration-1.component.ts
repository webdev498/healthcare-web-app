//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';

import { NgFlashMessageService }        from 'ng-flash-messages';

// Dialogs
import { MatDialog }                    from '@angular/material';
import { DialogTermsOfUseComponent }    from '../../../../components/Dialogs/dialog-terms-of-use/dialog-terms-of-use.component';


//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                  from '@angular/forms';
import { FormGroup }                    from '@angular/forms';
import { Validators }                   from '@angular/forms';
import { FormControl }                  from '@angular/forms';
import { ValidatorsLibrary }            from '../../../../core/services/validators.service';

//---------------------------
// Router
//---------------------------
import { Router }                       from '@angular/router';
import { ActivatedRoute }               from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }              from '../../../../services/security.service';
import { UserService }                  from '../../../../services/user.service';

//---------------------------
// Interfaces
//---------------------------
import { UserRegistration }             from '../../../../models/interfaces/useraccount/user-registration.interface';

// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration-1.component.html',
  styleUrls: ['./user-registration-1.component.css']
  
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistration1Component implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _userRegForm1     : FormGroup;
    public _passwordError    : boolean = false;
    public error             : boolean = false;
    public errorText         : string;
    public hide              : boolean = true;
    public checkTermOfUse    : boolean = false;
    public isLoaded          : boolean = false;
    public date	             : FormControl;
    public user              : UserRegistration;
    public MPIID             : string; 

    public genders = [
		{ value: 'F', viewValue: 'Female' },
		{ value: 'M', viewValue: 'Male' },
		{ value: 'O', viewValue: 'Other' },
		{ value: 'D', viewValue: 'Decline' }
    ];
    
    public states = [
        {
            value: 'AL',
            viewValue: 'AL'
        },
        {
            value: 'AK',
            viewValue: 'AK'
        },
        {
            value: 'AS',
            viewValue: 'AS'
        },
        {
            value: 'AZ',
            viewValue: 'AZ'
        },
        {
            value: 'AR',
            viewValue: 'AR'
        },
        {
            value: 'CA',
            viewValue: 'CA'
        },
        {
            value: 'CO',
            viewValue: 'CO'
        },
        {
            value: 'CT',
            viewValue: 'CT'
        },
        {
            value: 'DE',
            viewValue: 'DE'
        },
        {
            value: 'DC',
            viewValue: 'DC'
        },
        {
            value: 'FM',
            viewValue: 'FM'
        },
        {
            value: 'FL',
            viewValue: 'FL'
        },
        {
            value: 'GA',
            viewValue: 'GA'
        },
        {
            value: 'GU',
            viewValue: 'GU'
        },
        {
            value: 'HI',
            viewValue: 'HI'
        },
        {
            value: 'ID',
            viewValue: 'ID'
        },
        {
            value: 'IL',
            viewValue: 'IL'
        },
        {
            value: 'IN',
            viewValue: 'IN'
        },
        {
            value: 'IA',
            viewValue: 'IA'
        },
        {
            value: 'KS',
            viewValue: 'KS'
        },
        {
            value: 'KY',
            viewValue: 'KY'
        },
        {
            value: 'LA',
            viewValue: 'LA'
        },
        {
            value: 'ME',
            viewValue: 'ME'
        },
        {
            value: 'MH',
            viewValue: 'MH'
        },
        {
            value: 'MD',
            viewValue: 'MD'
        },
        {
            value: 'MA',
            viewValue: 'MA'
        },
        {
            value: 'MI',
            viewValue: 'MI'
        },
        {
            value: 'MN',
            viewValue: 'MN'
        },
        {
            value: 'MS',
            viewValue: 'MS'
        },
        {
            value: 'MO',
            viewValue: 'MO'
        },
        {
            value: 'MT',
            viewValue: 'MT'
        },
        {
            value: 'NE',
            viewValue: 'NE'
        },
        {
            value: 'NV',
            viewValue: 'NV'
        },
        {
            value: 'NH',
            viewValue: 'NH'
        },
        {
            value: 'NJ',
            viewValue: 'NJ'
        },
        {
            value: 'NM',
            viewValue: 'NM'
        },
        {
            value: 'NY',
            viewValue: 'NY'
        },
        {
            value: 'NC',
            viewValue: 'NC'
        },
        {
            value: 'ND',
            viewValue: 'ND'
        },
        {
            value: 'MP',
            viewValue: 'MP'
        },
        {
            value: 'OH',
            viewValue: 'OH'
        },
        {
            value: 'OK',
            viewValue: 'OK'
        },
        {
            value: 'OR',
            viewValue: 'OR'
        },
        {
            value: 'PW',
            viewValue: 'PW'
        },
        {
            value: 'PA',
            viewValue: 'PA'
        },
        {
            value: 'PR',
            viewValue: 'PR'
        },
        {
            value: 'RI',
            viewValue: 'RI'
        },
        {
            value: 'SC',
            viewValue: 'SC'
        },
        {
            value: 'SD',
            viewValue: 'SD'
        },
        {
            value: 'TN',
            viewValue: 'TN'
        },
        {
            value: 'TX',
            viewValue: 'TX'
        },
        {
            value: 'UT',
            viewValue: 'UT'
        },
        {
            value: 'VT',
            viewValue: 'VT'
        },
        {
            value: 'VI',
            viewValue: 'VI'
        },
        {
            value: 'VA',
            viewValue: 'VA'
        },
        {
            value: 'WA',
            viewValue: 'WA'
        },
        {
            value: 'WV',
            viewValue: 'WV'
        },
        {
            value: 'WI',
            viewValue: 'WI'
        },
        {
            value: 'WY',
            viewValue: 'WY'
        }
    ];
    public titleAlert                   : string = 'This field is required';  
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private userService     : UserService;
    private fb              : FormBuilder;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        private rt: Router,
        public dialog: MatDialog,
        private ar : ActivatedRoute,
        private ss: SecurityService,
    )
    {
        // Services
        this.routerService   = rt;
        this.fb              = fb;
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.ar.queryParams.subscribe(params => {
            this.MPIID = params['MPIID'];

            this.ss.StartPrePayRegistration(this.MPIID).subscribe(resp => {
                console.log(resp);
                this.user = resp;
                localStorage.setItem("processRegistrationType", "prepaid");

                // Form Configuration
                this.createForm();
                this.isLoaded = true;
            })
        }); 
        
        
    }

    //---------------------------------------------------------------------------
    // creating the Form
    //---------------------------------------------------------------------------
    createForm()
    {
        console.log(this.user.DOB);
        
        if(this.user.DOB != null){
            this.date = new FormControl(new Date(this.user.DOB));
        }else{
            this.date = new FormControl(new Date());
        }

        this._userRegForm1  = this.fb.group({

            'firstName'            : [this.user.FirstName, Validators.compose([                                      
                                      Validators.minLength(3),
                                      Validators.required,
                                     ])
                                   ],

            'lastName'             : [this.user.LastName, Validators.compose([                                      
                                        Validators.required,
                                        Validators.minLength(3)
                                     ])
                                    ],

            'dateOfBirth'           : [this.date.value],

            'gender'               :[this.user.Gender,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],

            'insurance-employer'    :[this.user.Domain,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ], 

            'contactNumber'        :[this.user.Phone,Validators.compose([
                                        Validators.required,                              
                                        ])
                                    ],

            'addressLine1'         :[this.user.Street1,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ], 

            'addressLine2'         :[this.user.Street2,Validators.compose([                               
                                        ])
                                    ],

            'city'                  :[this.user.City,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],

            'state'                 :[this.user.State,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],

            'zip'                   :[this.user.Zip,Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],

            'password'              :['',Validators.compose([
                                        Validators.required,
                                        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
                                        Validators.minLength(6),                                
                                        ])
                                    ],
            'confirmPass'           :['',Validators.compose([
                                        Validators.required,
                                        Validators.minLength(6),
                                        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')                                    
                                        ])
                                    ],


        });
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    cmdRegisterUser_click()
    {        
        if((this._userRegForm1.value.password != this._userRegForm1.value.confirmPass) || (!this.checkTermOfUse))
        {
            this._passwordError = true;
        }
        else
        {
            let date = new Date(this._userRegForm1.controls["dateOfBirth"].value);
            let year = date.getFullYear(); //this will give you full year eg : 1990
            let day = date.getDate(); //gives you the date from 1 to 31
            let month = date.getMonth() + 1;

            let date1 : string = month.toString() + "/" + day.toString() + "/" + year.toString();
            
            let user : UserRegistration = {
                PatientID   : this.user.PatientID,
                Email       : this.user.Email,
                Password    : this._userRegForm1.value.password,
                MPI         : this.MPIID,
                Domain      : this.user.Domain,
                IsPrimary   : this.user.IsPrimary,
                FirstName   : this._userRegForm1.value.firstName,
                Title       : '',
                MiddleName  : this.user.MiddleName,
                LastName    : this._userRegForm1.value.lastName,
                DateAdded   : this.user.DateAdded,
                DOB         : date1,
                Gender      : this._userRegForm1.value.gender,
                Phone       : this._userRegForm1.value.contactNumber,
                Street1     : this._userRegForm1.value.addressLine1,
                Street2     : this._userRegForm1.value.addressLine2,
                City        : this._userRegForm1.value.city,
                State       : this._userRegForm1.value.state,
                Zip         : this._userRegForm1.value.zip,
                StatusCode  : "",
                Message     : ""
            };

            this.ss.RegistrationStep1(user).subscribe((resp) => {
                console.log(resp);

                if(resp.Message == "Success"){
                    console.log(user);
                    localStorage.setItem("NewUser", JSON.stringify(user)); 
                    
                    this.routerService.navigate(
                        [
                            '/security/pre-paid/user-registration-security-question'
                        ]
                    );
                    
                }else{
                    this.error = true;
                    this.errorText = resp.Message;
                }
                
                
            }); 
        }

    }

    chagePasswordError_click()
    {
        this._passwordError = false;
    }
    cmdCheckTermOfUse_click()
    {

    }
    
    cmdTermOfUse_click()
    {
        let dialogRef = this.dialog.open(DialogTermsOfUseComponent, {
            data: {
                animal: 'panda'
              },                    
          });
          dialogRef.afterClosed().subscribe(result => {
          });          
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
