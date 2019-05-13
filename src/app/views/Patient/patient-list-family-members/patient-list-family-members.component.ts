//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                        from '@angular/core';
import { OnInit }                           from '@angular/core';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                        from '@angular/material';

//---------------------------
// Router
//---------------------------
import { Router }                           from '@angular/router';
import { ActivatedRoute }                   from '@angular/router';

//---------------------------
// Services
//---------------------------
import { PatientsService }                  from '../../../services/patients.service';
import { IFamilyMember }                    from '../../../models/interfaces/patient/familymember.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-list-family-members',
  templateUrl: './patient-list-family-members.component.html',
  styleUrls: ['./patient-list-family-members.component.scss']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientListFamilyMembersComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public familyList       : IFamilyMember[];
    public familyCount      : number = 0;
    public isLoaded         : boolean = false;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    
    private color           : string = 'primary';


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      public dialog         : MatDialog,
      private routerService : Router,
      private ps            : PatientsService 
    )
    {
         
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {      
      this.ps.GetFamilyMemberList().subscribe(resp => {
        this.familyList = resp;
        this.familyCount = resp.length;
        console.log(resp);
        console.log(this.familyCount);

        this.isLoaded = true;
        
      });
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    showInfoMember(member : any)
    {
      console.log(member);
      
      if(member.IsPrivate){
        this.routerService.navigate(
          [
            'home/patient-home/patient-member-information-private/',
            member.DisplayName
          ]
        );
      }else{
        this.routerService.navigate(
          [
            'home/patient-home/patient-family-member-profile/',
            member.PatientID
          ]
        );
      }
    }

    
}
