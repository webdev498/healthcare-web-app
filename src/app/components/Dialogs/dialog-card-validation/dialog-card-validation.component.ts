//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit, Inject }            from '@angular/core';

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

import { CreditCard }                from '../../../models/interfaces/credit-card';

@Component({
  selector: 'app-dialog-card-validation',
  templateUrl: './dialog-card-validation.component.html',
  styleUrls: ['./dialog-card-validation.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogCardValidationComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef     : MatDialogRef<DialogCardValidationComponent>;
  private routerService : Router;
  private credidCard    : CreditCard;

  //---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
  constructor(
    dr: MatDialogRef<DialogCardValidationComponent>,rt: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { 
    this.dialogRef = dr;
    this.routerService   = rt;    
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
      this.dialogRef.close(true);
  }


}
