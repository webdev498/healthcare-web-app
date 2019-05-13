//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';
import { MatTableDataSource }   from '@angular/material';

//---------------------------
// Router
//---------------------------
import { Router }               from '@angular/router';
import { IVisits }              from '../../../models/interfaces/visits.interface';
import * as visit               from '../../../services/mockups/visits.mockup';
import { count }                from '../../../../../node_modules/rxjs-compat/operator/count';
import { ProvidersService } from '../../../services/providers.service';
import { VisitService } from '../../../services/visit.service';
import { SecurityService } from '../../../services/security.service';
import { IVisit } from '../../../models/interfaces/visits/visit.interface';
import { UserInfoDto } from '../../../models/interfaces/useraccount/user-info-dto';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-completed-visits',
  templateUrl: './provider-completed-visits.component.html',
  styleUrls: ['./provider-completed-visits.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderCompletedVisitsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public visits           = visit.getVisits(); 
    public dataSource 		  : IVisit[];//MatTableDataSource<IVisit[]>;
    public displayedColumns = ['PatientName'];
    public from             : string = "";;
    public to               : string = "";;
    public isLoad           : boolean = false;
    public filterByName     : string = "";
    

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      private router	: Router, 
      private ps      : ProvidersService,
      private vs      : VisitService,
      private ss      : SecurityService
    )
    {

    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {         
      
      this.GetVisitList();             
    }

    public filterData(ev)
    {   
      console.log(ev.target.value);
      let value = ev.target.value;           
     
      if(value.length ==0)
      {
        this.GetVisitList();
      }
       
     /* let value = ev.target.value; 
      value = value.toUpperCase();     
     
      if(value.length >=1)
      {
        let newvisits = this.dataSource.filter(x => x.PatientFirstName.toUpperCase().includes(value));        
        
        this.dataSource 	= newvisits;//new MatTableDataSource(newvisits);
      
      }
      else
      {
        this.GetVisitList(); 
      }     */ 
      
    }
    filterDate()
    {
       
      let value = this.filterByName.toUpperCase();  
       console.log(this.filterByName);
       console.log(this.from);
       console.log(this.to);
       if(this.from == null)this.from = "";
       if(this.to == null)this.to = "";
       
       
       if(this.from != "" && this.to == "")
       {
         // here I filter by just one date
          let user: UserInfoDto; 
          let date = this.getDateString(this.from);          
          this.ss.GetUserInfo('false').subscribe(resp => {
            user = resp;
            this.vs.ProviderVisits(user.ProviderID, 'true', user.FirstName,date)
            .subscribe(resp => {    
              console.log(resp);
              this.dataSource = [];               
              this.dataSource 	= resp;
            });
          });        
       }

       if(this.from != "" && this.to != "")
       {
          let user: UserInfoDto; 
          let date = this.getDateString(this.from);
          let date2 = this.getDateString(this.to);
          this.ss.GetUserInfo('false').subscribe(resp => {
            user = resp;
            this.vs.ProviderVisits(user.ProviderID, 'true', user.FirstName,date,date2)
            .subscribe(resp => {                     
              console.log(resp);
              this.dataSource = [];
              this.dataSource 	= resp;
            });
          });   
       }  
       
        if(this.filterByName.length >=1 && this.from == "" && this.to == "")
        {
          console.log(this.from);
          console.log(this.to);
          let newvisits = this.dataSource.filter(x => x.PatientFirstName.toUpperCase().includes(value));        
          
          this.dataSource 	= newvisits;//new MatTableDataSource(newvisits);
        
        }
        else
        {
         // this.GetVisitList(); 
        } 
        
     
       
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    showVisitDatails_click(visitId: number) {
      this.router.navigate(
        [
          '/home/provider-home/provider-patient-details/',
          visitId
        ]
      );
    }
    // Returns list of complete or incomplete visits for a specific provider or searches completed visits for all providers by patient name
    GetVisitList()
    {
      this.ss.GetUserInfo('false').subscribe(respU => {
        this.vs.ProviderVisits(respU.ProviderID,'true').subscribe(resp =>{
         
          this.isLoad            = true;
          this.dataSource 	= resp;        
                    
        })
      })
    }

    getDateString(date : any) : string
    {
        let year = date.getFullYear(); //this will give you full year eg : 1990
        let day = date.getDate(); //gives you the date from 1 to 31
        let month = date.getMonth() + 1;
        return month.toString() + "/" + day.toString() + "/" + year.toString();
    }

}
