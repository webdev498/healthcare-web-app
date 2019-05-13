import { Component, OnInit }  from '@angular/core';
//---------------------------
// Router
//---------------------------
import { Router }             from '@angular/router';
import { ActivatedRoute }     from '@angular/router';

//---------------------------
// Models
//---------------------------
import { getVisits }          from '../../../services/mockups/visits.mockup';
import { IVisits }            from '../../../models/interfaces/visits.interface';
import { ProvidersService }   from '../../../services/providers.service';
import { VisitService } from '../../../services/visit.service';
import { IVisit } from '../../../models/interfaces/visits/visit.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-patient-details',
  templateUrl: './provider-patient-details.component.html',
  styleUrls: ['./provider-patient-details.component.scss']
})
export class ProviderPatientDetailsComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Public Fields Section
  //---------------------------------------------------------------------------
  public visit      : IVisit;
  selected          = 0;
  public isLoad     : boolean = false;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private providerService: ProvidersService,
    private vs      : VisitService
  ) { }

  ngOnInit() {
    let visitId = +this.router.snapshot.paramMap.get('id');
    this.GetVisitDetail(visitId);
  }
  GetVisitDetail(visitId: number)
    {
        this.vs.Visit(visitId).subscribe(resp =>{
            this.visit = resp;
            this.isLoad = true;
            console.log(resp);            
        })
    }
  public back_click() {
    this.route.navigate(
      [
        '/home/provider-home/completed-visits/'
      ]
    );
  }

}
