//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Libraries
//-------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';

//-------------------------------------------------------------------------------
// Services
//-------------------------------------------------------------------------------
import { UserService } 				from '../../../../services/user.service'
import { PatientsService } 			from '../../../../services/patients.service'

//-------------------------------------------------------------------------------
// Angular Forms
//-------------------------------------------------------------------------------
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } 				from '@angular/forms';
import { Validators } 				from '@angular/forms';

//-------------------------------------------------------------------------------
// Dialogs
//-------------------------------------------------------------------------------
import { MatDialog } 				from '@angular/material';
import { DialogUploadPhotoComponent}from '../../../../components/Dialogs/dialog-upload-photo/dialog-upload-photo.component';

//-------------------------------------------------------------------------------
// Models
//-------------------------------------------------------------------------------
import { IProfile } 				from '../../../../models/interfaces/patient/profile.interface';





@Component({
	selector: 'app-family-member-profile',
	templateUrl: './family-member-profile.component.html',
	styleUrls: ['./family-member-profile.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class FamilyMemberProfileComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public methods
	//---------------------------------------------------------------------------
	@Input('patientID') patientID	: any;
	public patient					: IProfile;
	public isLoaded					: boolean = false;
	public otherRelationship		: boolean = false;
	public otherRelationshipValue	: string = '';
	public messageUpdateOperation	: string = '';
	public showResultOperation		: boolean = false;
	public resultOperation			: boolean;
	public linkPicture				: string;
	public timeStamp				: number;

	public form						: FormGroup;

	public genders = [
		{ value: 'F', viewValue: 'Female' },
		{ value: 'M', viewValue: 'Male' },
		{ value: 'O', viewValue: 'Other' },
		{ value: 'D', viewValue: 'Decline' }
	];
	public relations = [
		{ value: 'Aunt' },
		{ value: 'Brother' },
		{ value: 'Cousin' },
		{ value: 'Daughter' },
		{ value: 'Father' },
		{ value: 'Foster Child'},
		{ value: 'Grandfather'},
		{ value: 'Grandmother'},
		{ value: 'Husband' },
		{ value: 'Legal Dependent'},
		{ value: 'Mother' },
		{ value: 'Nephew'},
		{ value: 'Niece'},
		{ value: 'Partner/Significant Other'},
		{ value: 'Sister' },
		{ value: 'Son' },
		{ value: 'Spouse'},
		{ value: 'Uncle'},
		{ value: 'Wife' },
		{ value: 'Other (Write in Box Below)' }
	]
		
		
		
	public titles = [
		{ value: 'Mr.' },		
		{ value: 'Ms.' },
		{ value: 'Mrs.' },
		{ value: 'Miss' },
	]

	public date	: FormControl;

	//---------------------------------------------------------------------------
	// Private methods
	//---------------------------------------------------------------------------

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		private us: UserService,
		private fb: FormBuilder,
		private ps: PatientsService,
		public dialog	: MatDialog,
	) { }

	ngOnInit() {

		this.ps.GetProfile(this.patientID).subscribe(resp=>{
			console.log(resp);
			this.patient = resp;
			this.setLinkPicture(resp.Photo);
			
			this.createForm()
			this.isLoaded = true;	
		})
		
	}

	//---------------------------------------------------------------------------
	// creating the Form (Michel)
	//---------------------------------------------------------------------------
	createForm() {
		let relationship = this.patient.Relationship;
		let otherRelationship = "";

		let obj = this.relations.find(o => o.value === relationship);
		
		if(obj == undefined){
			otherRelationship = relationship;
			relationship = 'Other (Write in Box Below)';
			this.otherRelationship = true;
		}

		this.date = new FormControl(new Date(this.patient.DOB));
		
		this.form = this.fb.group({
			'title': [this.patient.Title, Validators.compose([Validators.required])],
			'firstName': [this.patient.FirstName, Validators.compose([Validators.required])],
			'midleName': [this.patient.MiddleName],
			'lastName': [this.patient.LastName, Validators.compose([Validators.required])],
			'dateOfBirth': [this.date.value],
			'gender': [this.patient.Gender],
			'phone': [this.patient.PrimaryPhone, Validators.compose([Validators.required])],
			'relationship': [relationship, Validators.compose([Validators.required])],
			'other': [otherRelationship]
		});
	}

	selectRelationship(value : string){
		if(value == "Other (Write in Box Below)"){
			this.otherRelationship = true;
		}else{
			this.otherRelationship = false;
			this.form.controls['other'].reset();
			this.form.controls['other'].setErrors(null);
		}
	}

	
	onSubmit() {
		let rerelationship = (this.form.controls['relationship'].value != "Other (Write in Box Below)")
			? this.form.controls['relationship'].value 
			: this.form.controls['other'].value

		let date = new Date(this.form.controls["dateOfBirth"].value);
		let year = date.getFullYear(); //this will give you full year eg : 1990
		let day = date.getDate(); //gives you the date from 1 to 31
		let month = date.getMonth() + 1;

		let date1 : string = month.toString() + "/" + day.toString() + "/" + year.toString()
		
		let patientInfo : IProfile = {
			PatientID         : this.patient.PatientID,
			Title             : this.form.controls['title'].value,
			FirstName         : this.form.controls['firstName'].value,
			MiddleName        : this.form.controls['midleName'].value,
			LastName          : this.form.controls['lastName'].value,
			DOB               : date1,
			Gender            : this.form.controls['gender'].value,
			Email             : '',
			PrimaryPhone      : this.form.controls['phone'].value,
			AlternatePhone    : '',
			Address1          : '',
			Address2          : '',
			City              : '',
			State             : '',
			Zip               : '',
			Photo             : '',
			Relationship      : rerelationship
		};
		console.log(patientInfo);
		

		this.ps.UpdateProfile(patientInfo).subscribe(resp => {
			console.log(resp);

			this.showResultOperation = true;

			if(resp.Message == "Success"){
				this.resultOperation = true;
				this.messageUpdateOperation = "Profile information updated successfully.";
			}else{
				this.resultOperation = false
				this.messageUpdateOperation = "There was an error in the update."
			}
			
		})

	}

	cmdUpdatePhoto_click()
	{
		let dialogRef = this.dialog.open(DialogUploadPhotoComponent, {
			data: {
				patientID: this.patientID
			},
			width : "550px",
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != undefined){
					console.log(result);
					this.setLinkPicture(result);				
				}
			});
	}

	public getLinkPicture() {
		if(this.timeStamp) {
		   return this.linkPicture + '?' + this.timeStamp;
		}
		return this.linkPicture;
	}
	
	public setLinkPicture(url: string) {
		this.linkPicture = url;
		this.timeStamp = (new Date()).getTime();
    }

}
