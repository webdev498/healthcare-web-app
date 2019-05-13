//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit, Input }           	from '@angular/core';


//---------------------------
// Angular Material Table
//---------------------------
import { MatTableDataSource }                 	from '@angular/material';

//---------------------------
// Dialog
//---------------------------
import { MatDialog }                          	from '@angular/material';
import { DialogAbsenceNoteComponent } 					from '../../../../components/DialogsProvider/dialog-absence-note/dialog-absence-note.component';

//---------------------------
// Services
//---------------------------
import { ProvidersService } 					from '../../../../services/providers.service';
import { VisitService } from '../../../../services/visit.service';
import { AbsenceNoteDTO } from '../../../../models/interfaces/visits/absence-noteDTO.interface';
import { UserInfoDto } from '../../../../models/interfaces/useraccount/user-info-dto';
import { SecurityService } from '../../../../services/security.service';


export interface AbsenceNote {
  PatientName : string;
  Date        : string;
  Recipient   : string;
}

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-absence-note',
  templateUrl: './absence-note.component.html',
  styleUrls: ['./absence-note.component.scss']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class AbsenceNoteComponent implements OnInit {
	//---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public absence       		: boolean;
	public absenceNotes  		: AbsenceNote[] = [];
	public dataSource 			: AbsenceNoteDTO[];//MatTableDataSource<AbsenceNote>;
	public displayedColumns		: string[] = ['PatientName'];

	@Input('visitId') visitId: number;
	
	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		public dialog						: MatDialog,
		private providerService				: ProvidersService,
		private vs 							: VisitService,
		private ss							: SecurityService
	) { }

	//---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
	ngOnInit() {
		//this.dataSource = new MatTableDataSource(this.absenceNotes);
		this.absence 	= (this.absenceNotes.length > 0) ? false : true;
		this.GetListAbsenNotes();
	}

	//---------------------------------------------------------------------------
    // Event Handler Methods Section
		//---------------------------------------------------------------------------
	GetListAbsenNotes()
	{
			this.vs.getVisitAbsenceNotes(this.visitId).subscribe(resp =>{
				this.dataSource = resp;
				console.log(resp);
				
			});
	}	

	public absenseNote()
	{
		let user:UserInfoDto;
		this.ss.GetUserInfo('false').subscribe(resp=>{
			user = resp;
			console.log(resp);
			let dialogRef = this.dialog.open(DialogAbsenceNoteComponent, {
				width: '50%',
				data:{provider: user.FirstName}		                          
				});
				
				dialogRef.afterClosed().subscribe((result) => {
					if(result != undefined)
					{
						if(result.controls.for.status != "INVALID")
						{
							let absenNote:AbsenceNoteDTO = {
								AbsenceNoteID 	: 0,
								VisitID       	: this.visitId,
								PatientName   	: result.value.for,
								ReturnText 		: result.value.return,
								RestrictionText : result.value.restriction,
								ProviderName  	: result.value.provider,
								TimeEntered   	: '',
								Link          	: ''
		
							}
							console.log(absenNote);
							
							this.vs.UpdateVisitAbsencesNote(absenNote).subscribe(resp =>{
								console.log(resp);
								this.GetListAbsenNotes();
								
							});					
							
						}
					}        
					
					
				}); 
		})
		
	}
	public showDatails_click(absen: AbsenceNoteDTO)
	{
		let dialogRef = this.dialog.open(DialogAbsenceNoteComponent, {
			
			data: { absenceNotes: absen }                            
			});
			
			dialogRef.afterClosed().subscribe((result) => {
				if(result != undefined)
				{
					if(result.controls.for.status != "INVALID")
					{
						console.log(result);
						absen.PatientName 		= result.value.for;
						absen.ReturnText 		= result.value.return;
						absen.RestrictionText 	= result.value.restriction;
						absen.ProviderName  	= result.value.provider;
						console.log(absen);
						
						this.vs.UpdateVisitAbsencesNote(absen).subscribe(resp =>{
							console.log(resp);
							this.GetListAbsenNotes();
							
						});			
											
					}
				}  
							
			}); 
	}

}
