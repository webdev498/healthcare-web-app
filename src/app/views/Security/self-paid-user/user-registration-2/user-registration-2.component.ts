//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { Location }                     from '@angular/common';

// Dialogs
import { MatDialog }                    from '@angular/material';
import { DialogTermsOfUseComponent }    from '../../../../components/Dialogs/dialog-terms-of-use/dialog-terms-of-use.component';
import { DialogEmailAttempsComponent }  from '../../../../components/Dialogs/dialog-email-attemps/dialog-email-attemps.component';


//---------------------------
// Router
//---------------------------

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
import { GlobalsService }               from '../../../../core/services/globals.service';
import { LogService }                   from '../../../../core/services/log.service';
import { UserService }                  from '../../../../services/user.service';


//---------------------------
// Interfaces
//---------------------------
import { UserRegistration }             from '../../../../models/interfaces/useraccount/user-registration.interface';
import { ISubscriptionOption }          from '../../../../models/interfaces/patient/subscriptionoption.interface';



// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-user-registration-2',
  templateUrl: './user-registration-2.component.html',
  styleUrls: ['./user-registration-2.component.css']
  
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistration2Component implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _userRegForm2                : FormGroup;
    public _passwordError               : boolean = false;
    public hide                         : boolean = true;
    public checkTermOfUse               : boolean = false;
    
    //user data from first form registration.
    public userName                     : string;
    public userLastName                 : string;
    public userSelectedPaymentPlan      : ISubscriptionOption; 
    public date	                        : FormControl;

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
    
    public error    :   string;
    public showError:   boolean = false;

    
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private userService     : UserService;
    private fb              : FormBuilder;
    private route           : ActivatedRoute;

    private emailError      : boolean = false;
    private emailAttemps    : number = 0;


    

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb                  : FormBuilder,
        rt                  : Router,
        us                  : UserService,        
        ar                  : ActivatedRoute,
        public dialog       : MatDialog,
        private location    : Location,
        private ss          : SecurityService 
    )
    {
        // Services
        this.routerService   = rt;
        this.userService     = us;
        this.fb              = fb;
        this.route           = ar;    

        // Form Configuration
        this.createForm();
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.userName               = this.userService.getUserName();
        this.userLastName           = this.userService.getUserLastName();        
        this.userSelectedPaymentPlan = this.ss.getSubscription();
        console.log(this.userSelectedPaymentPlan);
    }

    //---------------------------------------------------------------------------
    // creating the Form
    //---------------------------------------------------------------------------
    createForm()
    {
        this._userRegForm2  = this.fb.group({

            'firstName'            : ['', Validators.compose([                                      
                                      Validators.minLength(3)
                                     ])
                                   ],

            'lastName'             : ['', Validators.compose([                                      
                                      Validators.minLength(3)
                                     ])
                                    ],
            'dateOfBirth'          : [''
                                    ],
            'gender'               :['',Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],
            'paymentPlan'               :['',Validators.compose([])
                                    ], 
            'email'                 :['',Validators.compose([
                                        Validators.required,
                                        Validators.email                               
                                        ])
                                    ],                         
            'contactNumber'        :['',Validators.compose([
                                        Validators.required, 
                                       // Validators.pattern("^[0-9]*$"),
                                        Validators.minLength(8),                              
                                        ])
                                    ],
            'addressLine1'         :['',Validators.compose([
                                        Validators.required                               
                                        ])
                                    ], 
            'addressLine2'         :['',Validators.compose([                               
                                        ])
                                    ],
            'city'                  :['',Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],
            'state'                 :['',Validators.compose([
                                        Validators.required                               
                                        ])
                                    ],
            'zip'                   :['',Validators.compose([
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

        this.date = new FormControl(new Date(this.userService.getUserDob()));
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    cmdRegisterUser_click()
    {   
        this.showError = false;
        this.emailError = false;
        this._passwordError = false;

        if((this._userRegForm2.value.password != this._userRegForm2.value.confirmPass) 
            || (!this.checkTermOfUse)
        )
        {
            this._passwordError = true;
        }else{
            let date = new Date(this.date.value);
    
        
            let user : UserRegistration = {
                PatientID   : JSON.parse(localStorage.getItem("CreaditCard")).PatientID,
                Email       : this._userRegForm2.value.email,
                Password    : this._userRegForm2.value.password,
                MPI         : "",  
                Domain      : "",                      
                IsPrimary   : true,
                FirstName   : this.userName,
                Title       : "",
                MiddleName  : "",
                LastName    : this.userLastName,
                DateAdded   : this.getDateString(new Date()),
                DOB         : this.getDateString(date),
                Gender      : this._userRegForm2.value.gender,
                Phone       : this._userRegForm2.value.contactNumber,
                Street1     : this._userRegForm2.value.addressLine1,
                Street2     : this._userRegForm2.value.addressLine2,
                City        : this._userRegForm2.value.city,
                State       : this._userRegForm2.value.state,
                Zip         : this._userRegForm2.value.zip,
                StatusCode  : "",
                Message     : ""
            };

            console.log(user);
            

            this.ss.RegistrationStep1(user).subscribe((resp) => {
                console.log(resp);
                localStorage.setItem("NewUser", JSON.stringify(user));
                localStorage.setItem("processRegistrationType", "selfpaid");

                if(resp.Message == "Success"){
                    this.routerService.navigate(
                        [
                            '/security/pre-paid/user-registration-security-question'
                        ]
                    );
                }else{
                    if(resp.Message == "Email Already In Use"){
                        this.emailError = true;
                    }else{
                        this.error = resp.Message;
                        this.showError = true;
                    }
                }                
            }); 
            
        }     
    }
    getDateString(date : any) : string
    {
        let year = date.getFullYear(); //this will give you full year eg : 1990
        let day = date.getDate(); //gives you the date from 1 to 31
        let month = date.getMonth() + 1;
        return month.toString() + "/" + day.toString() + "/" + year.toString();
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
              },                    
          });
          dialogRef.afterClosed().subscribe(result => {
          });          
    }

    onPrevious(){
        this.location.back();
    }

    cmdEmailAttemps_click()
    {
        let dialogRef = this.dialog.open(DialogEmailAttempsComponent, {
            data: {
                animal: 'panda'
              },                    
          });
          dialogRef.afterClosed().subscribe(result => {
          });          
    }
}
