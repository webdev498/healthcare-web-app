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
  selector: 'app-dialog-video-visit-error',
  templateUrl: './dialog-video-visit-error.component.html',
  styleUrls: ['./dialog-video-visit-error.component.css']
})
export class DialogVideoVisitErrorComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogVideoVisitErrorComponent>;

  constructor(dr: MatDialogRef<DialogVideoVisitErrorComponent>,
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
