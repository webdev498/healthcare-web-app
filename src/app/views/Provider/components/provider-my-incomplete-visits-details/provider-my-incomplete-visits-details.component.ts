//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         				        from '@angular/core';
import { OnInit }            				        from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }            				        from '@angular/router';
import { ActivatedRoute }            				from '@angular/router';


//---------------------------
// Dialog
//---------------------------
import { MatDialog }		 				        from '@angular/material';

//---------------------------
// Services
//---------------------------
import { SecurityService }   				        from '../../../../services/security.service';
import { GlobalsService }    				        from '../../../../core/services/globals.service';
import { LogService }        				        from '../../../../core/services/log.service';
import { UserService }       				        from '../../../../services/user.service';

//---------------------------
// Models
//---------------------------
import { IVisits } 									from '../../../../models/interfaces/visits.interface';
import { getVisits } 								from '../../../../services/mockups/visits.mockup';
import { IVisit } from '../../../../models/interfaces/visits/visit.interface';
import { VisitService } from '../../../../services/visit.service';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-my-incomplete-visits-details',
  templateUrl: './provider-my-incomplete-visits-details.component.html',
  styleUrls: ['./provider-my-incomplete-visits-details.component.scss']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderMyIncompleteVisitsDetailsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public visitData		: IVisit;
    public visits			: IVisit[];
    public isLoad           : boolean = false;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;    
    private securityService : SecurityService;
    private globalsService  : GlobalsService;
    private logService      : LogService;
	private userService     : UserService;
	
	private route           : ActivatedRoute;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
		rt              : Router,
		ar              : ActivatedRoute,
      	ss              : SecurityService,
      	ls              : LogService,
		us              : UserService,
        public dialog	: MatDialog,
        private vs      : VisitService
	)
    {
		// Services
		this.securityService = ss;
		this.routerService   = rt;
		this.logService      = ls;
		this.globalsService  = GlobalsService.getInstance();
		this.userService     = us;

		this.route 			 = ar; 
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {		
        let visitId = +this.route.snapshot.paramMap.get('id');
        this.GetVisitDetail(visitId);		
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	addPhrase()
	{
		
	}

	editPhrase(phrase : string)
	{
		
    }
    GetVisitDetail(visitId: number)
    {
        this.vs.Visit(visitId).subscribe(resp =>{
            this.visitData = resp;
            this.isLoad = true;
            console.log(resp);            
        })
    }

	back()
	{
		this.routerService.navigate(
            [
                '/home/provider-home/my-incomplete-visits'
            ]
        );
	}
}
