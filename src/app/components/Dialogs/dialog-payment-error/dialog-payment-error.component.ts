//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }        from '@angular/core';
import { OnInit, Inject }   from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }  from "@angular/material";
import { MatDialogRef }     from "@angular/material";


@Component({
  selector: 'app-dialog-payment-error',
  templateUrl: './dialog-payment-error.component.html',
  styleUrls: ['./dialog-payment-error.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogPaymentErrorComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef: MatDialogRef<DialogPaymentErrorComponent>;

  //---------------------------------------------------------------------------
  // Constructor Method Section
  //---------------------------------------------------------------------------
  constructor(dr: MatDialogRef<DialogPaymentErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef = dr;
  }

  ngOnInit() {
  }
  
  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  public closeDialog() {
    this.dialogRef.close();
  }
}
