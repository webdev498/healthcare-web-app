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
  selector: 'app-dialog-voice-visit-waiting',
  templateUrl: './dialog-voice-visit-waiting.component.html',
  styleUrls: ['./dialog-voice-visit-waiting.component.css']
})
export class DialogVoiceVisitWaitingComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogVoiceVisitWaitingComponent>;

  constructor(dr: MatDialogRef<DialogVoiceVisitWaitingComponent>,
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
