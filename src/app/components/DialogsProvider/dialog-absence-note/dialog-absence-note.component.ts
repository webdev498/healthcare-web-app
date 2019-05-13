//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit, Inject }           from '@angular/core';


//---------------------------
// Angular Material Table
//---------------------------
import { MatTableDataSource }                 	from '@angular/material';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }          from "@angular/material";
import { MatDialogRef }             from "@angular/material";

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 			    		from '@angular/forms';
import { FormGroup } 			    			from '@angular/forms';
import { Validators } 			    		from '@angular/forms';



export interface AbsenceNote {
  PatientName : string;
  Date        : string;
  Recipient   : string;
}


@Component({
  selector: 'app-dialog-absence-note',
  templateUrl: './dialog-absence-note.component.html',
  styleUrls: ['./dialog-absence-note.component.css']
})
export class DialogAbsenceNoteComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
  private dialogRef         : MatDialogRef<DialogAbsenceNoteComponent>;
  public form	              : FormGroup; 
  public displayedColumns		: string[] = ['PatientName'];
  public notes              : string = "";
  public return             : string = "";
  public restriction        : string = "";
  public for                : string = "";
  public provider           : string = '';

  constructor(
    dr: MatDialogRef<DialogAbsenceNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  )
  {
    this.dialogRef = dr;
    this.createForm();
  }

  ngOnInit() {  
    console.log(this.data);
    if (this.data.provider != undefined) {
      this.provider = this.data.provider;
    }
          
    if(this.data.absenceNotes != undefined)
    {  
      console.log(this.data.absenceNotes);    
      this.return       = this.data.absenceNotes.ReturnText;
      this.restriction  = this.data.absenceNotes.RestrictionText;
      this.for          = this.data.absenceNotes.PatientName;
      this.provider     = this.data.absenceNotes.ProviderName;
    }   
       
    
  }
  //---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this.form = this.fb.group({
			'for'			      : [this.for, Validators.compose([Validators.required])],
      'return'		    : [this.return, Validators.compose([Validators.required])],
      'restriction'		: [this.restriction, Validators.compose([Validators.required])],
			//'notes'		    : ['', Validators.compose([Validators.required])],
			'provider'	    : [this.provider, Validators.compose([Validators.required])],

		});
	}
  cancel()
  {
    this.dialogRef.close();
  }
  save()
  {
    this.dialogRef.close(this.form);
  }

}
