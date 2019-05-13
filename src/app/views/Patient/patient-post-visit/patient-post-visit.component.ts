//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }               from '@angular/router';
import { ActivatedRoute} 	    from '@angular/router';

//---------------------------
// Services
//---------------------------
import { VisitService }         from '../../../services/visit.service';
import { MessagingService }     from '../../../services/messaging.service';

//---------------------------
// Models
//---------------------------
import { PatientVisitSummaryDTO } from '../../../models/interfaces/patient/patient-visit-summaryDTO.interface';
import { AbsenceNoteDTO }       from '../../../models/interfaces/visits/absence-noteDTO.interface';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-post-visit',
  templateUrl: './patient-post-visit.component.html',
  styleUrls: ['./patient-post-visit.component.scss']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientPostVisitComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public visitID			: number;
    public showButton   	: boolean = false;
    public hideButton   	: boolean = false;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
		private router: Router,
		private rt: ActivatedRoute
	)
    {
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        let visitId = +this.rt.snapshot.paramMap.get('id');
        this.visitID = visitId;
        localStorage.setItem("disableButtons", "false");
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public viewVisitSummary(){
		this.router.navigate(
			[
			  '/home/patient-home/patient-visit-details',
			  this.visitID,
			]
		);
    }
  
    public goToSurvey(){
		  window.open("https://www.surveymonkey.com/r/MFJF85L", "_blank");
		  this.showButton = true;
		  this.hideButton = true;
    }
}
