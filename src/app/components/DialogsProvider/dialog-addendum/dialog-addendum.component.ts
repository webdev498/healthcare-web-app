//---------------------------
// Libraries
//---------------------------
import { Component, Inject }         from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Angular Material Table
//---------------------------
import { MatTableDataSource } 				from '@angular/material';


//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }           from "@angular/material";
import { MatDialogRef }              from "@angular/material";
import { IAddendum }                 from '../../../models/interfaces/addendum.interface';
import { IVisits }                   from '../../../models/interfaces/visits.interface';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-dialog-addendum',
  templateUrl: './dialog-addendum.component.html',
  styleUrls: ['./dialog-addendum.component.css']
})
export class DialogAddendumComponent implements OnInit {
   //---------------------------------------------------------------------------
  // Private Fields Section
  //---------------------------------------------------------------------------
  private dialogRef       : MatDialogRef<DialogAddendumComponent>;
  date                    : Date;
  diagnosis               : string="";

  addendumList			      : IAddendum[] = [];
  public dataSource		    : MatTableDataSource<IAddendum>;
	public displayedColumns = ['DoctorName'];

  constructor(dr: MatDialogRef<DialogAddendumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps: ProvidersService
  ) {
    this.dialogRef = dr;    
     
   }

  ngOnInit() {
    this.date = new Date();
    console.log(this.data);
    this.diagnosis = this.data.Text;
    
  }
  public cancel()
  {
    this.dialogRef.close();
  }
  public save()
  {  
      let result = {
        date: this.date,
        text: this.diagnosis
      }  
      
    this.dialogRef.close(result);
  }

}
