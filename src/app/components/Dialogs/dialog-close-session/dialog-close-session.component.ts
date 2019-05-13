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
  selector: 'app-dialog-close-session',
  templateUrl: './dialog-close-session.component.html',
  styleUrls: ['./dialog-close-session.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogCloseSessionComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogCloseSessionComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(dr: MatDialogRef<DialogCloseSessionComponent>)
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
    public closeSession()
    {
        this.dialogRef.close(true);
    }
    public closeDialog()
    {      
        this.dialogRef.close(false);
    }
}
