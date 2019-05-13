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
import { SecurityService }      from '../../../services/security.service';
import { UserService }          from '../../../services/user.service';
import { VisitService }         from '../../../services/visit.service';
import { MessagingService }     from '../../../services/messaging.service';

//---------------------------
// Models
//---------------------------
import { AbsenceNoteDTO }       from '../../../models/interfaces/visits/absence-noteDTO.interface';
import {DomSanitizer, SafeResourceUrl}           from "@angular/platform-browser";
import { PatientVisitDTO }      from '../../../models/interfaces/visits/patient-visitDTO.interface';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientVisitDetailsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public visit			: PatientVisitDTO;
    public visitStatus      : string = "";
    public isLoaded			: boolean;
    public isLoaded1		: boolean;
    public visitAbsenceNotes: AbsenceNoteDTO[];
    public transcript       : any;
    public src              : SafeResourceUrl = "";

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private visitService    : VisitService;
    private messagingService: MessagingService;
    

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      	vs: VisitService,
		ms: MessagingService,
        private router: ActivatedRoute,
        private ar : ActivatedRoute,
        private domSanitizer : DomSanitizer
	)
    {
		// Services
        this.visitService    = vs;
        this.messagingService= ms;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.isLoaded = false;
        this.isLoaded1 = false;
        this.ar.queryParams.subscribe(params => {
            let visitId = +this.router.snapshot.paramMap.get('id');

            this.visitService.Visit(visitId).subscribe(result => {
                this.visit = result;
                console.log(this.visit);
                this.src = this.domSanitizer.bypassSecurityTrustResourceUrl('https://emd-chat.vertex.com/VisitTranscript.aspx?isMobile=false&token=12345&providerID='+this.visit.ProviderID+'&visitID='+visitId);
                console.log('https://emd-chat.vertex.com/VisitTranscript.aspx?isMobile=false&token=12345&providerID='+this.visit.ProviderID+'&visitID='+visitId);
                

                this.visitStatus = (this.visit.Status == "Incomplete") ? "Pending" : this.visit.Status;
                console.log(this.visitStatus);
                
                this.isLoaded = true;

                this.visitService.getVisitAbsenceNotes(visitId).subscribe(result => {
                    console.log(result);
                    
                    this.visitAbsenceNotes = result
                    this.isLoaded1 = true;
                });
            });
		
        });
        
      
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------    
    showLink(link : string)
    {
        window.open(link, "_blank");
    }

    getLink(){
        return this.src;        
    }
}
