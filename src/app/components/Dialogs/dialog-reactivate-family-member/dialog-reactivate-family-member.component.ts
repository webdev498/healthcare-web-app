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
  selector: 'app-dialog-reactivate-family-member',
  templateUrl: './dialog-reactivate-family-member.component.html',
  styleUrls: ['./dialog-reactivate-family-member.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogReactivateFamilyMemberComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef     : MatDialogRef<DialogReactivateFamilyMemberComponent>;
  private routerService : Router;

  //---------------------------------------------------------------------------
  // Constructor Method Section
  //---------------------------------------------------------------------------
  constructor(dr: MatDialogRef<DialogReactivateFamilyMemberComponent>,rt: Router) {
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
