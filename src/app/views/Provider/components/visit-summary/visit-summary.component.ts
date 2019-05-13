//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit, Input }  from '@angular/core';
import { Observable }         from 'rxjs';


//---------------------------
// Services
//---------------------------
import { ProvidersService }   from '../../../../services/providers.service';

//---------------------------
// Models
//---------------------------
import { IVisits }            from '../../../../models/interfaces/visits.interface';
import { VisitService }       from '../../../../services/visit.service';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-visit-summary',
  templateUrl: './visit-summary.component.html',
  styleUrls: ['./visit-summary.component.css']
})
export class VisitSummaryComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Public Fields Section
  //---------------------------------------------------------------------------
  
  @Input('visitID') visitID:number;
  visitDetail               : PatientVisitDTO;
  isLoad                    : boolean = false;

  constructor(
    private providerService: ProvidersService,
    private visitService   : VisitService
  ) { }

  ngOnInit() {        
      
    this.GetVisitDetails();
  }
  GetVisitDetails()
  {
    this.visitService.Visit(this.visitID).subscribe(resp=>{
      this.visitDetail = resp;
      this.isLoad            = true;
      console.log(resp);
      
    })
  }

}
