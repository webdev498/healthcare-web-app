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
import { DialogPrimaryCareProviderComponent } 	from '../../../../components/Dialogs/dialog-primary-care-provider/dialog-primary-care-provider.component';
import { DialogSurgeryComponent } 				from '../../../../components/Dialogs/dialog-surgery/dialog-surgery.component';
import { DialogMedicationComponent } 			from '../../../../components/Dialogs/dialog-medication/dialog-medication.component';
import { DialogAllergyComponent } 				from '../../../../components/Dialogs/dialog-allergy/dialog-allergy.component';
import { DialogPharmacyComponent } 				from '../../../../components/Dialogs/dialog-pharmacy/dialog-pharmacy.component';
import { DialogDeletePharmacyComponent }            from '../../../../components/DialogsProvider/dialog-delete-pharmacy/dialog-delete-pharmacy.component';
import { DialogDeletePrimaryCareProviderComponent } from '../../../../components/DialogsProvider/dialog-delete-primary-care-provider/dialog-delete-primary-care-provider.component';
import { DialogDeleteMedicationComponent }          from '../../../../components/DialogsProvider/dialog-delete-medication/dialog-delete-medication.component';
import { DialogDeleteSurgeryComponent }             from '../../../../components/DialogsProvider/dialog-delete-surgery/dialog-delete-surgery.component';
import { DialogDeleteAllergyComponent } 		from '../../../../components/DialogsProvider/dialog-delete-allergy/dialog-delete-allergy.component';

//---------------------------
// Services
//---------------------------
import { SecurityService } 						from '../../../../services/security.service';
import { LogService } 							from '../../../../core/services/log.service';
import { UserService } 							from '../../../../services/user.service';
import { PatientsService } 						from '../../../../services/patients.service';
import { MedicalIssueService }					from '../../../../services/medical-issue.service';

//---------------------------
// Models
//---------------------------
import { IPCP  } 								from '../../../../models/interfaces/patient/pcp.interface';
import { IMedicalHistory } 						from '../../../../models/interfaces/patient/medicalhistory.interface';
import { IPharmacy } 							from '../../../../models/interfaces/patient/pharmacy.interface';
import { IProfile }								from '../../../../models/interfaces/patient/profile.interface';
import { GenericRecord } 						from '../../../../models/interfaces/visits/generic-record.interface';
import { IGenericNameDescription } from '../../../../models/interfaces/patient/genericnamedescription.interface';


// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-user-registration-medical-information',
    templateUrl: './user-registration-medical-information.component.html',
    styleUrls: ['./user-registration-medical-information.component.css']
})
export class UserRegistrationMedicalInformationComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public patientID			: number;				//Used for store adultID from start visit medical information button
	public isLoaded				: boolean = false;

	public diseases				: GenericRecord[] = [];		//for loading all medicalissues
	public medicalIssues		: number[] = [];		//for know wich is check


    public provider				: IPCP = undefined;
	public pharmacy				: IPharmacy = undefined;

	public allergies			: IGenericNameDescription[] = [];
	public medications			: IGenericNameDescription[] = [];
	public surgeries			: IGenericNameDescription[] = [];
	public medicalInfo    		: IMedicalHistory;








	public message				: string = "";
	public showMessage			: boolean = false;
	
	
	public cbOtherDiseaseValue	: boolean;
	public otherDisease			: string;
	public checked				: boolean = false;
	private isDisabled      	: boolean = true;


	
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
		private ss		: SecurityService,
		private route	: ActivatedRoute,
		private ms 		: MedicalIssueService,
		private ar 		: ActivatedRoute,
	) {
		// Services
		this.routerService 		= rt;
		this.patientService		= ps;
	}

	ngOnInit() {
		this.ar.queryParams.subscribe(params => {
            this.patientID = params['id'];
        }); 

		this.ms.GetMedicalIssues().subscribe(resp => {
			this.diseases = resp;
			this.isLoaded = true;
		})
	}

	isChecked(item : any)
	{
		this.medicalIssues.forEach(function(value){
			if(value == item.ID){
				return true;
			}
		},item);

		return false;
	}
	
	onChangeCB(event : any, id : number)
	{
		var found = this.medicalIssues.find(function(element) {
			return element == id
		});

		if(event.checked && !found)
		{
			this.medicalIssues.push(id);
			console.log(this.medicalIssues);
			
		}else{
			let index = this.medicalIssues.indexOf(id);
			this.medicalIssues.splice(index, 1);
		}		
	}
	
	//---------------------------------------------------------------------------
    // Event Handler Methods Section
	//---------------------------------------------------------------------------
	cmdRegisterMedicalinformation_click() {
		//RECORD ALL CHANGES

		let medicalHistory : IMedicalHistory = {			
			PatientID       	: this.patientID,
			OtherMedicalIssue 	: this.otherDisease,
			MedicalIssues   	: this.medicalIssues,
			Allergies       	: this.allergies,
			Medications     	: this.medications,
			Surgeries       	: this.surgeries,
			Pharmacy        	: this.pharmacy,
			PCP             	: this.provider,
		}

		console.log(medicalHistory);
		

		this.ss.RegistrationStep4(medicalHistory).subscribe(resp => {
			console.log(resp);

			if(resp.Message == "Success"){
				let storage = localStorage.getItem("access_token");
				console.log(storage);
				

				if(storage != undefined){
					this.routerService.navigate(['/home']);
				}else{
					this.routerService.navigate(
						[
							'security/login'
						]
					);
				}

				 
			}else{
				this.message = resp.Message;
				this.showMessage = true;
			}
		})
		
	}

	isAllInformation()
	{
		console.log(this.isPharmacyEmpty());
		
		return (this.isPharmacyEmpty() && this.isProviderEmpty()) ? false : true;		
	}






	enableOtherInput(event : any)
	{
		console.log(event);
		this.checked = event;
		this.isDisabled = !event
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
		return (!this.pharmacy)? false : true;
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
				this.allergies.push(result)
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
                this.allergies[i] = result;
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
				let index = this.allergies.indexOf(ev);
				this.allergies.splice(index, 1);
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
                this.medications.push(result);
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
                this.medications[i] = result;
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
				this.medications.splice(index, 1);
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
                this.surgeries.push(result);
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
                this.surgeries[i] = result;
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
				this.surgeries.splice(index, 1);
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