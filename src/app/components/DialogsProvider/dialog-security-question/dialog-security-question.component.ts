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
  selector: 'app-dialog-security-question',
  templateUrl: './dialog-security-question.component.html',
  styleUrls: ['./dialog-security-question.component.css']
})
export class DialogSecurityQuestionComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogSecurityQuestionComponent>;

  constructor(dr: MatDialogRef<DialogSecurityQuestionComponent>) {
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
