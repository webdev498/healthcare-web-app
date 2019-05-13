import { Component, OnInit, Input,Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Patient }                  from '../../../../models/patient.model';
import { SecurityService }          from '../../../../services/security.service';
import { IPatientWaitInfoDTO } from '../../../../models/interfaces/visits/patientWaitInfoDTO.interface';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';

import { DndDropEvent, DropEffect } 		from 'ngx-drag-drop';
import { VisitService } from '../../../../services/visit.service';
import { DialogVoiceVisitRequestComponent } from '../../../../components/DialogsProvider/dialog-voice-visit-request/dialog-voice-visit-request.component';
import { DialogVoiceVisitWaitingComponent } from '../../../../components/DialogsProvider/dialog-voice-visit-waiting/dialog-voice-visit-waiting.component';
import { MatDialog } from '@angular/material';
import { DialogVideoVisitRequestComponent } from '../../../../components/DialogsProvider/dialog-video-visit-request/dialog-video-visit-request.component';
import { DialogVideoVisitWaitingComponent } from '../../../../components/DialogsProvider/dialog-video-visit-waiting/dialog-video-visit-waiting.component';

declare function StartPatientVisitQueue(providerID,patientName,patientLastName,token,currVisitId):any;
//,currVisitId
declare function sendMessage(message):any;

@Component({
  selector: 'app-provider-chat-patient',
  templateUrl: './provider-chat-patient.component.html',
  styleUrls: ['./provider-chat-patient.component.scss']
})
export class ProviderChatPatientComponent implements OnInit {
  @Input('patient') patient:PatientVisitDTO;
  @Output() endvisit = new EventEmitter<boolean>(); 
  providerId : number;
  token      : string = "";
  lastDropEvent: string = "";

  constructor(
    private ss: SecurityService,
    private vs: VisitService,
    public dialog: MatDialog,
  ) { 
    
  }

  ngOnInit() {
    let user          = this.ss.getCurrentUserApi();
    this.providerId   = user.ProviderID; 
    this.token        = localStorage.getItem('access_token');
   // this.loadScript('assets/js/Scripts/Provider.js');  
    StartPatientVisitQueue(user.ProviderID,this.patient.PatientFirstName,this.patient.PatientLastName,this.token,this.patient.VisitID); 
    console.log(this.patient);
    
  }
  onDragover(event:DragEvent) {
    
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop(event:DndDropEvent) {
  
    this.lastDropEvent = event.data;      
    sendMessage("ToIframe:"+ event.data); //,this.patient.VisitID
  }
  ngAfterViewInit(){
   /* let user          = this.ss.getCurrentUserApi();
    this.providerId   = user.ProviderID; 
    this.token        = localStorage.getItem('access_token');
    this.loadScript('assets/js/Scripts/Provider.js');*/
     
  }
  public loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
 EndOfVisit()
  {
    //this.endvisit.emit(true);
    sendMessage("EndVisit");    //, this.patient.VisitID
    
   /* let dialogRef = this.dialog.open(DialogEndVisitComponent, {
      data:{Name:this.patient.PatientFirstName},
      width:'700px'
                                
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result == true){  
        this.vs.ProviderEndVisit(this.patient.VisitID).subscribe(respE =>{
          console.log(respE);          
          
        });  
        this.endvisit = true;
      }      
    });  
   */
    //this.route.navigate(['/home/provider-chat/progress-encounter/end-visit-absence-note']);

  }
  postVisit()
  {
    this.vs.ProviderEndVisit(this.patient.VisitID).subscribe(respE =>{
      console.log(respE);          
      
    });  
    this.endvisit.emit(true);    
  }
  StartVideo()
  {
    sendMessage("StartVideo"); //, this.patient.VisitID
    /*let dialogRef = this.dialog.open(DialogVideoVisitRequestComponent, {
      data:{Name:this.patient.PatientFirstName},
      width:'700px'
                                
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result == true){        
        
        let dialogRef = this.dialog.open(DialogVideoVisitWaitingComponent, {
          data:{Name:this.patient.PatientFirstName},
          width:'700px'
                                    
        });
        sendMessage("StartVideo", this.patient.VisitID);
      }
      
    });  */
  }
  StartVoice()
  {
    sendMessage("StartAudio"); //, this.patient.VisitID
   /* let dialogRef = this.dialog.open(DialogVoiceVisitRequestComponent, {
      data:{Name:this.patient.PatientFirstName},
      width:'70%'
                                
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result == true){        
        
        let dialogRef = this.dialog.open(DialogVoiceVisitWaitingComponent, {
          data:{Name:this.patient.PatientFirstName},
          width:'70%'
                                    
        });
      }
      
    });  */
  }  

}
