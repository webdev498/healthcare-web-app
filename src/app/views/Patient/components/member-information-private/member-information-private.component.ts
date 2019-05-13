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
import { ActivatedRoute }       from '@angular/router';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-member-information-private',
  templateUrl: './member-information-private.component.html',
  styleUrls: ['./member-information-private.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class MemberInformationPrivateComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public member   : string;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      rt: Router, 
      private routerActivate : ActivatedRoute
    )
    {
      this.routerService   = rt;   
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.member = this.routerActivate.snapshot.paramMap.get('name');
    }

    
}
