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
import { ProvidersService } from '../../../services/providers.service';

import { timer, Subscription }            from 'rxjs';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-provider-home',
    templateUrl: './provider-home.component.html',
    styleUrls: ['./provider-home.component.scss'],
    animations: [ routerTransition ]
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderHomeComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public navButtons       : any[];
    public providerId       : number;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;
    private logService      : LogService;
    public subscriptionTimer: Subscription;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt : Router,
        ss : SecurityService,
        ls : LogService,
        private ps: ProvidersService
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
        else
        {
            this.NavigationBar();
            const source = timer(1000, 30000); 
            this.subscriptionTimer = source.subscribe(val =>{
            this.NavigationBar()
        });
          //  setInterval(()=>{this.NavigationBar()},30000);
        }
        
    }
    public NavigationBar()
    {
        this.getProviderId();
            let incompleteVisit: number; 
            let patientWaiting: number;
            this.securityService.GetUserInfo('false').subscribe(respU => {
                console.log(respU);
                this.ps.getStats(respU.ProviderID).subscribe(resp =>{
                    console.log(resp);
                    if(resp != null)
                    {
                        incompleteVisit = resp.IncompleteVisits;
                        patientWaiting =  resp.PatientsWaiting
                    }                    
                    
                   
                    // Navigation
            this.navButtons = [
                { 'navId' : 0, 'icon': 'people',         'text': 'Active Visits',             'buttonIsOn': false, 'pendings': patientWaiting },
                { 'navId' : 1, 'icon': 'local_hospital', 'text': 'Completed Visits',     'buttonIsOn': false, 'pendings': 0 },
                { 'navId' : 2, 'icon': 'local_hospital', 'text': 'My Incomplete Visits', 'buttonIsOn': false, 'pendings': incompleteVisit },
                { 'navId' : 3, 'icon': 'settings',       'text': 'Settings',             'buttonIsOn': false, 'pendings': 0 }
            ];                
                });
            });
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public navigationColumn_click(buttonId: number)
    {
        this.logService.logEvent(buttonId.toString());

        switch (buttonId)
        {
            case 0:
                this.routerService.navigate(['home/provider-home/patients']);
                break;
            case 1:
                this.routerService.navigate(['home/provider-home/completed-visits']);
                break;
            case 2:
                this.routerService.navigate(['home/provider-home/my-incomplete-visits']);
                break;
            case 3:
                this.routerService.navigate(['home/provider-home/settings']);
                break;
        }
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public getState(outlet)
    {
        return outlet.activatedRouteData.state;
    }

    //---------------------------------------------------------------------------
    public getProviderId()
    {
        let retVal : number;
       
        this.securityService.GetUserInfo('false').subscribe(resp =>{
            this.providerId = resp.ProviderID;           
            
        })

       // return retVal;
    }
    ngOnDestroy()
    {         
        this.subscriptionTimer.unsubscribe();       
    }

}
