//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit, Inject }           from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }          from "@angular/material";
import { MatDialogRef }             from "@angular/material";

@Component({
  selector: 'app-dialog-delete-primary-care-provider',
  templateUrl: './dialog-delete-primary-care-provider.component.html',
  styleUrls: ['./dialog-delete-primary-care-provider.component.css']
})
export class DialogDeletePrimaryCareProviderComponent implements OnInit {

  private dialogRef : MatDialogRef<DialogDeletePrimaryCareProviderComponent>;


  constructor(
    dr: MatDialogRef<DialogDeletePrimaryCareProviderComponent>,
  ) 
  {
    this.dialogRef = dr;
  }

  ngOnInit() {
  }

  public confirm()
	{
		this.dialogRef.close(true);
	}
  
  public cancel()
	{
		this.dialogRef.close();
	}
}
