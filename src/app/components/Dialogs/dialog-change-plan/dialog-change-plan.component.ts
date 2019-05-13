//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit, Inject }            from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router }                    from '@angular/router';
import { ActivatedRoute }            from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialog } 					       from '@angular/material';
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";

//---------------------------
// Services
//---------------------------
import { PatientsService }            from '../../../services/patients.service';


//---------------------------
// Models
//---------------------------
import { ISubscriptionInfo }          from '../../../models/interfaces/patient/subscriptioninfo.interface';
import { IFamilyMember }              from '../../../models/interfaces/patient/familymember.interface';
import { SubscriptionChangeInfoDTO } from '../../../models/interfaces/patient/subscription-change-infoDTO.interface';
import { ISubscriptionOption } from '../../../models/interfaces/patient/subscriptionoption.interface';


@Component({
  selector: 'app-dialog-change-plan',
  templateUrl: './dialog-change-plan.component.html',
  styleUrls: ['./dialog-change-plan.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogChangePlanComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Public Fields Section
  //---------------------------------------------------------------------------
  public planSelected                : ISubscriptionOption;
  public isLoaded                   : boolean = false;
  public currentSubscriptionInfo    : ISubscriptionInfo = undefined;
  public SubscriptionChangeInfoDTO  : SubscriptionChangeInfoDTO = undefined;

  public patients                   : IFamilyMember[] = [];
  public patientsSelected           : IFamilyMember = undefined;

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef       : MatDialogRef<DialogChangePlanComponent>;
  private routerService   : Router;

  //---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
  constructor(
    dr              : MatDialogRef<DialogChangePlanComponent>,
    rt              : Router,
    public dialog   : MatDialog,
    private ps      : PatientsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { 
    this.dialogRef      = dr;
    this.routerService  = rt; 

  }

  ngOnInit() {
    this.planSelected   = JSON.parse(localStorage.getItem("planSelected"));
    console.log(this.planSelected);
    
    this.currentSubscriptionInfo = this.data.subscriptionInfo;
    console.log(this.currentSubscriptionInfo);

    this.ps.GetChangeSubscriptionInfo(this.planSelected.OptionID).subscribe(resp => {
      this.SubscriptionChangeInfoDTO = resp;
      console.log(resp);

      if(this.planSelected.Name == "Family Subscription"){
        this.patients = this.currentSubscriptionInfo.AccountMembers;
      }
      this.isLoaded = true;
    });

    
  }

  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------

  public cmdConfirm_click()
  {
      let additionalData = {
          NextBillingDate : this.SubscriptionChangeInfoDTO.NextBillingDate,
          CostDifference : this.SubscriptionChangeInfoDTO.CostDifference,
          AdditonalFamilyMemberAmount : this.SubscriptionChangeInfoDTO.AdditonalFamilyMemberAmount,
      }
      this.dialogRef.close(additionalData);
  }

  public cmdCancel_click()
  {
      this.dialogRef.close();
  }

  public cmdIncreasePatientCount(event)
  {
    /*if(event.checked){
      this.patientsSelected++;
    }else{
      this.patientsSelected--;
    }*/
  }
}
