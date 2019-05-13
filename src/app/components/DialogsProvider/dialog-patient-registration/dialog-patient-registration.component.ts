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
  selector: 'app-dialog-patient-registration',
  templateUrl: './dialog-patient-registration.component.html',
  styleUrls: ['./dialog-patient-registration.component.css']
})
export class DialogPatientRegistrationComponent implements OnInit {
   //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef : MatDialogRef<DialogPatientRegistrationComponent>;

  constructor(dr: MatDialogRef<DialogPatientRegistrationComponent>) {
    this.dialogRef = dr;
   }

  ngOnInit() {
  }
  
  public Change(){
    this.dialogRef.close();
  }

}
