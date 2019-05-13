//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                            from '@angular/core';
import { OnInit }                               from '@angular/core';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                            from '@angular/material';
import { DialogPaymentErrorComponent }          from '../../../../components/Dialogs/dialog-payment-error/dialog-payment-error.component';
import { DialogBillingPoliciesComponent }       from '../../../../components/Dialogs/dialog-billing-policies/dialog-billing-policies.component';

//---------------------------
// Router
//---------------------------
import { Router }                               from '@angular/router';
import { ActivatedRoute }                       from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                          from '@angular/forms';
import { FormGroup }                            from '@angular/forms';
import { Validators }                           from '@angular/forms';
import { ValidatorsLibrary }                    from '../../../../core/services/validators.service';

//---------------------------
// Services
//---------------------------
import { AvailableSubscriptionOptions }         from '../../../../models/interfaces/useraccount/available-subscription-options';

import { LogService }                           from '../../../../core/services/log.service';
import { UserService }                          from '../../../../services/user.service';
import { SecurityService }                      from '../../../../services/security.service';

//---------------------------
// Models
//---------------------------
import { ISubscriptionOption }                  from '../../../../models/interfaces/patient/subscriptionoption.interface';


// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-select-payment-plan',
  templateUrl: './select-payment-plan.component.html',
  styleUrls: ['./select-payment-plan.component.css']
})
export class SelectPaymentPlanComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public plans                    : AvailableSubscriptionOptions;
    public selectedPlan             : ISubscriptionOption;
    public isLoaded                 : boolean = false;
    
    
    
    public promotionalCode          : string = "";
    public totalSubscription        : number = 0;    

    public _selectPaymentPlanForm   : FormGroup;
    public classButtonColor         : string;
    public membersFamily            : number;
    public codeValid                : boolean;

    // Data that come from user registration
    public userName                 : string;
    public userLastName             : string;
    public userDOB                  : any;
    

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private userService         : UserService;
    
    private routerService       : Router;
    private fb                  : FormBuilder;
    private ar                  : ActivatedRoute;

    constructor(
        us: UserService,
        ar: ActivatedRoute,
        
        fb: FormBuilder,
        rt: Router,
        public dialog: MatDialog,
        private ss: SecurityService,
    ) {
        // Services
        this.userService        = us;
        
        this.routerService      = rt;
        this.fb                 = fb;
        this.ar                 = ar;

        this.createForm();
    }

    ngOnInit() {  
             
        this.userService.GetAvailablePatientSubscriptions().subscribe(resp => {
            this.plans = resp;
            console.log(resp);
            

            this.plans.AvailableSubscriptions.forEach(element => {
                element.Cost = element.Cost.toString().replace('$','');
            });
            this.isLoaded = true;
        });

        this.selectedPlan = undefined;


       
        this.classButtonColor = 'primary';
        this.membersFamily = 0;
        this.codeValid = true;        
    }

    select(plan)
    {
        this.selectedPlan = plan
        this.ss.setSubscription(plan);
        this.totalSubscription = plan.Cost;
    }

    createForm()
    {
        this._selectPaymentPlanForm  = this.fb.group({

            'plans'                 : ['', Validators.compose([                                      
                                      Validators.required
                                     ])
                                    ],

            'promotionalCode'       : [''],
            'totalSubscription'     : ['', Validators.compose([                                      
                                        Validators.minLength(3)
                                       ])
                                    ],
            'membersFamily'         : ['', Validators.compose([
                                       ])
                                    ],                                                   
        });
    }

    cmdSelectPaymentPlan_click()
    {
        this.totalSubscription = +this.totalSubscription.toString().replace('$','');
        this.routerService.navigate([
            '/security/self-paid/entering-payment-information', 
            this.totalSubscription,
            this.promotionalCode
        ]);
    }

    

    showDialog_click()
    {
        let dialogRef = this.dialog.open(DialogPaymentErrorComponent, {
            data: {
                animal: ''
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getSelectedPlan()
    {
        if(this.selectedPlan){
            return this.selectedPlan
        }else{
            return false
        }
    }

    getPlanFamily()
    {
        if(this.selectedPlan && this.selectedPlan.Name == "Family Subscription"){
            return true
        }else{
            return false
        }
    }

    showInformationPlanDialog()
    {
      let dialogRef = this.dialog.open(DialogBillingPoliciesComponent, {
        data: {
            animal: ''
        },
        width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onAddCost( amount: number )
    {
        console.log(amount);
        
        if(amount == 0){
            this.totalSubscription = +this.selectedPlan.Cost;
        }else{
            this.totalSubscription = +this.selectedPlan.Cost + (amount * 4.95);  
            this.totalSubscription = +this.totalSubscription.toFixed(2);
        }
    }

    validateCode(code : string)
    {
        if(code == "" || code == undefined){
            this.codeValid = true;
        }else{
            this.ss.ValidatePromoCode(this.selectedPlan.OptionID,code).subscribe(resp => {
                console.log(resp);
                
                if(resp.Message == "Success")
                {
                    return true;
                }else{
                    this.codeValid = false;
                    return false;
                }
            })
        }
    }
}
