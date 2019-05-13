//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router, ActivatedRoute }       from '@angular/router';


import { MatTabChangeEvent }            from '@angular/material';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-myaccount-tab',
  templateUrl: './patient-myaccount-tab.component.html',
  styleUrls: ['./patient-myaccount-tab.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientMyaccountTabComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public tabIndex     : number;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        private rt : Router,
        private route	: ActivatedRoute,
    )
    {
    
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.tabIndex = +this.route.snapshot.paramMap.get('tabIndex');
        localStorage.setItem("tabIndex",this.tabIndex.toString());
    }

    public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        console.log(tabChangeEvent);
        this.tabIndex = tabChangeEvent.index;
        localStorage.setItem("tabIndex",this.tabIndex.toString());
    }

}
