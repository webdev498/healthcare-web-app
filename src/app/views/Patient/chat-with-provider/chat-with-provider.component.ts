//---------------------------
// Libraries
//---------------------------
import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';

import * as moment                      from 'moment';


//---------------------------
// Router
//---------------------------
import { Router }                       from '@angular/router';
import { ActivatedRoute }               from '@angular/router';

//---------------------------
// Models
//---------------------------
import { ChatMessage }                  from '../../../models/chat-message.model';
import { User }                         from '../../../models/user.model';

//------------------------
// Services
//------------------------
import { SecurityService }              from '../../../services/security.service';
import { VisitService }                 from '../../../services/visit.service';
import { LogService }                   from '../../../core/services/log.service';
import { PatientsService }              from '../../../services/patients.service';

//------------------------
// Dialogs
//------------------------
import { MatDialog } 					from '@angular/material';
import { timer, Subscription }          from 'rxjs';


//declare function sendMessageP(message):any;
declare function sendMessageP(message):any;
declare function StartPatientVisit(txtFirstName, txtLastName, txtVisitID, txtReasonForVisit):any;
//declare function StartPatientVisit():any;

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-chat-with-provider',
  templateUrl: './chat-with-provider.component.html',
  styleUrls: ['./chat-with-provider.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ChatWithProviderComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public visitID           : string;
    public patientID         : string;
    public providerId        : string;
    public guardianID        : string;
    public reasonsForVisit   : string;
    public firstname         : string;
    public lastname          : string;
    public isLoaded          : boolean = false;
    public subscriptionTimer : Subscription;

    public providerName      : string;
    public providerAvatar    : string;


    public currentMessage    : string;
    public conversation      : ChatMessage[];
    public listMessage       : any[];

    public justUser          : User; 

    public counter           : number = 0;

    // variables para el scroll
    public sum               : number = 100;
    public throttle          : number = 100;
    public scrollDistance    : number = 2;    
    public scrollUpDistance  : number = 1.5;
    public direction         : string = '';
    public array             : any = [];

    // check typin
    public isTyping          : boolean = false;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;   
    private route           : ActivatedRoute;
    private logService      : LogService;

    private users           : User[];


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt : Router,
        ss : SecurityService,
        ar : ActivatedRoute,       
        ls : LogService,
        public dialog: MatDialog,
        private vs : VisitService,
        private ps : PatientsService
    )
    {
        // Models / Default Values
        this.currentMessage = "";
        this.conversation   = [];

        // Services
        this.routerService   = rt;
        this.securityService = ss;       
        this.logService      = ls;

        // Routes
        this.route = ar;

    }
    

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.patientID      = this.route.snapshot.paramMap.get('id');
        this.providerId     = this.route.snapshot.paramMap.get('providerId');
        this.visitID        = this.route.snapshot.paramMap.get('visitID');
        this.guardianID     = this.route.snapshot.paramMap.get('adultID');

        this.ps.GetProfile(this.patientID).subscribe(resp => {
            this.firstname = resp.FirstName;
            this.lastname = resp.LastName;

            this.vs.Visit(+this.visitID).subscribe(resp => {
                this.reasonsForVisit = resp.ReasonForVisit;
                this.providerName = resp.ProviderName;
                this.isLoaded = true;
                this.startVisit();
            });
        });

        const source = timer(60000, 61000);
        
        this.subscriptionTimer = source.subscribe(val =>{
            this.vs.PollVisitStatus(+this.visitID).subscribe(resp => {
                console.log(resp);

                if(resp.Message == "Provider Not Available"){
                    this.routerService.navigate(
                        [
                            '/home/patient-home/providers',
                            this.patientID,
                            this.guardianID,
                            "true"
                        ]
                    );
                }
                
            })

        } );
    }

    ngOnDestroy()
    {
        this.subscriptionTimer.unsubscribe();
    }


    startVisit()
    {
        StartPatientVisit(this.firstname, this.lastname, this.visitID, this.reasonsForVisit);
        //StartPatientVisit();
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public cmdBack_click()
    {
        this.routerService.navigate(['/home/patient-home/providers']);
    }

    public endSession()
    {
        sendMessageP("EndVisit");
        //sendMessageP("EndVisit");
    }

    public postVisit()
    {
        this.routerService.navigate(
            [
                '/home/patient-home/patient-post-visit',
                this.visitID
            ]);
    }

}
