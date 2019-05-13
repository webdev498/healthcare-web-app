//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 						from '@angular/core';
import { OnInit } 							from '@angular/core';
import {MatTableDataSource} 				from '@angular/material';

//---------------------------
// Router
//---------------------------
import { Router } 							from '@angular/router';
import { ActivatedRoute } 					from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService } 					from '../../../services/security.service';
import { UserService } 						from '../../../services/user.service';
import { VisitService } 					from '../../../services/visit.service';
import { PatientsService } 					from '../../../services/patients.service';

//---------------------------
// Models
//---------------------------
import { UserInfoDto } 						from '../../../models/interfaces/useraccount/user-info-dto';
import { IFamilyMember  } 					from '../../../models/interfaces/patient/familymember.interface';
import { IVisit } 							from '../../../models/interfaces/visits/visit.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
	selector: 'app-patient-visits',
	templateUrl: './patient-visits.component.html',
	styleUrls: ['./patient-visits.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientVisitsComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public isLoaded			: boolean;
	public visits			: IVisit[] = [];
	public patients			: IFamilyMember[] = [];

	public displayedColumns = ['PatientDisplayName'];
	public dataSource 		: MatTableDataSource<any>;
	public primaryPatientID : number;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService	: Router;
	private securityService	: SecurityService;
	private userService		: UserService;
	private visitService	: VisitService;
	private patientService	: PatientsService;


	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		rt: Router,
		ss: SecurityService,
		us: UserService,
		vs: VisitService,
		ps: PatientsService,
		private route: ActivatedRoute,
	) {
		// Services
		this.securityService = ss;
		this.visitService  	 = vs;
		this.routerService	 = rt;
		this.userService	 = us;
		this.patientService	 = ps;
	}


	//---------------------------------------------------------------------------
	// LifeCycle Handlers
	//---------------------------------------------------------------------------
	ngOnInit() {
		this.isLoaded = false;
		this.securityService.GetUserInfo('true').subscribe(resp => {
			if(resp){
				this.primaryPatientID = resp.PatientID;
				this.securityService.setCurrentUserApi(resp);
				this.loadData();
			}
		})
		
	}

	loadData()
	{
		this.patientService.GetFamilyMemberList().subscribe(result => {
			console.log(result);
			
			if(result.length > 0){
				for (let index = 0; index < result.length; index++) {
					if(!result[index].IsPrivate){
						this.patients.push(result[index])
					}
				}

				this.visitService.GetPatientAccountVisits(this.primaryPatientID).subscribe(result => {
					console.log(result);
					if(result != null && result.length > 0){
						this.visits = result;
						this.dataSource = new MatTableDataSource(this.visits);

						this.visits.forEach(element => {
							console.log(element);
						});
					}else{
						this.dataSource = new MatTableDataSource();
					}
					this.isLoaded = true;
				});
			}else{
				this.isLoaded = true;
			}
		});
	}


	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------
	showVisitDatails_click(visitId: number) {
		this.routerService.navigate(
			[
				'/home/patient-home/patient-visit-details/',
				visitId
			]
		);
	}

	applyFilter(PatientID: string) {
		let id = Number(PatientID);

		if(!isNaN(id)){
			this.visits = [];
			this.dataSource = new MatTableDataSource(this.visits);
			
			this.visitService.PatientVisits(id).subscribe(result => {
				if(result != null && result.length > 0){
					this.visits = this.visits.concat(result);
					this.dataSource = new MatTableDataSource(this.visits);
				}else{
					this.dataSource = new MatTableDataSource();
				}
			});
		}else{
			this.visits = [];
			this.loadData();
		}

		
	}
}
