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
  selector: 'app-dialog-end-visit',
  templateUrl: './dialog-end-visit.component.html',
  styleUrls: ['./dialog-end-visit.component.css']
})
export class DialogEndVisitComponent implements OnInit {

  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogEndVisitComponent>;

  constructor(dr: MatDialogRef<DialogEndVisitComponent>,
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
