//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, Inject }         from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";

//---------------------------
// INTERFACES
//---------------------------
import { IGenericNameDescription }  from '../../../models/interfaces/patient/genericnamedescription.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-allergy',
  templateUrl: './dialog-allergy.component.html',
  styleUrls: ['./dialog-allergy.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAllergyComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef   : MatDialogRef<DialogAllergyComponent>;
    public name         : string;
    public description  : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(dr: MatDialogRef<DialogAllergyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.dialogRef = dr;
    }

    //---------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.name = this.data.Name;
        this.description = this.data.Description;
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public saveAllergy()
    {
        let allergy : IGenericNameDescription = {
            Name : this.name,
            Description : this.description
        }
        this.dialogRef.close(allergy);
    }
    public closeDialog() {
		this.dialogRef.close();
	}
}
