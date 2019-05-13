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
  selector: 'app-dialog-voice-visit-request',
  templateUrl: './dialog-voice-visit-request.component.html',
  styleUrls: ['./dialog-voice-visit-request.component.css']
})
export class DialogVoiceVisitRequestComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogVoiceVisitRequestComponent>;

  constructor(dr: MatDialogRef<DialogVoiceVisitRequestComponent>,
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
  
  public Save()
  {
    let save = true;
    this.dialogRef.close(save);
  }

}
