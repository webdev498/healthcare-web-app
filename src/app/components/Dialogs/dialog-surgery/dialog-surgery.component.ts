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
  selector: 'app-dialog-surgery',
  templateUrl: './dialog-surgery.component.html',
  styleUrls: ['./dialog-surgery.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogSurgeryComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public surgeryName : string;
    public surgeryDesc : string;
    public surgery     : IGenericNameDescription;
    
    
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogSurgeryComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        dr: MatDialogRef<DialogSurgeryComponent>,
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
        this.surgery = this.data;
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public saveSurgery()
    {
        this.surgery.Name = this.surgeryName;
        this.surgery.Description = this.surgeryDesc;

        this.dialogRef.close(this.surgery);
    }

    public closeDialog()
  	{      
      	this.dialogRef.close();
  	}

}
