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

@Component({
  selector: 'app-dialog-confirm-ecounter-notes',
  templateUrl: './dialog-confirm-ecounter-notes.component.html',
  styleUrls: ['./dialog-confirm-ecounter-notes.component.css']
})
export class DialogConfirmEcounterNotesComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogConfirmEcounterNotesComponent>;

  constructor(dr: MatDialogRef<DialogConfirmEcounterNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef = dr;
   }

  ngOnInit() {
  }
  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  public Close()
  {
    this.dialogRef.close();
  }

}
