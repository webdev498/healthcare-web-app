//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit, Input } 		from '@angular/core';
import { Observable }					 					from 'rxjs';
import { Router } 											from '@angular/router';


//---------------------------
// Angular Material Table
//---------------------------
import { MatTableDataSource } 					from '@angular/material';


//---------------------------
// Dialog
//---------------------------
import { MatDialog } 										from '@angular/material';
import { DialogAddendumComponent } 			from '../../../../components/DialogsProvider/dialog-addendum/dialog-addendum.component';

//---------------------------
// Services
//---------------------------
import { ProvidersService } 						from '../../../../services/providers.service';


//---------------------------
// Models
//---------------------------
import { IAddendum } 										from '../../../../models/interfaces/addendum.interface';
import { IVisits } 											from '../../../../models/interfaces/visits.interface';
import * as visitMokcup 								from '../../../../services/mockups/visits.mockup';
import { IVisit } from '../../../../models/interfaces/visits/visit.interface';
import { IAddendumDTO } from '../../../../models/interfaces/visits/AddendumDTO.interface';
import { VisitService } from '../../../../services/visit.service';
import { PatientVisitDTO } from '../../../../models/interfaces/visits/patient-visitDTO.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
	selector: 'app-addendum',
	templateUrl: './addendum.component.html',
	styleUrls: ['./addendum.component.scss']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class AddendumComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public ifaddenda				: boolean = false;
	public data						: IAddendum[] = [];
	
	public dataSource				: MatTableDataSource<IAddendum>;
	public displayedColumns 		= ['DoctorName'];
	public visits					: IAddendumDTO[];
	
	@Input('visit') visit			: PatientVisitDTO;
	
	constructor(
		public dialog			: MatDialog,
		private routerService	: Router,
		private providerService	: ProvidersService,
		private vs 				: VisitService
	) { }

	ngOnInit() {		
		this.dataSource = new MatTableDataSource(this.data);
		//this.visits = visitMokcup.getVisits();
		this.GetVisitAddenda();
	}
	GetVisitAddenda()
	{
		this.vs.GetVisitAddenda(this.visit.VisitID).subscribe(resp =>{
			this.visits = resp;
			console.log(resp);			
		})
	}

	public addAddendum() {
		let dialogRef = this.dialog.open(DialogAddendumComponent, {
			width: '550px',
			data: { diagnosis: "", DoctorName: this.visit.ProviderName }

		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result != undefined) {
				console.log(result);
				console.log(result.text);
				let addendum:IAddendumDTO = {
					AddendumID: 0,
					VisitID: this.visit.VisitID,
					Text : result.text,
					ProviderName  : this.visit.ProviderName,
  					TimeEntered   : ''
				}
				this.vs.UpdateVisitAddendum(addendum).subscribe(resp =>{
					console.log(resp);
					this.GetVisitAddenda();
				})
						
			}

		});
	}
	showDatails_click(adenda: IAddendumDTO)
	{
		let dialogRef = this.dialog.open(DialogAddendumComponent, {
			width: '550px',
			data: { diagnosis: adenda.Text, DoctorName: adenda.ProviderName }

		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result != undefined) {
				console.log(result);
				adenda.Text = result.text;
				this.vs.UpdateVisitAddendum(adenda).subscribe(resp =>{
					console.log(resp);
					this.GetVisitAddenda();
				})
				
			}

		});
		
	}

}
