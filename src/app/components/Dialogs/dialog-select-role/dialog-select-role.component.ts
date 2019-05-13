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
import { enumUserRole }              from '../../../models/enums/enumUserRole';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-select-role',
  templateUrl: './dialog-select-role.component.html',
  styleUrls: ['./dialog-select-role.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogSelectRoleComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogSelectRoleComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(dr: MatDialogRef<DialogSelectRoleComponent>)
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
    public makeMeAPatient()
    {
        this.dialogRef.close(enumUserRole.Patient);
    }

    //---------------------------------------------------------------------------
    public makeMeAProvider()
    {
        this.dialogRef.close(enumUserRole.Provider);
    }

    public closeDialog()
  	{      
      	this.dialogRef.close();
  	}

}
