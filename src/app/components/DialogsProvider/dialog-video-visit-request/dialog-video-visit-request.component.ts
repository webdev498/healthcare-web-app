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
  selector: 'app-dialog-video-visit-request',
  templateUrl: './dialog-video-visit-request.component.html',
  styleUrls: ['./dialog-video-visit-request.component.css']
})
export class DialogVideoVisitRequestComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogVideoVisitRequestComponent>;

  constructor(dr: MatDialogRef<DialogVideoVisitRequestComponent>,
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
