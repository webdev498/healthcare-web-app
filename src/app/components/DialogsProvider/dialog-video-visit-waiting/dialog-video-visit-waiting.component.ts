//---------------------------
// Libraries
//---------------------------
import { Component, Inject }    from '@angular/core';
import { OnInit }               from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }      from "@angular/material";
import { MatDialogRef }         from "@angular/material";

@Component({
  selector: 'app-dialog-video-visit-waiting',
  templateUrl: './dialog-video-visit-waiting.component.html',
  styleUrls: ['./dialog-video-visit-waiting.component.css']
})
export class DialogVideoVisitWaitingComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef: MatDialogRef<DialogVideoVisitWaitingComponent>;

  constructor(dr: MatDialogRef<DialogVideoVisitWaitingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef = dr;
  }

  ngOnInit() {
  }
  
  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  public Close() {
    this.dialogRef.close();
  }

}
