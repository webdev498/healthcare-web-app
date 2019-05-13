//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';

//---------------------------
// Services
//---------------------------
import { SecurityService }   from './services/security.service';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class AppComponent
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private securityService     : SecurityService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ss: SecurityService
    )
    {
        this.securityService = ss;
    }


    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public showAppHeader() : boolean
    {
        return (!this.securityService.isUserAuthenticated());
       
       
       //return (!localStorage.getItem('isLoggedin'));
    }

    //---------------------------------------------------------------------------
    public showNotLoggedInHeader() : boolean
    {
        return (this.securityService.isUserAuthenticated());
    }
}
