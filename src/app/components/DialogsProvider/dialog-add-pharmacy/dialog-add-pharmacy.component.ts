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

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------

@Component({
  selector: 'app-dialog-add-pharmacy',
  templateUrl: './dialog-add-pharmacy.component.html',
  styleUrls: ['./dialog-add-pharmacy.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAddPharmacyComponent implements OnInit
{
	//---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public pharmacy		: string;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef 	: MatDialogRef<DialogAddPharmacyComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        dr: MatDialogRef<DialogAddPharmacyComponent>
    )
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
    public savePharmacy()
    {
        this.dialogRef.close(this.pharmacy);
    }

    cancel()
	{
	  this.dialogRef.close();
	}

}
