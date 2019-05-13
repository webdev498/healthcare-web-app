//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                            from '@angular/core';
import { OnInit, Output, EventEmitter }         from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                               from '@angular/router';


//---------------------------
// Services
//---------------------------
import { SecurityService }                      from '../../../../services/security.service';
import { UserService }                          from '../../../../services/user.service';
import { PatientsService }                      from '../../../../services/patients.service';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                            from '@angular/material';
import { DialogBillingPoliciesComponent }       from '../../../../components/Dialogs/dialog-billing-policies/dialog-billing-policies.component';

//---------------------------
// Models
//---------------------------
import { AvailableSubscriptionOptions }         from '../../../../models/interfaces/useraccount/available-subscription-options';
import { ISubscriptionInfo }                    from '../../../../models/interfaces/patient/subscriptioninfo.interface';
import { ISubscriptionOption }                  from '../../../../models/interfaces/patient/subscriptionoption.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PaymentPlanComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public plans                    : ISubscriptionOption[] = [];     //availables plans for current patient
    public isLoaded                 : boolean = false;
    public isPrepay                 : boolean = false;
    public subscriptionInfo         : ISubscriptionInfo = undefined;
    public totalMembers             : number = 0;
    
    public subscription             : string = "";
    
    public selected                 : ISubscriptionOption = undefined;  //payment plan selected if user change plan.
    public isSelectedToShow         : boolean = false;
    
    @Output() paymentChange = new EventEmitter();

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    private userService     : UserService;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ss              : SecurityService,
        us              : UserService,
        rt              : Router,
        public dialog   : MatDialog,
        private ps      : PatientsService
    )
    {
        this.securityService = ss;
        this.userService     = us;
        this.routerService   = rt;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.securityService.GetUserInfo('true').subscribe(resp =>{
            this.isPrepay = resp.IsPrepay;  
            console.log(resp.IsPrepay);

            this.ps.GetSubscriptionInfo().subscribe(resp => {
                console.log(resp);

                this.subscriptionInfo = resp;
                this.plans = resp.AvailableSubscriptions; 
                this.totalMembers = resp.CurrentSubscriptionAddOnMembers;

                this.subscription = resp.CurrentSubscriptionPlan;
    
                this.plans.forEach(element => {
                    if(element.Name === this.subscriptionInfo.CurrentSubscriptionPlan){
                        this.selected = element;
                    }
                },this);
                this.isLoaded = true;

                if(this.selected == undefined){
                    this.securityService.GetAvailablePatientSubscriptions().subscribe(resp => {
                        let allPlans = resp;

                        allPlans.AvailableSubscriptions.forEach(function(value){
                            if(value.Name === this.subscriptionInfo.CurrentSubscriptionPlan){
                                this.selected = value;
                                this.subscription = value.Name;
                                this.isLoaded = true;
                            }
                        },this)
                    })
                }
            })
        });        
    }

   
    selectPlan(plan : ISubscriptionOption)
    {
        this.plans.forEach(function (value) {
            if(value.OptionID == plan.OptionID){
                this.selected = value;
            }    
        }, this);
    
        this.isSelectedToShow = true;
        console.log(this.selected);
        localStorage.setItem('planSelected', JSON.stringify(this.selected));
        localStorage.setItem('CurrentSubscriptionEndDate', this.subscriptionInfo.CurrentSubscriptionEndDate); 
            
        if(this.selected.Name == this.subscriptionInfo.CurrentSubscriptionPlan)
        {
            this.paymentChange.emit(false);
        }
        else{
            this.paymentChange.emit(true);
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
}
