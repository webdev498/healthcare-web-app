//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 									from '@angular/core';
import { OnInit } 										from '@angular/core';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog, MatDatepicker } 					from '@angular/material';
import { DialogBillingPoliciesComponent } 				from '../../../components/Dialogs/dialog-billing-policies/dialog-billing-policies.component';
import { DialogMyaccountManageSubscriptionComponent } 	from '../../../components/Dialogs/dialog-myaccount-manage-subscription/dialog-myaccount-manage-subscription.component';

//---------------------------
// Services
//---------------------------
import { PatientsService }								from '../../../services/patients.service';
import { SecurityService }								from '../../../services/security.service';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 									from '@angular/forms';
import { FormGroup } 									from '@angular/forms';
import { FormControl } 									from '@angular/forms';
import { Validators } 									from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }										from '@angular/router';

// ----------------------
// Interfaces
// ----------------------
import { ICardInfo } 									from '../../../models/interfaces/patient/cardinfo.interface';

// ----------------------
// Month and Year picker
// ----------------------
import {MomentDateAdapter} 							from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment 								from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} 									from 'moment';
const moment =  _moment;


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
	  dateInput: 'MM/YYYY',
	},
	display: {
	  dateInput: 'MM/YYYY',
	  monthYearLabel: 'MMM YYYY',
	  dateA11yLabel: 'LL',
	  monthYearA11yLabel: 'MMMM YYYY',
	},
  };


@Component({
	selector: 'app-patient-update-card-information',
	templateUrl: './patient-update-card-information.component.html',
	styleUrls: ['./patient-update-card-information.component.css'],
	providers: [
		// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
		// application's root module. We provide it at the component level here, due to limitations of
		// our example generation script.
		{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
	],
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientUpdateCardInformationComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _form				: FormGroup;
	public creditCard			: ICardInfo;
	public messageUpdateOperation	: string = '';
	public showResultOperation		: boolean = false;
	public resultOperation			: boolean;
	public isLoaded					: boolean = false;
	
	
	public titleAlert			: string = 'This field is required';
	public hideCardNumber		: boolean;
	public hideSecurityCode		: boolean;

	public date = new FormControl(moment());

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------


	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		private fb		: FormBuilder,
		private router	: Router,
		public dialog	: MatDialog,
		private ps		: PatientsService,
		private ss		: SecurityService,
	) {
		this.hideCardNumber 	= true;
		this.hideSecurityCode 	= true;
		// Form Configuration
		this.createForm();
	}

	ngOnInit() {

		this.ps.GetCreditCardInfo().subscribe(resp => {
			this.creditCard = resp;
			console.log(resp);
			
			this.createForm();
			this.isLoaded = true;
		});
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		if(this.creditCard != null){
			let dateString = this.updateDateString(this.creditCard.CardExpirationDate);
			console.log(dateString);
			
			let date = new Date(dateString)
			console.log(date);

			this.date = new FormControl(moment(date));
			console.log(this.date);
			
		}
		

		this._form = this.fb.group({
			'name_card'		: ['',			Validators.required],
			'card_number'	: ['', 			Validators.required],
			'date_exp'		: [this.date.value, 	Validators.required],
			'security_code'	: ['', 	Validators.compose([
				Validators.required, 
				Validators.minLength(3), 		
				Validators.maxLength(3)
			])],
			'bill_address'	: ['', 		Validators.required],
			'bill_city'		: ['', 		Validators.required],
			'bill_state'	: ['', 		Validators.required],
			'bill_zip_code'	: ['', 		Validators.required],
		});

		if(this.creditCard != null){
			this._form.controls['name_card'].setValue(this.creditCard.CardName); 
			this._form.controls['bill_address'].setValue(this.creditCard.BillingAddress); 
			this._form.controls['bill_city'].setValue(this.creditCard.BillingCity); 
			this._form.controls['bill_state'].setValue(this.creditCard.BillingState); 
			this._form.controls['bill_zip_code'].setValue(this.creditCard.BillingZip);
		}

		
	}

	updateDateString(date : string){
		let index = date.indexOf("-");
		if(index >= 0){
			return date.slice(0, index) + '/01/' + date.slice(index+1);
		}else{
			let index = date.indexOf("/");
			return date.slice(0, index) + '/01/' + date.slice(index+1);
		}
	}

	chosenYearHandler(normalizedYear: Moment) {
		const ctrlValue = this.date.value;
		ctrlValue.year(normalizedYear.year());
		this.date.setValue(ctrlValue);
	}
	
	chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
		const ctrlValue = this.date.value;
		ctrlValue.month(normlizedMonth.month());
		this.date.setValue(ctrlValue);
		datepicker.close();
	}




	onSubmit() {
		let dialogRef = this.dialog.open(DialogMyaccountManageSubscriptionComponent, {
			data: {
				animal: ''
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != undefined){
				let Card = {
					PatientID				: this.ss.getCurrentUserApi().PatientID,
					SubscriptionPaymentID 	: this.creditCard.SubscriptionPaymentID,
					CardName              	: this._form.value.name_card,
					CardNumber            	: this._form.value.card_number,
					CardExpirationDate    	: this.date.value.format("MM-YY"),
					CardSecurityCode      	: this._form.value.security_code,
					BillingAddress        	: this._form.value.bill_address,
					BillingCity           	: this._form.value.bill_city,
					BillingState          	: this._form.value.bill_state,
					BillingZip            	: this._form.value.bill_zip_code,
				}
				this.creditCard 	= Card;
				console.log(this.creditCard);

				this.ps.UpdateCreditCardInfo(this.creditCard).subscribe(resp => {
					console.log(resp);
					this.showResultOperation = true;

					if(resp.Message == "Success"){
						this.resultOperation = true;
						this.messageUpdateOperation = "Credit card information updated successfully.";
					}else{
						this.resultOperation = false
						this.messageUpdateOperation = "There was an error in the update."
					}
				})
			}
		});
  
	}
	manageMember() {
		let tabIndex = localStorage.getItem("tabIndex");
		this.router.navigate(['/home/patient-home/patient-myaccount-tab/'+tabIndex]);
	}

	showDialogBillingPolicies() {
		let dialogRef = this.dialog.open(DialogBillingPoliciesComponent, {
			data: {
				animal: ''
			},
			width: "550px",
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	showCharacters(control: string) {
		if (control === "card_number") {
			this.hideCardNumber = false;
		} else {
			this.hideSecurityCode = false;
		}
	}

	hideCharacters(control: string) {
		if (control === "card_number") {
			this.hideCardNumber = true;
		} else {
			this.hideSecurityCode = true;
		}
	}
}
