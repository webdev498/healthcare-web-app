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

//---------------------------
// Models
//---------------------------
import { IVisits }           from '../../../models/interfaces/visits.interface';
import { getVisits }         from '../../../services/mockups/visits.mockup';
import { IVisit } from '../../../models/interfaces/visits/visit.interface';
import { SecurityService } from '../../../services/security.service';
import { VisitService } from '../../../services/visit.service';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-my-incomplete-visits',
  templateUrl: './provider-my-incomplete-visits.component.html',
  styleUrls: ['./provider-my-incomplete-visits.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderMyIncompleteVisitsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public visitsIncomplete : IVisit[];
    public isLoad           : boolean = false;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      private router	: Router, 
      private ss      : SecurityService,
      private vs      : VisitService  
    )
    {

    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
      let vIncomplete = getVisits();     
      this.GetVisitList();

    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public selectVisit(item : IVisit)
    {
      this.router.navigate(
        [
          '/home/provider-home/my-incomplete-visits-details/',
          item.VisitID
        ]
      );
    }

     // Returns list of complete or incomplete visits for a specific provider or searches completed visits for all providers by patient name
     GetVisitList()
     {
       this.ss.GetUserInfo('false').subscribe(respU => {
         this.vs.ProviderVisits(respU.ProviderID,'false').subscribe(resp =>{
           this.isLoad            = true;
           this.visitsIncomplete 	= resp//new MatTableDataSource(resp);        
                      
         })
       })
     }

}
