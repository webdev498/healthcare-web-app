//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { EventEmitter }                 from '@angular/core';
import { Output }                       from '@angular/core';
import { timer, Subscription }          from 'rxjs';

//---------------------------
// Router
//---------------------------
import { Router }                       from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }              from '../../../services/security.service';
import { UserService }                  from '../../../services/user.service';
import { PatientsService }              from '../../../services/patients.service';


//---------------------------
// Models
//---------------------------
import { User }                         from '../../../models/user.model';
import { UserInfoDto }                  from '../../../models/interfaces/useraccount/user-info-dto';
import { IProfile }                     from '../../../models/interfaces/patient/profile.interface';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog } 					from '@angular/material';
import { DialogCloseSessionComponent }  from '../../../components/Dialogs/dialog-close-session/dialog-close-session.component';
import { VisitService } from '../../../services/visit.service';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------

@Component({
  selector: 'app-patient-main',
  templateUrl: './patient-main.component.html',
  styleUrls: ['./patient-main.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientMainComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public state            : boolean = true;
    public userInfoDTO      : UserInfoDto = null;
    public patientInfo      : IProfile;
    public isLoaded         : boolean = false;
    public subscriptionTimer: Subscription = undefined;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    @Output() disableButtons = new EventEmitter();

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ss         : SecurityService,
        rt         : Router,
        private vs : VisitService,
        public dialog : MatDialog
    )
    {
        this.securityService = ss;
        this.routerService   = rt;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        if (this.securityService.isUserAuthenticated())
        {
            this.userInfoDTO = this.securityService.getCurrentUserApi();
            console.log(this.userInfoDTO);
            
            if(this.userInfoDTO){
                
                this.isLoaded = true;
            }else{
                const source = timer(500, 510);
        
                this.subscriptionTimer = source.subscribe(val =>{
                    this.userInfoDTO = this.securityService.getCurrentUserApi()
                    if(this.userInfoDTO)
                    {
                        this.isLoaded = true;  
                    }

                } );
            }
        }    
        
    }

    ngOnDestroy()
    {
        if(this.subscriptionTimer != undefined){
            this.subscriptionTimer.unsubscribe();
        }
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    onClick()
    {
        let loginID = this.securityService.getCurrentUserApi().LoginID;
        this.vs.GetRemainingVisitCount(loginID).subscribe(resp => {
            console.log(resp);
            
        })
        localStorage.setItem("disableButtons","true");
        this.routerService.navigate(
            [
              '/home/patient-home/patient-select/',
            ]
        );
    }

    onClickSelectPaymentPlan()
    {

        this.routerService.navigate(
            [
              '/security/self-paid/select-payment-plan',
            ]
        );
    }

    public onClickLogout()
    {
        let dialogRef = this.dialog.open(DialogCloseSessionComponent, {
            data: {
                
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.securityService.logout();
            }
            
        });
    }

}
