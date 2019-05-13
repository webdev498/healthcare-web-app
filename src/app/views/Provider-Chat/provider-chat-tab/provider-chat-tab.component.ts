
import { Component, OnInit }          from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                     from '@angular/router';
import { ActivatedRoute }             from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

import { Consultation }               from '../../../models/consultation.model';
import { ConsultationsService }       from '../../../services/consultations.service';
import { SecurityService }            from '../../../services/security.service';
import { LogService }                 from '../../../core/services/log.service';
import { ProvidersService }           from '../../../services/providers.service';
import { Patient } from '../../../models/patient.model';
import { IPatientWaitInfoDTO } from '../../../models/interfaces/visits/patientWaitInfoDTO.interface';
import { VisitService } from '../../../services/visit.service';
import { PatientVisitDTO } from '../../../models/interfaces/visits/patient-visitDTO.interface';

declare function StartPatientVisitQueue(providerID,patientName,patientLastName,token,currVisitId):any;
declare function ViewVisitChat(providerID,patientName,patientLastName,token,currVisitId):any;

@Component({
  selector: 'app-provider-chat-tab',
  templateUrl: './provider-chat-tab.component.html',
  styleUrls: ['./provider-chat-tab.component.scss']
})
export class ProviderChatTabComponent implements OnInit {

  public consultations         : Consultation[] = [];
  public tabs                  : PatientVisitDTO[] = []; 
  public closetab              : boolean = false; 
  public patientWaiting        : number;
  public indexTab              : number;
  public visitIdTab            : number;
  

  constructor(
    private rt                   : Router,
    private consultationsService : ConsultationsService,
    private securityService      : SecurityService,
    private logService           : LogService,
    private activeroute          : ActivatedRoute,
    private providerservice      : ProvidersService,
    private visitService         : VisitService
  ) { }

  ngOnInit() {
    this.getPendingConsultations();
    // let value = JSON.parse( this.activeroute.snapshot.paramMap.get('id'));
    let visitId = +this.activeroute.snapshot.paramMap.get('id');
     console.log(visitId);     
     this.tabs = this.providerservice.getOpenChat();
     let ifVisit = this.tabs.find(x=>x.VisitID == visitId);     
     
     if(ifVisit == undefined)
     {
      this.Visit(visitId);
     }
     
    this.GetRemainingVisitCount();   
    
        let user = this.securityService.getCurrentUserApi();
        this.providerservice.getStats(user.ProviderID).subscribe(resp =>{
            this.patientWaiting = resp.PatientsWaiting;
        });    
    
  }
  CloseTab(event: any)
  {       
    this.closetab = true;
  }
  ChangeVisitId(ev)
  {
    this.visitIdTab = ev;
  }
  onLinkClick(event: MatTabChangeEvent)
  {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
    console.log(this.tabs[event.index]);
    this.indexTab = event.index;
    let visit = this.tabs[event.index];
    let user          = this.securityService.getCurrentUserApi();
    let providerId   = user.ProviderID; 
    let token        = '12345';//localStorage.getItem('access_token');
    localStorage.setItem('VisitID',visit.VisitID.toString());
   /* ViewVisitChat(user.ProviderID,visit.PatientFirstName,visit.PatientLastName, token,visit.VisitID);*/
    StartPatientVisitQueue(user.ProviderID,visit.PatientFirstName,visit.PatientLastName, token,visit.VisitID);
    
    
  }
  GetDisableButton(index: any,visitId:any)
  {
    let result: boolean = true;    
   
    if(this.closetab == true && (this.visitIdTab == visitId))
    {
      result = false;
    }
    
    
    return result;
  }
  GetRemainingVisitCount()
  {
    let loginid = localStorage.getItem('loginid');
    this.visitService.GetRemainingVisitCount(+loginid).subscribe(resp =>{
      console.log(resp);
      
    })
  }
  //Returns the details of a single visit
  public Visit(visitID : number)
  {
      this.visitService.Visit(visitID).subscribe(resp => {
        this.providerservice.setOpenChat(resp);  
    
        this.tabs = this.providerservice.getOpenChat();
        this.tabs = this.tabs.sort((x=>x.VisitID));
      })
  }
  backPatient()
  {
    this.rt.navigate(
      [
          '/home/provider-home/patients/'
      ]
    );
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
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

                  // Debug:
                 // this.startChat("emd-u005");
              },
              (error) => {
                  this.logService.logError(error);
              }
          );
      }
  }

}
