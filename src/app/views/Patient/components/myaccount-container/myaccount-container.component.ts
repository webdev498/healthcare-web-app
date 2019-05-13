//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                        from '@angular/core';
import { OnInit }                           from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                           from '@angular/router';
import { ActivatedRoute}                    from '@angular/router'

//---------------------------
// Services
//---------------------------
import { UserService }                      from '../../../../services/user.service'
import { PatientsService }                  from '../../../../services/patients.service'
import { SecurityService }                  from '../../../../services/security.service';

//---------------------------
// Interfaces
//---------------------------
import { ISubscriptionInfo }                from '../../../../models/interfaces/patient/subscriptioninfo.interface';
import { ICardInfo }                        from '../../../../models/interfaces/patient/cardinfo.interface';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                        from '@angular/material';
import { DialogCancelPlanComponent  }       from '../../../../components/Dialogs/dialog-cancel-plan/dialog-cancel-plan.component';
import { DialogChangePlanComponent } from '../../../../components/Dialogs/dialog-change-plan/dialog-change-plan.component';
import { IAccountSubscriptionChange } from '../../../../models/interfaces/patient/account-subscription-change.interface';
import { ISubscriptionOption } from '../../../../models/interfaces/patient/subscriptionoption.interface';




@Component({
  selector: 'app-myaccount-container',
  templateUrl: './myaccount-container.component.html',
  styleUrls: ['./myaccount-container.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class MyaccountContainerComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public methods
    //---------------------------------------------------------------------------
    public subscriptionInfo : ISubscriptionInfo;
    public isLoaded         : boolean = false;
    public showError        : boolean = false;
    public error            : string;
    public hasCreditCardInfo: ICardInfo;
    
    public changingPlan     : number = 0;
    public planSelected     : ISubscriptionOption;
    public currentSubscriptionEndDate   : string;
    public newSubscriptionStartDate     : string;
    public CostDifference               : string;
    public AdditonalFamilyMemberAmount  : string;
    public newSubscriptionOptionID      : string;

    public totalCostFamilySubscription  : number;
    public countFamilyMembersSelected   : number;
    public familyMembers                : number[] = [];

    public activeButton     : boolean = false;
    public isPrepay         : boolean = false;

    //---------------------------------------------------------------------------
    // Private methods
    //---------------------------------------------------------------------------
    private patientService  : PatientsService
    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        private rt      : Router,
        public dialog   : MatDialog,
        public us       : UserService,
        public ps       : PatientsService,
        private securityService: SecurityService
    ) 
    {
        this.patientService = ps;
    }

    ngOnInit() {
        this.getSubscription();
        
        this.patientService.GetCreditCardInfo().subscribe(resp => {
            this.hasCreditCardInfo = resp;
        })
          
    }

    getSubscription()
    {
        let patientId: number;
        
        this.securityService.GetUserInfo('true').subscribe(resp =>{
            patientId = resp.PatientID;
            console.log(resp);
            this.isPrepay = resp.IsPrepay;            

            this.patientService.GetSubscriptionInfo(patientId.toString())
            .subscribe(resp => {
                console.log(resp);
                this.subscriptionInfo = resp;
                this.isLoaded = true;
            },
            (error) => {
            }
            )
        })
    }




    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public cmdChangePlan_click()
    {
        this.planSelected = JSON.parse(localStorage.getItem("planSelected"));
        this.currentSubscriptionEndDate = localStorage.getItem("CurrentSubscriptionEndDate");
        
        let dialogRef = this.dialog.open(DialogChangePlanComponent, {
            data: {
                subscriptionInfo: this.subscriptionInfo,
            },
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result != undefined){
                    this.newSubscriptionStartDate = result.NextBillingDate;
                    this.CostDifference = result.CostDifference;
                    this.AdditonalFamilyMemberAmount = result.AdditonalFamilyMemberAmount;

                    if(this.planSelected.Name.includes("Individual")){
                        this.changingPlan = 1;
                    }else{
                        this.changingPlan = 2;
                        this.totalCostFamilySubscription = +(this.planSelected.Cost.replace("$",""));
                    }
                }
            });
    }

    public counter(event : any, PatientID : number)
    {
        if(event){
            this.countFamilyMembersSelected++;
            this.familyMembers.push(PatientID);

            if(this.countFamilyMembersSelected > 4){
                this.totalCostFamilySubscription = this.totalCostFamilySubscription * +(this.AdditonalFamilyMemberAmount.replace("$",""));
            }
        }else{
            this.countFamilyMembersSelected--;
            let index = this.familyMembers.indexOf(PatientID);
            this.familyMembers.splice(index, 1);
                
            if(this.countFamilyMembersSelected > 4){
                this.totalCostFamilySubscription = this.totalCostFamilySubscription / +(this.AdditonalFamilyMemberAmount.replace("$",""));
            }
        }
    }
   
    showFormEdit()
    {
        let tabIndex = localStorage.getItem("tabIndex");
        this.rt.navigate([
            '/home/patient-home/patient-myaccount-tab/'+tabIndex+'/patient-update-card-info'
        ])
    }
    changeActiveButton(value:boolean)
    {
        this.activeButton = value;
    }

    cmdCancel_click()
    {
        console.log(this.subscriptionInfo);
        
        let dialogRef = this.dialog.open(DialogCancelPlanComponent, {
            data: {
                //CurrentSubscriptionEndDate: this.subscriptionInfo.CurrentSubscriptionEndDate
            },
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result != undefined){
                    this.ps.CancelSubcription().subscribe(resp => {
                        console.log(resp);
                        if(resp.Message == "Success"){
                            this.getSubscription();
                            let tabIndex = localStorage.getItem("tabIndex");
                            this.rt.navigate([
                                '/home/patient-home/patient-myaccount-tab/'+tabIndex
                            ])
                        }else{
                            this.error = resp.Message;
                            this.showError = true;
                        }
                    });
                }
                
            });
    }
   
    cmdPrevious_click()
    {
        if(this.changingPlan == 1){
            this.changingPlan = 0;
        }else{
            this.changingPlan--;
        }
    }

    cmdContinue_click()
    {
        if(this.planSelected.Name.includes("Family") && this.changingPlan < 2 ){
            this.changingPlan = 2;
        }else{
            if(this.planSelected.Name.includes("Family") && this.changingPlan == 2){
                let newSubscription : IAccountSubscriptionChange = {
                    PatientID                           : this.securityService.getCurrentUserApi().PatientID,
                    NewSubscriptionOptionID             : this.planSelected.OptionID,
                    AdditionalFamilyMembersPatientIDs   : this.familyMembers
                }

                console.log(newSubscription);
                this.changeSubscription(newSubscription);
            }
            
        }

        if(this.planSelected.Name.includes("Individual") ){
            let newSubscription : IAccountSubscriptionChange = {
                PatientID                           : this.securityService.getCurrentUserApi().PatientID,
                NewSubscriptionOptionID             : this.planSelected.OptionID,
                AdditionalFamilyMembersPatientIDs   : []
            }

            console.log(newSubscription);
            this.changeSubscription(newSubscription);
        }
    }

    private changeSubscription(newSubscription : IAccountSubscriptionChange ){
        this.ps.ChangeSubscription(newSubscription).subscribe(resp => {
            console.log(resp);
            if(resp.Message == "Success"){
                this.changingPlan = 0;
            }else{
                this.error = resp.Message;
                this.showError = true;
            }
        });
    }

   

}
