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
  selector: 'app-dialog-no-change-role',
  templateUrl: './dialog-no-change-role.component.html',
  styleUrls: ['./dialog-no-change-role.component.css']
})
export class DialogNoChangeRoleComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogNoChangeRoleComponent>;

  constructor(dr: MatDialogRef<DialogNoChangeRoleComponent>) {
    this.dialogRef = dr;
   }

  ngOnInit() {
  }
  
  public Change(){
    this.dialogRef.close();
  }

  public cancel() {
		this.dialogRef.close();
	}

}
