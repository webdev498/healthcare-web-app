//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                                from '@angular/core';
import { OnInit }                                   from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                                   from '@angular/router';
import { ActivatedRoute}                            from '@angular/router';
import {MatSnackBar}                                from '@angular/material';

//---------------------------
// services
//---------------------------
import { UserService }                              from '../../../../services/user.service';
import { PatientsService }                          from '../../../../services/patients.service';
import { SecurityService }                          from '../../../../services/security.service';


//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                                from '@angular/material';
import { DialogMyaccountMoreInformationComponent }  from '../../../../components/Dialogs/dialog-myaccount-more-information/dialog-myaccount-more-information.component';
import { DialogPlanMakePrivateComponent }           from '../../../../components/Dialogs/dialog-plan-make-private/dialog-plan-make-private.component';
import { DialogDeactivateFamilyMemberComponent }    from '../../../../components/Dialogs/dialog-deactivate-family-member/dialog-deactivate-family-member.component';
import { DialogReactivateFamilyMemberComponent }    from '../../../../components/Dialogs/dialog-reactivate-family-member/dialog-reactivate-family-member.component';
import { DialogRemoveFamilyMemberComponent }        from '../../../../components/Dialogs/dialog-remove-family-member/dialog-remove-family-member.component';
import { IFamilyMember }                            from '../../../../models/interfaces/patient/familymember.interface';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.css']
})
export class ManageSubscriptionComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public patientName      : string;
    public patientID        : string;
    public deactivated      : boolean;
    public reactivated      : boolean;
    public showOptions      : boolean = false;
    public error            : string;
    public showError        : boolean = false
    public currentMail      : string = "";

    public patients			: IFamilyMember[];
    public primaryId        : number;
    public isPrivate        : string;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
		rt: Router,
        public dialog          : MatDialog,
        private routerActivate : ActivatedRoute,
        private ps             : PatientsService,
        public snackBar        : MatSnackBar
    )
    {
        this.routerService   = rt;
    }

	ngOnInit() {
        this.patientName = this.routerActivate.snapshot.paramMap.get('name');
        this.patientID = this.routerActivate.snapshot.paramMap.get('userId');
        this.primaryId     = +this.routerActivate.snapshot.paramMap.get('primaryId');
        this.isPrivate     = this.routerActivate.snapshot.paramMap.get('isPrivate');
        
        this.deactivated   = (this.routerActivate.snapshot.paramMap.get('isActive') == "true")
            ? false
            : true;

        this.reactivated = (this.deactivated) ? true : false;
        
        this.ps.GetProfile(this.patientID).subscribe(resp => {
            this.currentMail = resp.Email;
        });
   }

    cmdMakePrivate_click()
    {
        if(this.isPrivate != "true"){
            let dialogRef = this.dialog.open(DialogPlanMakePrivateComponent, {
                data: {
                    familyMemberPatientID   : this.patientID,
                    name  : this.patientName
                },
                width : "750px",
                });
                dialogRef.afterClosed().subscribe(result => {
                    this.backManageMembers()
                });
        }
        
    }


    cmdDeactivateFamily_click()
    {
        let dialogRef = this.dialog.open(DialogDeactivateFamilyMemberComponent, {
            
            width : "750px",
            });
            dialogRef.disableClose = true;
            dialogRef.afterClosed().subscribe(result => {
                console.log(result);
                
                if(result != undefined)
                {
                    this.ps.DeactivateFamilyMember(+this.patientID).subscribe(resp=>{
                        console.log(resp);

                        if(resp.Message == "Success"){
                            //this.deactivated = result;
                            //this.reactivated = true;
                            this.snackBar.open(resp.Message, "Okay", {
                                duration: 3000,
                            });
                            this.backManageMembers();
                        }else{
                            this.error = resp.Message;
                            this.showError = true;
                        }
                    });  
                }
            });
    }

    cmdRemoveFamily_click()
    {
        let dialogRef = this.dialog.open(DialogRemoveFamilyMemberComponent, {
            data: {
                isPrivate   : this.isPrivate,
                mail        : this.currentMail,
                patientId   : this.patientID
            },
            width : "750px",
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result != undefined){
                    console.log(result);
                    
                    let newEmail = (result.newEmail !== "") ? "true" : "false";
                    let mail = (result.newEmail !== "") ? result.newEmail : this.currentMail;
                    console.log(newEmail);
                    console.log(mail);

                    this.ps.RemoveFamilyMember(+this.patientID,mail, newEmail).subscribe(resp => {
                        console.log(resp);

                        if(resp.Message == "Success"){
                            this.backManageMembers();
                        }else{
                            this.error = resp.Message;
                            this.showError = true;
                        }
                    })
                }
            });
        
    }
    getFamilyList()
	{
		this.ps.GetFamilyMemberList().subscribe(resp=>{
            this.patients = resp;
            this.userDeactivated();		
			
		})
	}
    userDeactivated()
    {
       // let patiens = this.us.getPatiens();
        let user = this.patients.find(x=>x.PatientID == +this.patientID);
        if(user != null)
        {
            if(!user.IsActive)
            {
                this.deactivated = true;
                this.reactivated = true;
            }
            else{
                this.deactivated = false;
                this.reactivated = false;
            }
        }               
               
    }

	showMoreInformationDialog()
    {
      let dialogRef = this.dialog.open(DialogMyaccountMoreInformationComponent, {
        data: {
            animal: ''
        },
        width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    backManageMembers()
    {
        let tabIndex = localStorage.getItem("tabIndex");
        this.routerService.navigate([
           '/home/patient-home/patient-myaccount-tab/'+tabIndex 
        ]);
    }

    
    
    cmdReactivateFamily_click()
    {
        let dialogRef = this.dialog.open(DialogReactivateFamilyMemberComponent, {
            width : "750px",
        });
        dialogRef.disableClose = true;
        
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined){
                this.ps.ReactivateFamilyMember(+this.patientID)
                    .subscribe(resp=>{
                        console.log(resp); 
                        
                        if(resp.Message.includes("Success") ){
                            this.deactivated = false;
                            this.reactivated = false;
                        }else{
                            this.error = resp.Message;
                            this.showError = true;
                        }
                });
            }
        });
        
    }


    cmdShowOptions_click()
    {
        this.showOptions = true;
    }
}
