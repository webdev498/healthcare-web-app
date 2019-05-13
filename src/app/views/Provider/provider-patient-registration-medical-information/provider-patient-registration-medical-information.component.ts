//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit } 							from '@angular/core';
import { Location } 									from '@angular/common';

//---------------------------
// Router
//---------------------------
import { Router, Route } 						        from '@angular/router';
import { ActivatedRoute } 						        from '@angular/router';

//---------------------------
// Dialog
//---------------------------
import { MatDialog } 							        from '@angular/material';
import { DialogAddPrimaryCareProviderSearchComponent  } from '../../../components/DialogsProvider/dialog-add-primary-care-provider-search/dialog-add-primary-care-provider-search.component';
import { DialogDeletePrimaryCareProviderComponent  } 	from '../../../components/DialogsProvider/dialog-delete-primary-care-provider/dialog-delete-primary-care-provider.component';
import { DialogAddPharmacyComponent }			        from '../../../components/DialogsProvider/dialog-add-pharmacy/dialog-add-pharmacy.component';
import { DialogDeletePharmacyComponent  }		        from '../../../components/DialogsProvider/dialog-delete-pharmacy/dialog-delete-pharmacy.component';
import { DialogAllergyComponent } 				        from '../../../components/Dialogs/dialog-allergy/dialog-allergy.component';
import { DialogDeleteAllergyComponent } 		        from '../../../components/DialogsProvider/dialog-delete-allergy/dialog-delete-allergy.component';
import { DialogMedicationComponent } 			        from '../../../components/Dialogs/dialog-medication/dialog-medication.component';
import { DialogDeleteMedicationComponent }		        from '../../../components/DialogsProvider/dialog-delete-medication/dialog-delete-medication.component';
import { DialogSurgeryComponent } 				        from '../../../components/Dialogs/dialog-surgery/dialog-surgery.component';
import { DialogDeleteSurgeryComponent } 		        from '../../../components/DialogsProvider/dialog-delete-surgery/dialog-delete-surgery.component';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 							        from '@angular/forms';
import { FormGroup } 							        from '@angular/forms';
import { Validators } 							        from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { VisitService } 								from '../../../services/visit.service';
import { SecurityService } 						        from '../../../services/security.service';
import { GlobalsService } 						        from '../../../core/services/globals.service';
import { LogService } 							        from '../../../core/services/log.service';
import { UserService } 							        from '../../../services/user.service';

//---------------------------
// Models
//---------------------------
import { DialogFamilyMemberAddedComponent } 	        from '../../../components/Dialogs/dialog-family-member-added/dialog-family-member-added.component';
import { Disease } 								        from '../../../models/interfaces/disease.interface';
import { Provider } 							        from '../../../models/provider.model';

import { getProviders }							        from '../../../services/mockups/providers.mockup';
import { GenericRecord } 								from '../../../models/interfaces/visits/generic-record.interface';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-patient-registration-medical-information',
  templateUrl: './provider-patient-registration-medical-information.component.html',
  styleUrls: ['./provider-patient-registration-medical-information.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderPatientRegistrationMedicalInformationComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public diseases				: GenericRecord[];
	public cbOtherDiseaseValue	: boolean;
    public form					: FormGroup;
    
	public providers			: Provider[];
	public providersAdded		: Provider[];
	public pharmacies			: string[] = [];
	public allergies			: string[] = [];
	public medications			: string[] = [];
	public surgeries			: string[] = [];
    
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService		: Router;
	private securityService		: SecurityService;
	private globalsService		: GlobalsService;
	private logService			: LogService;
	private userService			: UserService;
	private fb					: FormBuilder;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		rt: Router,
		ss: SecurityService,
		ls: LogService,
		us: UserService,
		fb: FormBuilder,
		public dialog	: MatDialog,
		private location: Location,
		private route	: ActivatedRoute,
		private vs		: VisitService
	) {
		// Services
		this.securityService 	= ss;
		this.routerService 		= rt;
		this.logService 		= ls;
		this.globalsService 	= GlobalsService.getInstance();
		this.userService 		= us;
		this.fb 				= fb;
	}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');

		this.vs.PatientStartVisitStep4().subscribe(resp => {
			this.diseases = resp;
		})

		this.providers = getProviders();
        this.providersAdded = [];
        this.pharmacies = [];
        this.allergies  = [];
        this.medications= [];
        this.surgeries	= [];
	}
	
	//---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	public cmdResonVisit_Click()
	{
		this.routerService.navigate(
		  	[
				'/home/patient-home/providers/'
		  	]
	  	);
	}
	
	onCheck() {

		this.cbOtherDiseaseValue = !this.cbOtherDiseaseValue;
	}

	public getChOtherDiseaseValue() {
		return !this.cbOtherDiseaseValue;
	}

	public cmdRegisterMedicalinformation_click() {
		this.routerService.navigate(
			[
			  '/home/patient-home/providers/',
			]
		);
	}


    //PROVIDER FUNCTIONS
    public openDialogPrimaryCareProvider() {
		let dialogRef = this.dialog.open(DialogAddPrimaryCareProviderSearchComponent, {
			data: {
				providers : this.providers
			},
			width: '650px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.providersAdded.push(result)
			}
		});
	}
	public deleteProvider(ev)
	{
		let dialogRef = this.dialog.open(DialogDeletePrimaryCareProviderComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.providersAdded.indexOf(ev);
				this.providersAdded.splice(index, 1);
			}
		});
	}

	//PHARMACY FUNCTIONS
	public openDialogPharmacy() {
		let dialogRef = this.dialog.open(DialogAddPharmacyComponent, {
			data: {
				animal: ''
            },
            width: '600px'
		});
		dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
				this.pharmacies.push(result)
			}
		});
    }
    public deletePharmacy(ev)
	{
		let dialogRef = this.dialog.open(DialogDeletePharmacyComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.pharmacies.indexOf(ev);
				this.pharmacies.splice(index, 1);
			}
		});
	}

	//ALLERGY FUNCTIONS
	public openDialogAllergy() {
		let dialogRef = this.dialog.open(DialogAllergyComponent, {
			data: {
				name: ''
            },
            width : '600px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.allergies.push(result)
			}
		});
    }
    public deleteAllergy(ev) {
        let dialogRef = this.dialog.open(DialogDeleteAllergyComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.medications.indexOf(ev);
		        this.medications.splice(index, 1);
			}
		});
	}
	

	//MEDICATION FUNCTIONS
	public openDialogMedication() {
		let dialogRef = this.dialog.open(DialogMedicationComponent, {
			data: {
				animal: ''
			},
			width: '600px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.medications.push(result[0])
			}
		});
	}
	public deleteMedication(ev)
	{
		let dialogRef = this.dialog.open(DialogDeleteMedicationComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.medications.indexOf(ev);
				this.medications.splice(index, 1);
			}
		});
	}

	//SURGERY FUNCTIONS
	public openDialogSurgery() {
		let dialogRef = this.dialog.open(DialogSurgeryComponent, {
			data: {
				animal: ''
			},
			width : '600px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != undefined){
				this.surgeries.push(result[0])
			}
		});
	}
	public deleteSurgery(ev)
	{
		let dialogRef = this.dialog.open(DialogDeleteSurgeryComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.surgeries.indexOf(ev);
				this.surgeries.splice(index, 1);
			}
		});
	}

	


	onPrevious() {
		this.location.back();
		//this.routerService.navigate(['/security/pre-paid/user-registration-security-question']); 
	}
	
	onUpdateAllergy(ev) {
		let index = this.allergies.indexOf(ev.old);
		this.allergies.splice(index, 1, ev.new);
	}

	

}
