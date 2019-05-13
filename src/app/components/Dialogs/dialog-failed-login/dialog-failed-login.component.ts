//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";

//---------------------------
// Models/Enums
//---------------------------

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-failed-login',
  templateUrl: './dialog-failed-login.component.html',
  styleUrls: ['./dialog-failed-login.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogFailedLoginComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogFailedLoginComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(dr: MatDialogRef<DialogFailedLoginComponent>)
    {
        this.dialogRef = dr;
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
    public blockUI()
    {
        this.dialogRef.close();
    }
    public closeDialog()
    {      
        this.dialogRef.close();
    }
}
