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
  selector: 'app-dialog-end-video-request',
  templateUrl: './dialog-end-video-request.component.html',
  styleUrls: ['./dialog-end-video-request.component.css']
})
export class DialogEndVideoRequestComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogEndVideoRequestComponent>;

  constructor(dr: MatDialogRef<DialogEndVideoRequestComponent>,
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
