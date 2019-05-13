//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router }                    from '@angular/router';
import { ActivatedRoute }            from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";

@Component({
  selector: 'app-dialog-deactivate-family-member',
  templateUrl: './dialog-deactivate-family-member.component.html',
  styleUrls: ['./dialog-deactivate-family-member.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogDeactivateFamilyMemberComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef     : MatDialogRef<DialogDeactivateFamilyMemberComponent>;
  private routerService : Router;

  //---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
  constructor(dr: MatDialogRef<DialogDeactivateFamilyMemberComponent>,rt: Router) {
    this.dialogRef      = dr;
    this.routerService  = rt; 
   }

  ngOnInit() {
  }
  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  public closeDialog()
  {      
      this.dialogRef.close();
  }

  public confirmRegistration()
  {
      let confirm = true;
      this.dialogRef.close(confirm);
  }

}
