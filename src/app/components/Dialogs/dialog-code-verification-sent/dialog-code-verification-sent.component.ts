//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                    from '@angular/router';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialogRef }              from "@angular/material";

//---------------------------
// Models/Enums
//---------------------------

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-code-verification-sent',
  templateUrl: './dialog-code-verification-sent.component.html',
  styleUrls: ['./dialog-code-verification-sent.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogCodeVerificationSentComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogCodeVerificationSentComponent>;
    private routerService   : Router;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      dr: MatDialogRef<DialogCodeVerificationSentComponent>,
      rt: Router,
    )
    {
        this.dialogRef = dr;
        this.routerService   = rt;
    }

    //---------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public closeDialog()
    {
        this.dialogRef.close();
    }
}

