//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit }                    from '@angular/core';

import * as moment                   from 'moment';


//---------------------------
// Router
//---------------------------
import { Router }                    from '@angular/router';
import { ActivatedRoute }            from '@angular/router';

//---------------------------
// Models
//---------------------------
import { ChatMessage }               from '../../../models/chat-message.model';
import { ApplozicMessageIncoming }   from '../../../models/interfaces/applozic-message-incoming.interface';
import { User }                      from '../../../models/user.model';

//------------------------
// Services
//------------------------
import { SecurityService }           from '../../../services/security.service';
import { GlobalsService }            from '../../../core/services/globals.service';
import { LogService }                from '../../../core/services/log.service';
import { forEach }                   from '@angular/router/src/utils/collection';

//------------------------
// Temporal Mockup Data
//------------------------
import * as users                    from '../../../services/mockups/users.mockup';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-chat-with-patient',
  templateUrl: './chat-with-patient.component.html',
  styleUrls: ['./chat-with-patient.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ChatWithPatientComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public patientId        : string;
    public patientName      : string;
    public patientAvatar    : string;

    public currentMessage   : string;
    public conversation     : ChatMessage[];
    public listMessage      : any[];

    public justUser         : User;

    public counter          : number = 0;

    // variables para el scroll
    public sum              : number = 100;
    public throttle         : number = 100;
    public scrollDistance   : number = 2;    
    public scrollUpDistance : number = 1.5;
    public direction        : string = '';
    public array            : any = [];

    // check typin
    public isTyping         : boolean = false;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private securityService : SecurityService;    
    private router          : Router;
    private route           : ActivatedRoute;
    private globalsService  : GlobalsService;
    private logService      : LogService;

    private users           : User[];


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt : Router,
        ss : SecurityService,
        ar : ActivatedRoute,        
        ls : LogService
    )
    {
        // Models / Default Values
        this.currentMessage = "";
        this.conversation   = [];

        // Services
        this.routerService   = rt;
        this.securityService = ss;        
        this.globalsService  = GlobalsService.getInstance();
        this.logService      = ls;

        // Mock Service Database
        this.users = users.getUsers();

        // Routes
        this.route = ar;
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.patientId     = this.route.snapshot.paramMap.get('id');
        this.patientName   = this.route.snapshot.paramMap.get('name');
        this.patientAvatar = this.route.snapshot.paramMap.get('avatar');

        if (this.globalsService.applozicMessages)
        {
            this.globalsService.applozicMessages
            .subscribe(
                (incomingData) => {     
                    this.registerIncomingMessage(incomingData);                    
                },
                (error) => {
                    this.logService.logError(error);
                }
            );
        }
        if(this.globalsService.applozicTypingStatus)
        {
            this.globalsService.applozicTypingStatus
            .subscribe(resp => {
                this.isTyping = true;
            },
            (error) => {
                this.logService.logError(error);
            }
        );
        }
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public cmdBack_click()
    {
        this.routerService.navigate(['/home/provider-home/patients']);
    }

    //---------------------------------------------------------------------------
    public cmdSendMessage_click()
    {
       
    }
    //---------------------------------------------------------------------------
    public getListMessage()
    {
        
    }

    //---------------------------------------------------------------------------
    public cmdSendAttachment_click(event)
    {
        
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public getMessageDirection(message: ChatMessage)
    {
       let retVal : string = "Outgoing"      
        
        if (message.FromUserId != this.securityService.CurrentUser.UserId)
        {
            retVal = "Incoming";
            this.justUser = this.users.find(
                o => (o.UserId == message.FromUserId)
            );            
        }

        return retVal;
    }

    //---------------------------------------------------------------------------
    public getStringTimeFromMilliseconds(milliseconds: number) : string
    {
        return moment(milliseconds).format('h:mm:ss a');
    }


    //---------------------------------------------------------------------------
    // Private Methods Section
    //---------------------------------------------------------------------------
    private registerIncomingMessage(incomingData: ApplozicMessageIncoming) : void
    {
        this.isTyping = false;
        //incomingData.message.substring(0, incomingData.message.indexOf(',')),
        this.conversation.unshift(
            new ChatMessage(
               incomingData.key,
               incomingData.timeStamp,
               incomingData.from,
               this.securityService.CurrentUser.UserId,
               incomingData.message
            )
        );

        this.logService.logEvent(
            `Message correctly received with key: ${incomingData.from}, message is: ${incomingData.message}`
        );
    }

    // Metodos para el scroll del chat

    onScrollDown () 
    {
       
    }
      
    onUp() 
    {
    
    }
}
