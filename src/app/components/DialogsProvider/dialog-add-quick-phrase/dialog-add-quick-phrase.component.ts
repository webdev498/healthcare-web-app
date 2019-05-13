//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                 from '@angular/core';
import { OnInit, Inject }            from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------

@Component({
  selector: 'app-dialog-add-quick-phrase',
  templateUrl: './dialog-add-quick-phrase.component.html',
  styleUrls: ['./dialog-add-quick-phrase.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAddQuickPhraseComponent implements OnInit
{
	//---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public phrase		    : string;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef 	: MatDialogRef<DialogAddQuickPhraseComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        dr: MatDialogRef<DialogAddQuickPhraseComponent>,
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
        if(Object.keys(this.data).length > 0)
        {
            this.phrase = this.data.phrase;
        }
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public save()
    {
        this.dialogRef.close(this.phrase);
    }

    public cancel()
	{
	  this.dialogRef.close();
	}

}
