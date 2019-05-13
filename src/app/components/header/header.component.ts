//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Library
//---------------------------
import { Component }                    from '@angular/core';
import { ViewChild }                    from '@angular/core';
import { OnInit }                       from '@angular/core';

//---------------------------
// Angular Material
//---------------------------
import { MatButton }                    from '@angular/material';

//---------------------------
// Models
//---------------------------
import { User }                         from '../../models/user.model';
import { Provider }                     from '../../models/provider.model';
import { enumUserRole }                 from '../../models/enums/enumUserRole';

//---------------------------
// Services
//---------------------------
import { SecurityService }              from '../../services/security.service';
import { LogService }                   from '../../core/services/log.service';
import { enumProviderAvailability }     from '../../models/enums/enumProviderAvailability';

//---------------------------
// Router
//---------------------------
import { Router }                       from '@angular/router';

// Dialogs
import { MatDialog }                    from '@angular/material';
import { DialogChangeRoleComponent }    from '../DialogsProvider/dialog-change-role/dialog-change-role.component';
import { DialogNoChangeRoleComponent }  from '../DialogsProvider/dialog-no-change-role/dialog-no-change-role.component';
import { DialogCloseSessionComponent }  from '../Dialogs/dialog-close-session/dialog-close-session.component';

import { ProvidersService }             from '../../services/providers.service';
import { timer, Subscription }          from 'rxjs';
import { UserInfoDto }                  from '../../models/interfaces/useraccount/user-info-dto';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class HeaderComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // ViewChild Section
    //---------------------------------------------------------------------------
    @ViewChild("cmdUserStatus")   cmdUserStatus   : MatButton;
    @ViewChild("cmdUserRole")     cmdUserRole     : MatButton;


    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public title            : string = 'app';
    public subscriptionTimer: Subscription;

    
    rols = [
        {value: 'provider', viewValue: 'Provider'},
        {value: 'patient', viewValue: 'Patient'}        
      ];
    selected = 'provider';
    isprovider : boolean;

    availables = [
        {value: 'available', viewValue: 'Available'},
        {value: 'notavailable', viewValue: 'Not Available'}        
      ];
     // selectedAv: string;
      selectedAv = (localStorage.getItem('available'))?'available':'notavailable';
    
    
    

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private securityService : SecurityService;
    private routerService   : Router;
    private logService      : LogService;
    user                    :UserInfoDto;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ss                      : SecurityService,
        rt                      : Router,
        ls                      : LogService,
        public dialog           : MatDialog,
        private providerService : ProvidersService
    )
    {
        // Services
        this.securityService = ss;
        this.routerService   = rt;
        this.logService      = ls;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        let isProvider = this.isProviderRole(); 

        if(isProvider){
            
            const source = timer(1000, 2000);
            let temp = 0;

            this.subscriptionTimer = source.subscribe(val =>{
                if(temp == 0)
                {
                   // user = this.securityService.getCurrentUserApi();
                    this.securityService.GetUserInfo('false').subscribe(resp =>{
                        this.user = resp;
                    })
                   // console.log(this.user);
                     
                }                               
                

                if(this.user != undefined && temp != 1)
                {
                    this.selectedAv = (localStorage.getItem('available'))?'available':'notavailable';                 
                    
                    
                    this.providerService.getStats(this.user.ProviderID).subscribe(resp =>{
                        if(resp != null)
                        {
                            if(resp.Available)
                            {
                                this.selectedAv = "available";
                            }
                            else
                            {
                                this.selectedAv = "notavailable";
                            }
                        }
                        
                    });
                    temp = 1;
                } 
            });
        }
    }

    ngOnDestroy()
    {
        let isProvider = this.isProviderRole(); 

        if(isProvider){
            this.subscriptionTimer.unsubscribe();            
        }
    }

    //---------------------------------------------------------------------------
    // Event Handlers Section
    //---------------------------------------------------------------------------
    // Status Menu:
    //---------------------------------------------------------------------------
    public cmdAvailable_click()
    {
        this.cmdUserStatus._elementRef.nativeElement.innerHTML = this.fixMenuHTML((<any>event.srcElement).innerText);

        this.logService.logEvent("El usuario está disponible!");

        (this.securityService.CurrentUser.Availability) == true;
    }

    //---------------------------------------------------------------------------
    public cmdUnavailable_click(event: Event)
    {
        console.log(event.srcElement);
        
        this.cmdUserStatus._elementRef.nativeElement.innerHTML = this.fixMenuHTML((<any>event.srcElement).innerText);

        this.logService.logEvent("El usuario no está disponible!");

        (this.securityService.CurrentUser).Availability == false;
    }

    //---------------------------------------------------------------------------
    // Role Menu:
    //---------------------------------------------------------------------------
    public cmdProvider_click(event: Event)
    {
        this.cmdUserRole._elementRef.nativeElement.innerHTML = this.fixMenuHTML((<any>event.srcElement).innerText);

        this.logService.logEvent("User Role is Provider");

        this.routerService.navigate(["/home/provider-home"]);
    }

    //---------------------------------------------------------------------------
    public cmdPatient_click(event: Event)
    {
        this.cmdUserRole._elementRef.nativeElement.innerHTML = this.fixMenuHTML((<any>event.srcElement).innerText);

        this.logService.logEvent("User Role is Patient");

        this.routerService.navigate(["/home/patient-home"]);
    }

    //---------------------------------------------------------------------------
    // Logout Action:
    //---------------------------------------------------------------------------
    public cmdLogout_click()
    {
        let dialogRef = this.dialog.open(DialogCloseSessionComponent, {           
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
              // let user = this.securityService.getCurrentUserApi();
               this.securityService.GetUserInfo('false').subscribe(resp =>{
                   this.user = resp;
               });

               if(this.user != undefined && this.user != null)
               {
                   this.providerService.Logout(this.user.ProviderID).subscribe(resp =>{             
                       if(resp.Message == "Error: See Payload")
                       {
                           alert(resp.Payload);
                          // this.securityService.logout();
                       }
                       else{
                         this.securityService.logout();
                       }
                       
                   });
               }else{
                   if(this.user == undefined){
                       this.securityService.logout();
                   }
               }
              
            }
            
        });        
    }
    
    changeRole()
    {               
        
        if(this.selectedAv == 'notavailable' && this.selected == 'patient')
        {
            let dialogRef = this.dialog.open(DialogChangeRoleComponent, {
                                
            });
            dialogRef.afterClosed().subscribe(result => {
                if(result != undefined)
                {
                    
                   // let user = this.securityService.getCurrentUserApi();
                   this.securityService.GetUserInfo('false').subscribe(resp =>{
                    this.user = resp;
                    })
                             
                    if(this.user != undefined && this.user != null)
                    {
                        this.providerService.Logout(this.user.ProviderID).subscribe(resp =>{             
                            if(resp.Message == "Error: See Payload")
                            {
                                alert(resp.Payload);                                
                            }
                            else{
                                if(result && localStorage.getItem('changeToPatient')== '1')    
                                {
                                    localStorage.setItem('authFactor','true');
                                    localStorage.setItem('role', '1');
                                    this.routerService.navigate(['/home/patient-home/patient-main/'])
                                }
                                else
                                {
                                   /* this.routerService.navigate(['/home/patient-home/patient-medical-info/',
                                    localStorage.getItem('userid')])*/
                                    localStorage.setItem('authFactor','true');
                                    localStorage.setItem('role', '1');
                                    this.routerService.navigate(['/home/patient-home/patient-main/'])
                                }   
                            }
                            
                        });
                    }
                    
                }
                             
              
            }); 
        }
        else{
            if(this.selectedAv == 'available' && this.selected == 'patient')
            {
                
                let dialogRef = this.dialog.open(DialogNoChangeRoleComponent, {
                                
                });
                dialogRef.afterClosed().subscribe(result => {
                    this.selected = 'provider';
                })
            }
            
        }
        
        
        
    }
    changeAvailability(ev)
    {
        //console.log(ev.value);   
       // let user = this.securityService.getCurrentUserApi();
        this.securityService.GetUserInfo('false').subscribe(resp =>{
            this.user = resp;
        })     
        if(ev.value == 'available')        {
            localStorage.setItem('available','true')
            this.providerService.setAvailable(true); 
            
            this.providerService.setStatus(this.user.ProviderID,true).subscribe(resp =>{
                console.log(resp);
                
            });           
        }
        else
        {
            localStorage.setItem('available','false')
            this.providerService.setAvailable(false); 
            this.providerService.setStatus(this.user.ProviderID,false)
            .subscribe(resp =>{
                console.log(resp);
                
            }); ;          
        }
    }


    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public isProviderRole() : boolean
    {
        let retVal: boolean = false;   
        let role = localStorage.getItem('role');

        if(role != undefined)
        {
            retVal = (+role == enumUserRole.Provider);// 
        }     
       
        return retVal;
    }

    public actionHome()
    {
        if (this.securityService.isUserAuthenticated())
        {
            let rol = localStorage.getItem('role');
            console.log(rol);
            
            if(rol == '3')
            {
                this.routerService.navigate(
                    [
                      '/home/patient-home/patient-main/',
                    ]
                )
            }
            if(rol == '2')
            {
                this.routerService.navigate(
                    [
                      '/home/provider-home/',
                    ]
                )
            }
            if(rol == '1')
            {
                this.routerService.navigate(
                    [
                        '/home/patient-home/patient-main/',
                    ]
                )
            }
           
        }else{
            this.routerService.navigate(
                [
                  '/security/login/',
                ]
            )
        }
        
    }

    //---------------------------------------------------------------------------
    public isBothRoles() : boolean
    {
        let retVal: boolean = false;
        if (this.securityService.CurrentUser)
        {
            retVal = ((this.securityService.CurrentUser.UserRole == enumUserRole.Both));
        }
        return retVal;
    }


    //---------------------------------------------------------------------------
    // Private Methods Section
    //---------------------------------------------------------------------------
    private fixMenuHTML(innerText: string) : string
    {
        let params = innerText.split(" ");

        let icon = params[0];
        let text = params[1];

        return `<span class="mat-button-wrapper">
                    <mat-icon _ngcontent-c1="" class="mat-icon material-icons" role="img" aria-hidden="true">
                        ${icon}
                    </mat-icon>
                    ${text}
                </span>

                <div class="mat-button-ripple mat-ripple" matripple="" ng-reflect-centered="false" ng-reflect-disabled="false" ng-reflect-trigger="[object HTMLButtonElement]">
                </div>
                <div class="mat-button-focus-overlay">
                </div>`;
    }

}
