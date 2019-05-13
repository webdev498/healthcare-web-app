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
import { IGenericNameDescription }   from '../../../models/interfaces/patient/genericnamedescription.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-medication',
  templateUrl: './dialog-medication.component.html',
  styleUrls: ['./dialog-medication.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogMedicationComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public medicationName   : string;
    public medicationDesc   : string;
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogMedicationComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        dr: MatDialogRef<DialogMedicationComponent>
    )
    {
        this.dialogRef = dr;
    }

    //---------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.medicationName = this.data.Name;
        this.medicationDesc = this.data.Description;
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public saveMedication()
    {
        let medication : IGenericNameDescription = {
            Name :  this.medicationName,
            Description : this.medicationDesc
        }
        this.dialogRef.close(medication);
    }

    public closeDialog()
    {
        this.dialogRef.close();
    }
}
