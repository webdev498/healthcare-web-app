//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 									from '@angular/core';
import { OnInit } 										from '@angular/core';

import { MatDialog } 									from '@angular/material';
import { DialogChangePasswordComponent }				from '../../../components/Dialogs/dialog-change-password/dialog-change-password.component';
import { DialogUploadPhotoComponent }					from '../../../components/Dialogs/dialog-upload-photo/dialog-upload-photo.component'

//---------------------------
// Router
//---------------------------

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder, FormControl } 					from '@angular/forms';
import { FormGroup } 					  				from '@angular/forms';
import { Validators } 									from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router } 										from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }								from '../../../services/security.service';
import { PatientsService } 								from '../../../services/patients.service';
import { IProfile } 									from '../../../models/interfaces/patient/profile.interface';



@Component({
	selector: 'app-patient-profile',
	templateUrl: './patient-profile.component.html',
	styleUrls: ['./patient-profile.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientProfileComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _profileForm			: FormGroup;
	public user					: IProfile;
	public messageUpdateOperation	: string = '';
	public showResultOperation		: boolean = false;
	public resultOperation			: boolean;
	public isLoaded				: boolean = false;
	public linkPicture			: string;
	public timeStamp			: number;

	

	public genders = [
		{ value: 'F', viewValue: 'Female' },
		{ value: 'M', viewValue: 'Male' },
		{ value: 'O', viewValue: 'Other' },
		{ value: 'D', viewValue: 'Decline' }
	];
	
	public states = [
        {
            value: 'AL',
            viewValue: 'AL'
        },
        {
            value: 'AK',
            viewValue: 'AK'
        },
        {
            value: 'AS',
            viewValue: 'AS'
        },
        {
            value: 'AZ',
            viewValue: 'AZ'
        },
        {
            value: 'AR',
            viewValue: 'AR'
        },
        {
            value: 'CA',
            viewValue: 'CA'
        },
        {
            value: 'CO',
            viewValue: 'CO'
        },
        {
            value: 'CT',
            viewValue: 'CT'
        },
        {
            value: 'DE',
            viewValue: 'DE'
        },
        {
            value: 'DC',
            viewValue: 'DC'
        },
        {
            value: 'FM',
            viewValue: 'FM'
        },
        {
            value: 'FL',
            viewValue: 'FL'
        },
        {
            value: 'GA',
            viewValue: 'GA'
        },
        {
            value: 'GU',
            viewValue: 'GU'
        },
        {
            value: 'HI',
            viewValue: 'HI'
        },
        {
            value: 'ID',
            viewValue: 'ID'
        },
        {
            value: 'IL',
            viewValue: 'IL'
        },
        {
            value: 'IN',
            viewValue: 'IN'
        },
        {
            value: 'IA',
            viewValue: 'IA'
        },
        {
            value: 'KS',
            viewValue: 'KS'
        },
        {
            value: 'KY',
            viewValue: 'KY'
        },
        {
            value: 'LA',
            viewValue: 'LA'
        },
        {
            value: 'ME',
            viewValue: 'ME'
        },
        {
            value: 'MH',
            viewValue: 'MH'
        },
        {
            value: 'MD',
            viewValue: 'MD'
        },
        {
            value: 'MA',
            viewValue: 'MA'
        },
        {
            value: 'MI',
            viewValue: 'MI'
        },
        {
            value: 'MN',
            viewValue: 'MN'
        },
        {
            value: 'MS',
            viewValue: 'MS'
        },
        {
            value: 'MO',
            viewValue: 'MO'
        },
        {
            value: 'MT',
            viewValue: 'MT'
        },
        {
            value: 'NE',
            viewValue: 'NE'
        },
        {
            value: 'NV',
            viewValue: 'NV'
        },
        {
            value: 'NH',
            viewValue: 'NH'
        },
        {
            value: 'NJ',
            viewValue: 'NJ'
        },
        {
            value: 'NM',
            viewValue: 'NM'
        },
        {
            value: 'NY',
            viewValue: 'NY'
        },
        {
            value: 'NC',
            viewValue: 'NC'
        },
        {
            value: 'ND',
            viewValue: 'ND'
        },
        {
            value: 'MP',
            viewValue: 'MP'
        },
        {
            value: 'OH',
            viewValue: 'OH'
        },
        {
            value: 'OK',
            viewValue: 'OK'
        },
        {
            value: 'OR',
            viewValue: 'OR'
        },
        {
            value: 'PW',
            viewValue: 'PW'
        },
        {
            value: 'PA',
            viewValue: 'PA'
        },
        {
            value: 'PR',
            viewValue: 'PR'
        },
        {
            value: 'RI',
            viewValue: 'RI'
        },
        {
            value: 'SC',
            viewValue: 'SC'
        },
        {
            value: 'SD',
            viewValue: 'SD'
        },
        {
            value: 'TN',
            viewValue: 'TN'
        },
        {
            value: 'TX',
            viewValue: 'TX'
        },
        {
            value: 'UT',
            viewValue: 'UT'
        },
        {
            value: 'VT',
            viewValue: 'VT'
        },
        {
            value: 'VI',
            viewValue: 'VI'
        },
        {
            value: 'VA',
            viewValue: 'VA'
        },
        {
            value: 'WA',
            viewValue: 'WA'
        },
        {
            value: 'WV',
            viewValue: 'WV'
        },
        {
            value: 'WI',
            viewValue: 'WI'
        },
        {
            value: 'WY',
            viewValue: 'WY'
        }
    ]
	
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
		{ value: 'Mr' },		
		{ value: 'Ms' },
		{ value: 'Mrs' },
		{ value: 'Miss' },
	];

	public date	: FormControl;
	

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private fb					: FormBuilder;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		fb						: FormBuilder,
		rt						: Router,
		private ss				: SecurityService,
		private ps				: PatientsService,
		public dialog 			: MatDialog,
	) {
		// Services
		this.fb					= fb;
	}

	//---------------------------------------------------------------------------
	// LifeCycle Handlers
	//---------------------------------------------------------------------------
	ngOnInit() {
		this.GetUserProfile();			
	}

	// Get User Profile
	public GetUserProfile()
	{
		this.ps.GetProfile(this.ss.getCurrentUserApi().PatientID.toString()).subscribe(resp => {
			this.user = resp;
			this.setLinkPicture(resp.Photo);
			console.log(resp);

			// Form Configuration
			this.createForm();
			this.isLoaded = true;
		});
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this.date = new FormControl(new Date(this.user.DOB));

		this._profileForm = this.fb.group({

			'title': [this.user.Title, Validators.compose([
				Validators.minLength(3)
			])
			],

			'firstName': [this.user.FirstName, Validators.compose([
				Validators.minLength(3)
			])
			],
			
			'middleName': [this.user.MiddleName],
			
			'lastName': [this.user.LastName, Validators.compose([
				Validators.minLength(3)
			])
			],

			'dateOfBirth': [this.date.value],

			'gender': [this.user.Gender, Validators.compose([
				Validators.required
			])
			],

			'email': [this.user.Email, Validators.compose([
				Validators.required
			])
			],

			'primaryNumber': [this.user.PrimaryPhone, Validators.compose([
				Validators.required,
				Validators.pattern("^[0-9]*$"),
				Validators.minLength(8),
			])
			],

			'alternateNumber': [this.user.AlternatePhone, Validators.compose([
				Validators.pattern("^[0-9]*$"),
				Validators.minLength(8),
			])
			],

			'address1': [this.user.Address1, Validators.compose([
				Validators.required
			])
			],
			'address2': [this.user.Address2, Validators.compose([
			])
			],
			
			'city': [this.user.City, Validators.compose([
				Validators.required
			])
			],

			'state': [this.user.State, Validators.compose([
				Validators.required
			])
			],

			'zip': [this.user.Zip, Validators.compose([
				Validators.required
			])
			],

			'relationship' : [this.user.Relationship, Validators.compose([Validators.required ])],
			'other' : ['', Validators.compose([Validators.required ])],
			
		});

		
	}

	

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------
	cmdRegisterUser_click() {
		let date = new Date(this._profileForm.controls["dateOfBirth"].value);
		let year = date.getFullYear(); //this will give you full year eg : 1990
		let day = date.getDate(); //gives you the date from 1 to 31
		let month = date.getMonth() + 1;

		let date1 : string = month.toString() + "/" + day.toString() + "/" + year.toString()
		
		let patientInfo : IProfile = {
			PatientID         : this.user.PatientID,
			Title             : this._profileForm.get('title').value,
			FirstName         : this._profileForm.get('firstName').value,
			MiddleName        : this._profileForm.get('middleName').value,
			LastName          : this._profileForm.get('lastName').value,
			DOB               : date1,
			Gender            : this._profileForm.get('gender').value,
			Email             : this._profileForm.get('email').value,
			PrimaryPhone      : this._profileForm.get('primaryNumber').value,
			AlternatePhone    : this._profileForm.get('alternateNumber').value,
			Address1          : this._profileForm.get('address1').value,
			Address2          : this._profileForm.get('address2').value,
			City              : this._profileForm.get('city').value,
			State             : this._profileForm.get('state').value,
			Zip               : this._profileForm.get('zip').value,
			Photo             : '',
			Relationship      : ''
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

	cmdChangePassword_click(){
		let dialogRef = this.dialog.open(DialogChangePasswordComponent, {
			data:{isPatient:true},
			width : "550px",
			});
			dialogRef.afterClosed().subscribe(result => {
			});

	}

	cmdUpdatePhoto_click()
	{
		let dialogRef = this.dialog.open(DialogUploadPhotoComponent, {
			data: {
				patientID: this.ss.getCurrentUserApi().PatientID
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
