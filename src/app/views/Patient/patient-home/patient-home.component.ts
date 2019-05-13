//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }            from '@angular/router';
import { routerTransition }  from '../../../router.animations';


//---------------------------
// Services
//---------------------------
import { SecurityService }   from '../../../services/security.service';
import { LogService }        from '../../../core/services/log.service';


//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                            from '@angular/material';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-patient-home',
    templateUrl: './patient-home.component.html',
    styleUrls: ['./patient-home.component.scss'],
    animations: [ routerTransition ]
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientHomeComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public navButtons       : any[];


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    private logService      : LogService;
    private patientID       : number;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt : Router,
        ss : SecurityService,
        ls : LogService,
        public dialog: MatDialog
    )
    {
        // Services
        this.routerService   = rt;
        this.securityService = ss;
        this.logService      = ls;

        

    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        // User is Logged In?
        if (!this.securityService.isUserAuthenticated())
        {
            this.routerService.navigate(['/security/login']);
        }
        let factor = localStorage.getItem('authFactor');
        if(factor == 'false')
        {           
           this.routerService.navigate(['/security/authentication-factors']);
        }

        this.securityService.GetUserInfo("true").subscribe(resp => {
            // Navigation
            this.navButtons = [
                { 'navId' : 0, 'icon': 'local_hospital','text': 'Visits',     'buttonIsOn': false, 'pendings': 0 },
            ];

            if(!resp.IsPrivate ){
                this.navButtons.push(
                    { 'navId' : 2, 'icon': 'people',        'text': 'Family',     'buttonIsOn': false, 'pendings': 0 },
                );
            }

            this.navButtons.push(
                { 'navId' : 1, 'icon': 'reorder',       'text': 'My Medical Info',  'buttonIsOn': false, 'pendings': 0 },
                { 'navId' : 3, 'icon': 'settings',      'text': 'My Account',       'buttonIsOn': false, 'pendings': 0 }
            );
        })
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public navigationColumn_click(buttonId: number)
    {
        this.logService.logEvent(buttonId.toString());
        let userid = localStorage.getItem('userid');

        this.securityService.GetUserInfo('true',userid).subscribe(resp => {
            this.patientID = resp.PatientID;


            switch (buttonId)
        {
            case 0:
                this.routerService.navigate(['home/patient-home/visits']);
                break;
            case 1:
                this.routerService.navigate(['home/patient-home/patient-medical-info/',this.patientID,'false','-1']);
                break;
            case 2:
                this.routerService.navigate(['home/patient-home/patient-list-family-members']);
                break;
            case 3:
                this.routerService.navigate(['home/patient-home/patient-myaccount-tab',0]);
                break;
        }
        })
        

        
    }


    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public getState(outlet)
    {
        return outlet.activatedRouteData.state;
    }

}
