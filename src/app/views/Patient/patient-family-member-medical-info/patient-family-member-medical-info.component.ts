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
import { FamilyMemberInfoDTO } 					from '../../../models/interfaces/patient/family-member-info.interface';
import { IGenericNameDescription } 				from '../../../models/interfaces/patient/genericnamedescription.interface';
import { DialogFamilyMemberAddedComponent } from '../../../components/Dialogs/dialog-family-member-added/dialog-family-member-added.component';



@Component({
    selector: 'app-patient-family-member-medical-info',
    templateUrl: './patient-family-member-medical-info.component.html',
    styleUrls: ['./patient-family-member-medical-info.component.css']
  })
  //-------------------------------------------------------------------------------
  // Component Class Section
  //-------------------------------------------------------------------------------
  export class PatientFamilyMemberMedicalInfoComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public isLoaded				: boolean = false;

	public patient				: IProfile;
	public diseases				: GenericRecord[];		
	public diseasesSelected		: number[] = [];
	public Allergies       		: IGenericNameDescription[] = [];
	public Medications     		: IGenericNameDescription[] = [];
	public Surgeries       		: IGenericNameDescription[] = [];	

	public medicalInfo    		: IMedicalHistory;
    public provider				: IPCP 		= undefined;
	public pharmacy				: IPharmacy = undefined;
	
		

	public newPatient			: IProfile;
	public message				: string = "";
	public showMessage			: boolean = false;
	private isDisabled      	: boolean;






	public cbOtherDiseaseValue	: boolean;
	public otherDisease			: string;
	public disableInput			: boolean = true;

	
	
	
	
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
		private ms 		: MedicalIssueService,
		private ss		: SecurityService,
	) {
		// Services
		this.routerService 		= rt;
		this.patientService		= ps;
	}

	ngOnInit() {
		this.ms.GetMedicalIssues().subscribe(resp => {
			this.diseases = resp;
			this.ps.GetMedicalHistory(this.ss.getCurrentUserApi().PatientID.toString()).subscribe(resp => {
				this.pharmacy = resp.Pharmacy
				this.isLoaded = true;
			})
		});

		this.newPatient = JSON.parse(localStorage.getItem("newFamilyMember")); 
		console.log(this.newPatient);
		

	}


	//---------------------------------------------------------------------------
    // Event Handler Methods Section
	//---------------------------------------------------------------------------
	cmdRegisterMedicalinformation_click() {
		//RECORD ALL CHANGES

		let medicalHistory : IMedicalHistory = {
			PatientID        	: 0,
			OtherMedicalIssue	: this.otherDisease,
			MedicalIssues   	: this.diseasesSelected,
			Allergies       	: this.Allergies,
			Medications     	: this.Medications,
			Surgeries       	: this.Surgeries,
			Pharmacy        	: this.pharmacy,
			PCP             	: this.provider,
		}
		console.log(medicalHistory);
		

		let familyMemberInfo : FamilyMemberInfoDTO = {
			FamilyMemberInformation : this.newPatient,
			MedicalHistory			: medicalHistory
		}

		console.log(familyMemberInfo);
		
		let dialogRef = this.dialog.open(DialogFamilyMemberAddedComponent, {
            data: {
                newPatient: this.newPatient
            },
            width : "550px",
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result != undefined) 
            {   
                this.patientService.AddFamilyMembers(this.ss.getCurrentUserApi().PatientID, [familyMemberInfo]).subscribe(resp => {
					console.log(resp);

					if(resp.Message == "Success"){
						if(result.anotherMember){
							this.ps.GetFamilyMemberList().subscribe(resp=>{
								let numberPatients = 4 -(resp.length - 1);
								
								if(numberPatients != 0){
									this.routerService.navigate(['home/patient-home/patient-add-family-members/',
									{
										membersAmount: numberPatients,
									}]);
								}
							});
						}else{
							this.routerService.navigate(['home/patient-home/patient-myaccount-tab/',1]);
						}
					}
					
					
				})

                if(!this.provider){
                    this.isDisabled = false;
                }
            }
        });

		
	}

	selectMedicalIssue(event: any, ID : number)
	{
		if(event && !this.diseasesSelected.includes(ID)){
			this.diseasesSelected.push(ID);
		}else{
			let index = this.diseasesSelected.indexOf(ID);
			this.diseasesSelected.splice(index);
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
            width : "600px",
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
				this.pharmacy = undefined;

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
				this.Allergies.push(result)
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
                this.Allergies[i] = result;
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
				let index = this.Allergies.indexOf(ev);
				this.Allergies.splice(index, 1);
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
                this.Medications.push(result);
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
                this.Medications[i] = result;
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
				let index = this.Medications.indexOf(ev);
				this.Medications.splice(index, 1);
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
                this.Surgeries.push(result);
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
                this.Surgeries[i] = result;
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
				let index = this.Surgeries.indexOf(ev);
				this.Surgeries.splice(index, 1);
			}
		});
	}
	
	isAllInformation()
	{
		return (this.isPharmacyEmpty() && this.isProviderEmpty()) ? false : true;		
	}







	enableOtherInput(event : any)
	{
		if(event){
			this.disableInput = false;
		}else{
			this.disableInput = true;
			this.otherDisease = "";
		}
	}

	getChOtherDiseaseValue() {
		return !this.cbOtherDiseaseValue;
	}
}
