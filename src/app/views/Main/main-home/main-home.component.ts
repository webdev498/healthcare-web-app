//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                    from '@angular/router';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                 from '@angular/material';
import { MatDialogConfig }           from '@angular/material';

import { DialogSelectRoleComponent } from '../../../components/Dialogs/dialog-select-role/dialog-select-role.component';

//---------------------------
// Models / Enums
//---------------------------
import { enumUserRole }              from '../../../models/enums/enumUserRole';

//---------------------------
// Services
//---------------------------
import { SecurityService }           from '../../../services/security.service';
import { LogService }                from '../../../core/services/log.service';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-root',
    templateUrl: './main-home.component.html',
    styleUrls: ['./main-home.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class MainHomeComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService       : Router;
    private securityService     : SecurityService;
    private logService          : LogService;

    private dialogRoleSelector  : MatDialog;

    private selectedRole        : enumUserRole;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt : Router,
        md : MatDialog,
        ss : SecurityService,
        ls : LogService
    )
    {
        // Services
        this.routerService       = rt;
        this.securityService     = ss;
        this.logService          = ls;

        // Dialog
        this.dialogRoleSelector  = md;

        // Default Values for Models
        this.selectedRole        = enumUserRole.Patient;
    }

    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        let role = localStorage.getItem('role');
        
        // Is User Logged In?
        /*   if (!this.securityService.isUserAuthenticated())
            {
                this.routerService.navigate(['/security/login']);
            }
        */
        //-----------------------------------------------------------------------
        // Determine Starting View based on User Role
        //-----------------------------------------------------------------------
        // If Provider, NOT a Patient -> Goes automatically to ProviderHome
       /* if ((this.securityService.CurrentUser) &&
            (this.securityService.CurrentUser.UserRole == enumUserRole.Provider))
        {
            this.routerService.navigate(['/home/provider-home']);
        }*/
        if(+role == enumUserRole.Provider )
        {
            this.routerService.navigate(['/home/provider-home']);

            this.securityService.GetUserInfo('false').subscribe(resp =>{
                this.securityService.setCurrentUserApi(resp);

                let availity = (resp.Availability) ? 'true' : 'false';
                localStorage.setItem('available',availity);
            })
        }

        // If Patient, NOT a Provider -> Goes automatically to PatientHome
       /* if ((this.securityService.CurrentUser) &&
            (this.securityService.CurrentUser.UserRole == enumUserRole.Patient))
        {
            this.routerService.navigate(['/home/patient-home']);
        }*/
        if(+role == enumUserRole.Patient )
        {
            this.routerService.navigate(['/home/patient-home']);

            this.securityService.GetUserInfo('true').subscribe(resp =>{
                this.securityService.setCurrentUserApi(resp);

                let availity = (resp.Availability) ? 'true' : 'false';
                localStorage.setItem('available',availity);
            })
        }

        // If Patient AND Provider -> Let user select what he wants to do
       /* if ((this.securityService.CurrentUser) &&
            (this.securityService.CurrentUser.UserRole == enumUserRole.Both))
        {
            this.openRoleSelector();
        }*/
        if(+role == enumUserRole.Both )
        {
            let factor = localStorage.getItem('authFactor');
            if(factor == 'false')
            {
                this.openRoleSelector();
            }
           
        }

        // If NEITHER Patient NOR Provider -> Log Error, something is seriusly wrong...
       /* if ((this.securityService.CurrentUser) &&
            (this.securityService.CurrentUser.UserRole == enumUserRole.None))
        {
            this.logService.logError("User has no role!")
        }*/
        if(+role == enumUserRole.None)
        {
            this.logService.logError("User has no role!")
        }
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public showAppHeader() : boolean
    {
        return (!this.securityService.isUserAuthenticated());      
       
       //return (!localStorage.getItem('isLoggedin'));
    }
    public openRoleSelector() : void
    {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        setTimeout(() => {
            let ref = this.dialogRoleSelector.open(DialogSelectRoleComponent, dialogConfig);

            ref.afterClosed().subscribe(
                (data) => {
                    if (data == enumUserRole.Provider)
                    {
                        localStorage.setItem('role', '2');
                        this.securityService.GetUserInfo('false').subscribe(resp =>{
                            this.securityService.setCurrentUserApi(resp);

                            let availity = (resp.Availability) ? 'true' : 'false';
                            localStorage.setItem('available',availity);
                            console.log(availity);
                        })
                        this.routerService.navigate(['/home/provider-home']);
                        
                    }
                    else if (data == enumUserRole.Patient)
                    {
                        localStorage.setItem('role', '1');
                        this.securityService.GetUserInfo('true').subscribe(resp =>{
                            this.securityService.setCurrentUserApi(resp);
                            
                            let availity = (resp.Availability) ? 'true' : 'false';
                            localStorage.setItem('available',availity);
                        })
                        this.routerService.navigate(['/home/patient-home']);
                        
                    }
                }
            );
        },1);
    }
}
