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

@Component({
  selector: 'app-dialog-billing-policies',
  templateUrl: './dialog-billing-policies.component.html',
  styleUrls: ['./dialog-billing-policies.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogBillingPoliciesComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogBillingPoliciesComponent>;

  //---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
  constructor(dr: MatDialogRef<DialogBillingPoliciesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.dialogRef = dr;
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

}
