//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 								from '@angular/core';
import { OnInit } 									from '@angular/core';
import { Location } 								from '@angular/common';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder } 								from '@angular/forms';
import { FormGroup } 								from '@angular/forms';
import { Validators } 								from '@angular/forms';
import { FormControl } 								from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router } 									from '@angular/router';
import { ActivatedRoute } 							from '@angular/router';

// Dialogs
import { MatDialog, MatDatepicker } 				from '@angular/material';
import { DialogCardVerificationErrorComponent } 	from '../../../../components/Dialogs/dialog-card-verification-error/dialog-card-verification-error.component';
import { DialogCardValidationComponent } 			from '../../../../components/Dialogs/dialog-card-validation/dialog-card-validation.component';

//---------------------------
// Services
//---------------------------
import { UserService } 								from '../../../../services/user.service';
import { SecurityService }							from '../../../../services/security.service';

// ----------------------
// Interfaces
// ----------------------
import { ICardInfo } 								from '../../../../models/interfaces/patient/cardinfo.interface';
import { SelfPayBillingInfoDTO }                    from '../../../../models/interfaces/useraccount/self-pay-billing-infoDTO.interface';
import { UserRegistration } from '../../../../models/interfaces/useraccount/user-registration.interface';

@Component({
	selector: 'app-entering-payment-information',
	templateUrl: './entering-payment-information.component.html',
	styleUrls: ['./entering-payment-information.component.css'],
	providers: [
    ],
})

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
export class EnteringPaymentInformationComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _form						: FormGroup;
	public titleAlert					: string = 'This field is required';
	public dialog						: MatDialog;
	public creditCard					: ICardInfo;
	public counter						: number = 0;
	public creditNumber					: number = 123456;
	public total_Subcription			: number = 0;
	public wrongCard					: boolean = false;

	public hideSecurityCode 			: boolean = true;
    public promotionalCode				: string;
    
    public months                       : string[] = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    public years                        : number[] = [];

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
    ];
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private userService		: UserService;
	private fb				: FormBuilder;
	private route			: ActivatedRoute;
	private location		: Location;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		ar: ActivatedRoute,
		fb: FormBuilder,
		us: UserService,
		lc: Location,
		dg: MatDialog,
		private rt: Router,
		private ss: SecurityService
	) {
		// Services
		this.userService 		= us;
		this.fb 				= fb;
		this.route 				= ar;
		this.location 			= lc;
		this.dialog 			= dg;

		// Form Configuration
		this.createForm();
	}

	ngOnInit() {
		this.total_Subcription = +this.route.snapshot.paramMap.get('total');
        this.promotionalCode = this.route.snapshot.paramMap.get('promotionalCode');
        let currentYear = +new Date().getFullYear().toString().substr(-2);

        for (let index = currentYear; index < currentYear+10; index++) {
            this.years.push(index);            
        }
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() {
		this._form = this.fb.group({
			'firstname'			: [null, Validators.required],
			'lastname'			: [null, Validators.required],
			'card_number'		: [null, Validators.required],
			'month'			    : [null, Validators.required],
			'year'			    : [null, Validators.required],
			'bill_address'		: [null, Validators.required],
			'bill_city'			: [null, Validators.required],
			'bill_state'		: [null, Validators.required],
			'bill_zip_code' 	: [null, Validators.required],
			'security_code' 	: [null, Validators.compose([
				Validators.required, Validators.minLength(3), Validators.maxLength(3)
			])]
		});
	}

	//---------------------------------------------------------------------------
	// Event Handler Methods Section
	//---------------------------------------------------------------------------
	onSubmit() {
		let Card : SelfPayBillingInfoDTO = {
            PatientID           : 0,
			CardName            : this._form.value.firstname+" "+this._form.value.lastname,
			CardNumber          : this._form.value.card_number,
            CardExpirationMonth : this._form.value.month,
            CardExpirationYear  : this._form.value.year,
			CardSecurityCode    : this._form.value.security_code,
			BillingAddress      : this._form.value.bill_address,
			BillingCity         : this._form.value.bill_city,
			BillingState        : this._form.value.bill_state,
			BillingZip          : this._form.value.bill_zip_code,
            SubscriptionID		: this.ss.getSubscription().OptionID,
            AdditionalFamilyMembersCount    : 0,
			PromoCode           : this.promotionalCode,
			ResignupCode        : ""
		}

		console.log(Card);

		if (this.counter >= 5) {
			this.showDialog();
		}else{
			this.ss.StartSelfPayRegistration(Card).subscribe(resp => {
                console.log(resp);
                
				if(resp.Message == "Success"){
                    Card.PatientID = resp.PatientID;
                    localStorage.setItem("CreaditCard", JSON.stringify(Card));
                    
                    this.wrongCard = false;
					this.showDialgConfirmation(resp);
					
				}else{
					this.counter++;
					this.wrongCard = true;
                }
                
                /*this.wrongCard = false;
				this.showDialgConfirmation(resp);*/
			})
		}
	}

	goBack(): void {
		this.location.back();
	}

	showDialog() {
		let dialogRef = this.dialog.open(DialogCardVerificationErrorComponent, {
			data: {

			},
			width: "700px"
		});
	}

	showDialgConfirmation(resp : UserRegistration) {
		
		let dialogRef = this.dialog.open(DialogCardValidationComponent, {
			width: "700px",
			data: {
				paymentPlan		: this.ss.getSubscription(),
				creditCardInfo	: this.creditCard
			}
		});
		dialogRef.afterClosed().subscribe(result => {
            if(result != undefined){
                this.rt.navigate([
                    '/security/self-paid/user-registration-2'
                ]);
            }
		});
	}

	showCharacters() {
		this.hideSecurityCode = false;
	}

	hideCharacters() {
		this.hideSecurityCode = true;
	}

}
