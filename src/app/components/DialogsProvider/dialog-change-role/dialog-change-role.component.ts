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
  selector: 'app-dialog-change-role',
  templateUrl: './dialog-change-role.component.html',
  styleUrls: ['./dialog-change-role.component.css']
})
export class DialogChangeRoleComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogChangeRoleComponent>;

  constructor(dr: MatDialogRef<DialogChangeRoleComponent>) {
    this.dialogRef = dr;
   }

  ngOnInit() {
  }
  
  public Change()
  {
    let change = true;
    this.dialogRef.close(change);
  }
  
  public Close()
  {
      this.dialogRef.close();
  }

}
