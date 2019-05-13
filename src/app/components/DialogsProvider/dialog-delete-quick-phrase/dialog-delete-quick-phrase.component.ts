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
  selector: 'app-dialog-delete-quick-phrase',
  templateUrl: './dialog-delete-quick-phrase.component.html',
  styleUrls: ['./dialog-delete-quick-phrase.component.css']
})

export class DialogDeleteQuickPhraseComponent implements OnInit {

  private dialogRef : MatDialogRef<DialogDeleteQuickPhraseComponent>;


  constructor(
    dr: MatDialogRef<DialogDeleteQuickPhraseComponent>,
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
