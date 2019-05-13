//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit } 					from '@angular/core';
import { Location } 							from '@angular/common';

//---------------------------
// Router
//---------------------------
import { Router, Route } 						from '@angular/router';
import { ActivatedRoute } 						from '@angular/router';
//---------------------------
// Services
//---------------------------
import { GlobalsService } 						from '../../../core/services/globals.service';
import { LogService } 							from '../../../core/services/log.service';
import { VisitService  }						from '../../../../app/services/visit.service';
import { MedicalIssueService }					from '../../../../app/services/medical-issue.service';


//---------------------------
// Models
//---------------------------
import { IMedicalHistory } 						from '../../../models/interfaces/patient/medicalhistory.interface';
import { IGenericNameDescription } 				from '../../../models/interfaces/patient/genericnamedescription.interface';
import { GenericRecord } 						from '../../../models/interfaces/visits/generic-record.interface';



@Component({
  selector: 'app-patient-medical-information-read',
  templateUrl: './patient-medical-information-read.component.html',
  styleUrls: ['./patient-medical-information-read.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientMedicalInformationReadComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public adultID				: number;
	public patientID			: number;
	public medicalInfo    		: IMedicalHistory;
	public isLoaded				: boolean = false;
	
	
	
	public diseases				: GenericRecord[];
	
	public pcpName              : string; //Primary care provider
	public pcpPhone             : string;
	public pcpFax   			: string;
	public pcpAddress1          : string;
	public pcpAddress2          : string;
	public allergies            : IGenericNameDescription[];
	public medications          : IGenericNameDescription[];
	public surgeries            : IGenericNameDescription[];

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		private routerService 	: Router,		
		private location		: Location,
		private route			: ActivatedRoute,
		private vs    			: VisitService,
		private ms				: MedicalIssueService
	) {		
	}

	ngOnInit() {
		this.patientID = +this.route.snapshot.paramMap.get('id');
		this.adultID = +this.route.snapshot.paramMap.get('adult');

		this.vs.PatientStartVisitStep2(this.patientID.toString()).subscribe(resp => {
			this.medicalInfo = resp;
			console.log(resp);

			this.pcpName                = this.medicalInfo.PCP.DisplayName;
			this.pcpPhone         		= this.medicalInfo.PCP.Phone;
			this.pcpFax 				= this.medicalInfo.PCP.Fax;
			this.pcpAddress1            = this.medicalInfo.PCP.Address1;
			this.pcpAddress2            = this.medicalInfo.PCP.Address2;
			this.allergies              = this.medicalInfo.Allergies;
			this.medications   			= this.medicalInfo.Medications;
			this.surgeries 				= this.medicalInfo.Surgeries;

			this.ms.GetMedicalIssues().subscribe(resp => {
				this.diseases = resp;
				this.isLoaded = true;
			})
		})
	}
	
	//---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	cmdUpdateMedicalInfo_click()
	{
		this.routerService.navigate(
			[
			  	'/home/patient-home/patient-medical-info/',
			  	this.patientID,
			  	'yes',
				this.adultID
			]
		);
	}
	
	cmdConfirm_click() {
		this.routerService.navigate(
			[
			  '/home/patient-home/providers/',
			  this.patientID,
			  this.adultID,
			  false
			]
		);
	}

	isChecked(ID : number)
	{
		return (this.medicalInfo.MedicalIssues.includes(ID)) ? true : false;
	}
}
