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
import { Router } 								from '@angular/router';
import { ActivatedRoute } 						from '@angular/router';

//---------------------------
// Dialog
//---------------------------
import { MatDialog } 							from '@angular/material';
import { DialogPrimaryCareProviderComponent } 	from '../../../components/Dialogs/dialog-primary-care-provider/dialog-primary-care-provider.component';
import { DialogSurgeryComponent } 				from '../../../components/Dialogs/dialog-surgery/dialog-surgery.component';
import { DialogMedicationComponent } 			from '../../../components/Dialogs/dialog-medication/dialog-medication.component';
import { DialogAllergyComponent } 				from '../../../components/Dialogs/dialog-allergy/dialog-allergy.component';
import { DialogPharmacyComponent } 				from '../../../components/Dialogs/dialog-pharmacy/dialog-pharmacy.component';
import { DialogDeletePharmacyComponent }            from '../../../components/DialogsProvider/dialog-delete-pharmacy/dialog-delete-pharmacy.component';
import { DialogDeletePrimaryCareProviderComponent } from '../../../components/DialogsProvider/dialog-delete-primary-care-provider/dialog-delete-primary-care-provider.component';
import { DialogDeleteMedicationComponent }          from '../../../components/DialogsProvider/dialog-delete-medication/dialog-delete-medication.component';
import { DialogDeleteSurgeryComponent }             from '../../../components/DialogsProvider/dialog-delete-surgery/dialog-delete-surgery.component';
import { DialogDeleteAllergyComponent } 		from '../../../components/DialogsProvider/dialog-delete-allergy/dialog-delete-allergy.component';

//---------------------------
// Services
//---------------------------
import { SecurityService } 						from '../../../services/security.service';
import { LogService } 							from '../../../core/services/log.service';
import { UserService } 							from '../../../services/user.service';
import { PatientsService } 						from '../../../services/patients.service';
import { MedicalIssueService }					from '../../../services/medical-issue.service';

//---------------------------
// Models
//---------------------------
import { IPCP  } 								from '../../../models/interfaces/patient/pcp.interface';
import { IMedicalHistory } 						from '../../../models/interfaces/patient/medicalhistory.interface';
import { IPharmacy } 							from '../../../models/interfaces/patient/pharmacy.interface';
import { IProfile }								from '../../../models/interfaces/patient/profile.interface';
import { GenericRecord } 						from '../../../models/interfaces/visits/generic-record.interface';


@Component({
	selector: 'app-patient-medical-information',
	templateUrl: './patient-medical-information.component.html',
	styleUrls: ['./patient-medical-information.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientMedicalInformationComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public adultID				: number;				//Used for store adultID from start visit medical information button
	public patientID			: number;				//Used for store adultID from start visit medical information button
	
	public isLoaded				: boolean = false;

	public patient				: IProfile;
	public medicalInfo    		: IMedicalHistory;
    public provider				: IPCP;
	public pharmacy				: IPharmacy;
	public diseases				: GenericRecord[];		//MedicalIssues

	public message				: string = "";
	public showMessage			: boolean = false;
	private isDisabled      	: boolean;






	public cbOtherDiseaseValue	: boolean;
	public otherDisease			: string;
	public disableInput			: boolean = false;
	public redirect				: string = "no";		//Used for redirect to the visit process


	
	
	
	
	
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService		: Router;
	private patientService		: PatientsService;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		rt: Router,
		public ps: PatientsService,
		public dialog	: MatDialog,
		private route	: ActivatedRoute,
		private ms 		: MedicalIssueService
	) {
		// Services
		this.routerService 		= rt;
		this.patientService		= ps;
	}

	ngOnInit() {
		this.patientID = +this.route.snapshot.paramMap.get('id');
		this.adultID = +this.route.snapshot.paramMap.get('adult');
		this.redirect 	= this.route.snapshot.paramMap.get('redirect');

		this.ps.GetProfile(this.patientID.toString()).subscribe(resp=>{
			console.log(resp);
			this.patient = resp;
			
			this.ps.GetMedicalHistory(this.patientID.toString()).subscribe(resp =>{
				console.log(resp);
				this.medicalInfo 	= resp;	
				this.pharmacy 		= resp.Pharmacy;	
				this.provider		= resp.PCP;

				if(resp.OtherMedicalIssue != null)
				{
					this.disableInput = true;
				}
				this.otherDisease	= resp.OtherMedicalIssue;

				this.ms.GetMedicalIssues().subscribe(resp => {
					this.diseases = resp;
					this.isLoaded = true;
				})		
			});
		})
	}

	isChecked(ID : number)
	{
		return (this.medicalInfo.MedicalIssues.includes(ID)) ? true : false;
	}
	
	onChangeCB(event : any, id : number)
	{
		if(event.checked && !this.medicalInfo.MedicalIssues.includes(id)){
			this.medicalInfo.MedicalIssues.push(id);
		}else{
			let index = this.medicalInfo.MedicalIssues.indexOf(id);
			this.medicalInfo.MedicalIssues.splice(index, 1);
		}		
	}
	
	//---------------------------------------------------------------------------
    // Event Handler Methods Section
	//---------------------------------------------------------------------------
	cmdRegisterMedicalinformation_click() {
		//RECORD ALL CHANGES

		let medicalHistory : IMedicalHistory = {
			PatientID        : this.patientID,
			OtherMedicalIssue: this.otherDisease,
			MedicalIssues    : this.medicalInfo.MedicalIssues,
			Allergies        : this.medicalInfo.Allergies,
			Medications      : this.medicalInfo.Medications,
			Surgeries        : this.medicalInfo.Surgeries,
			Pharmacy         : this.pharmacy,
			PCP              : this.provider,
		}

		this.patientService.UpdateMedicalHistory(medicalHistory).subscribe(resp => {
			console.log(resp);
			this.message = resp.Message;
			this.showMessage = true;

		})
		
		// REDIRECT TO START VISIT PROCESS
		if(this.redirect === "yes"){
			this.routerService.navigate(
				[
				  '/home/patient-home/providers',
				  this.patientID,
				  this.adultID,
				  false
				]
			);
		}
		
	}

	isAllInformation()
	{
		return (this.isPharmacyEmpty() && this.isProviderEmpty()) ? false : true;		
	}

	enableOtherInput(event : any)
	{
		if(event){
			this.disableInput = true;
		}else{
			this.disableInput = false;
			this.otherDisease = null;
		}
	}
	

	//-------------------------------------------------------------------------
	//PHARMACIES, ALLERGIES, MEDICATIONS AND SURGERIES CRUD
	//-------------------------------------------------------------------------
	//provider
	openDialogPrimaryCareProvider() {
        let dialogRef = this.dialog.open(DialogPrimaryCareProviderComponent, {
            data: {
                pcp: ''
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			
            if(result != undefined) 
            {   
                this.provider = result;

                if(!this.provider){
                    this.isDisabled = false;
                }
            }
        });
    }
	editProvider() {
        let dialogRef = this.dialog.open(DialogPrimaryCareProviderComponent, {
            data: {
                pcp: this.provider
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.provider = result;
            }
        });
    }
    deleteProvider(ev)
	{
		let dialogRef = this.dialog.open(DialogDeletePrimaryCareProviderComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.provider = undefined;
                
                this.isDisabled = false;
			}
		});
	}
	isProviderEmpty(){
		return (!this.provider)? false : true;
	}

	//Pharmacy
	openDialogPharmacy() {
        let dialogRef = this.dialog.open(DialogPharmacyComponent, {
            data: {
                pharmacy: this.pharmacy
            },
            width : "600px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
				this.pharmacy = result;
			}
        });
	}
	editPharmacy() {
        let dialogRef = this.dialog.open(DialogPharmacyComponent, {
            data: {
                pharmacy: this.pharmacy
            },
            width : "600",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.pharmacy = result;
            }
        });
    }
    deletePharmacy(ev)
	{
		let dialogRef = this.dialog.open(DialogDeletePharmacyComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.pharmacy.BusinessName = "";
				this.pharmacy.City = "";
				this.pharmacy.Description = "";
				this.pharmacy.State = "";
				this.pharmacy.StreetAddress1 = "";
				this.pharmacy.StreetAddress2 = "";
				this.pharmacy.ZipCode = "";

                this.isDisabled = false;
			}
		});
	}
	isDisabledPharmacyButton(){
		return (this.pharmacy == null) ? false : true;
	}
	isPharmacyEmpty(){
		return (
			this.pharmacy.BusinessName == "" && 
			this.pharmacy.City == "" && 
			this.pharmacy.Description == "" && 
			this.pharmacy.State == "" && 
			this.pharmacy.StreetAddress1 == "" && 
			this.pharmacy.StreetAddress2 == "" && 
			this.pharmacy.ZipCode == ""
			) 
			? false 
			: true;
	}
	
	//Allergy
	openDialogAllergy() {
		let dialogRef = this.dialog.open(DialogAllergyComponent, {
			data: {
				Name: '',
				Description : ''
			},
			width : "750px",
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != undefined) 
			{
				this.medicalInfo.Allergies.push(result)
			}
		});
	}
	editAllergy(item : any, i : number) {
        let dialogRef = this.dialog.open(DialogAllergyComponent, {
            data: {
                Name: item.Name,
				Description: item.Description,
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.medicalInfo.Allergies[i] = result;
            }
        });
    }
	deleteAllergy(ev) {
		let dialogRef = this.dialog.open(DialogDeleteAllergyComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.medicalInfo.Allergies.indexOf(ev);
				this.medicalInfo.Allergies.splice(index, 1);
			}
		});

	}

	//Medication
    openDialogMedication() {
        let dialogRef = this.dialog.open(DialogMedicationComponent, {
            data: {
                Name: '',
                Description: ''
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {
                this.medicalInfo.Medications.push(result);
            }
        });
	}
	editMedication(item : any, i : number) {
        let dialogRef = this.dialog.open(DialogMedicationComponent, {
            data: {
                Name: item.Name,
				Description: item.Description,
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.medicalInfo.Medications[i] = result;
            }
        });
    }
    deleteMedication(ev)
	{
		let dialogRef = this.dialog.open(DialogDeleteMedicationComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.medicalInfo.Medications.indexOf(ev);
				this.medicalInfo.Medications.splice(index, 1);
			}
		});
	}

	//Surgery
    openDialogSurgery() {
        let dialogRef = this.dialog.open(DialogSurgeryComponent, {
            data: {
                Name: '',
                Description: ''
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {
                this.medicalInfo.Surgeries.push(result);
            }
        });
	}
	editSurgery(item : any, i : number) {
        let dialogRef = this.dialog.open(DialogMedicationComponent, {
            data: {
                Name: item.Name,
				Description: item.Description,
            },
            width : "750px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.medicalInfo.Surgeries[i] = result;
            }
        });
    }
    deleteSurgery(ev)
	{
		let dialogRef = this.dialog.open(DialogDeleteSurgeryComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				let index = this.medicalInfo.Surgeries.indexOf(ev);
				this.medicalInfo.Surgeries.splice(index, 1);
			}
		});
	}
	



	
	
	
	
	
	onCheck() {
		this.cbOtherDiseaseValue = !this.cbOtherDiseaseValue;
	}

	getChOtherDiseaseValue() {
		return !this.cbOtherDiseaseValue;
	}
}
