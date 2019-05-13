//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit, Inject }            from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";


//---------------------------
// Services
//---------------------------
import { PatientsService }           from '../../../services/patients.service';


@Component({
	selector: 'app-dialog-cancel-plan',
	templateUrl: './dialog-cancel-plan.component.html',
	styleUrls: ['./dialog-cancel-plan.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogCancelPlanComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Public Fields Section
  //---------------------------------------------------------------------------
  public date       : string;
  public isLoaded   : boolean = false;


  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogCancelPlanComponent>;

  //---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
  constructor(dr: MatDialogRef<DialogCancelPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps : PatientsService
    )
  {
    this.dialogRef = dr;
  }

  ngOnInit() {
    //console.log(this.data.CurrentSubscriptionEndDate);

    this.ps.GetCancelSubscriptionDate().subscribe(resp => {
      this.date = resp.Payload;
      this.isLoaded = true;
    })
    
  }
  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  public closeDialog_click()
  {
      this.dialogRef.close();
  }
  
  public cancelPlan_click()
  {
      this.dialogRef.close(true);
  }

}
