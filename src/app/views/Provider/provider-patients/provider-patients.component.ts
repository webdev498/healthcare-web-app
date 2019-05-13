//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                        from '@angular/core';
import { OnInit }                           from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                           from '@angular/router';

//---------------------------
// Models
//---------------------------
import { Provider }                         from '../../../models/provider.model';
import { Consultation }                     from '../../../models/consultation.model';
import { enumProviderAvailability }         from '../../../models/enums/enumProviderAvailability';

//---------------------------
// Services
//---------------------------
import { ConsultationsService }             from '../../../services/consultations.service';
import { SecurityService }                  from '../../../services/security.service';
import { LogService }                       from '../../../core/services/log.service';
import { VisitService }                     from '../../../services/visit.service';
import { ProvidersService }                 from '../../../services/providers.service';

// Dialogs
import { MatDialog }                        from '@angular/material';
import { DialogSecurityQuestionComponent }  from '../../../components/DialogsProvider/dialog-security-question/dialog-security-question.component';


import { timer }                            from 'rxjs/observable/timer';
import { IPatientWaitListDTO }              from '../../../models/interfaces/visits/patientWaitListDTO.interface';
import { IPatientWaitInfoDTO }              from '../../../models/interfaces/visits/patientWaitInfoDTO.interface';
import { Subscription }                     from 'rxjs';




//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-provider-patients',
    templateUrl: './provider-patients.component.html',
    styleUrls: ['./provider-patients.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderPatientsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public consultations         : Consultation[];
    public vistited              = 0;
    public available             : boolean;
    public waitList              : IPatientWaitListDTO;
    public isload                : boolean = false;
    public subscriptionTimer     : Subscription;
    public waitSubscription      : Subscription;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService        : Router;
    private consultationsService : ConsultationsService;
    private securityService      : SecurityService;
    private logService           : LogService;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt                          : Router,
        cs                          : ConsultationsService,
        ss                          : SecurityService,
        ls                          : LogService,
        public dialog               : MatDialog,
        private visitService        : VisitService,
        private providerService     : ProvidersService
    )
    {
        // Default for Models
        this.consultations = [];

        // Services
        this.routerService        = rt;
        this.consultationsService = cs;
        this.securityService      = ss;
        this.logService           = ls;    

    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {             
        this.WaitingList();
        /*setInterval(()=>{
            this.WaitingList();
        },30000)*/  
        

        const waiting = timer(1000,30000)
        this.waitSubscription = waiting.subscribe(val =>{
            this.WaitingList();
        })
        
        const source = timer(1000, 2000);
        this.subscriptionTimer = source.subscribe(val =>{
            this.listenAvailability();    
        } );
        
        this.getPendingConsultations();
        this.securityService.GetUserInfo('false').subscribe(resp =>{           
            if(!resp.SecurityQuestionsComplete)
            {
                if(localStorage.getItem('visited') != '1')
                {
                    localStorage.setItem('selectedTabSettings','1');
                    setTimeout(() => this.securityQuestionDialog())
                }
            }             
            
        })
    }

    ngOnDestroy()
    {
        this.subscriptionTimer.unsubscribe();
    }

    public WaitingList()
    {       
        this.securityService.GetUserInfo("false").subscribe(respU =>{
            this.visitService.WaitList(respU.ProviderID).subscribe(resp =>{               
                this.waitList = resp;
                this.isload = true; 
                console.log(resp);               
                
            });            
        });       
        
    }


    public listenAvailability()
    {        
        this.securityService.GetUserInfo("false").subscribe(respU =>{
            this.providerService.getStats(respU.ProviderID).subscribe(resp =>{
                if(resp != null)
                {
                    this.available = resp.Available;
                }
                
            })         
        });       
        
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public liPatient_click(index: IPatientWaitInfoDTO)
    {
        this.startChat(index);        
    }
    /**
     * securityQuestionDialog
     */
    public securityQuestionDialog() {
        let dialogRef = this.dialog.open(DialogSecurityQuestionComponent, {
                                
          });
          dialogRef.afterClosed().subscribe(result => {
            localStorage.setItem('visited','1');
            localStorage.setItem('selectedTabSettings','1');               
            this.routerService.navigate(['/home/provider-home/settings/'])
          });  
    }


    //---------------------------------------------------------------------------
    public cmdChatWithPatient_click(index: IPatientWaitInfoDTO)
    {
        this.startChat(index);
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public isProviderAvailable() : string
    {
        let retVal : string = "";       
        
        retVal = (( localStorage.getItem('available')) ==
        'false'  ? "overlay-on" : "overlay-off");  
                       
        return retVal;
    }


    //---------------------------------------------------------------------------
    // Private Methods Section
    //---------------------------------------------------------------------------
    private startChat(patientWait: IPatientWaitInfoDTO) : void
    {
       
        localStorage.setItem('VisitId',JSON.stringify(patientWait.VisitID));
       
        this.routerService.navigate(
            [
                '/home/provider-chat/'
            ]
        );
    }

    //---------------------------------------------------------------------------
    private getPendingConsultations() : void
    {
        if (this.securityService.CurrentUser)
        {
            this.consultationsService.getPendingConsultations(
                this.securityService.CurrentUser.UserId
            )
            .subscribe(
                (data) => {
                    this.consultations = data;
                },
                (error) => {
                    this.logService.logError(error);
                }
            );
        }
    }
}
