//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         		from '@angular/core';
import { OnInit }                   from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }            		from '@angular/router';
import { ActivatedRoute }    		from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }       		from '@angular/forms';
import { FormGroup }         		from '@angular/forms';
import { Validators }        		from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { LogService }               from '../../../core/services/log.service';
import { VisitService }             from '../../../services/visit.service';

//---------------------------
// Models
//---------------------------
import { GenericRecord } 			from '../../../models/interfaces/visits/generic-record.interface';
import { StartVisit } 				from '../../../models/interfaces/visits/start-visit.interface';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-select-reasons-visit',
  templateUrl: './patient-select-reasons-visit.component.html',
  styleUrls: ['./patient-select-reasons-visit.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientSelectReasonsVisitComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public reasons      		: GenericRecord[];
	public reasonSelected		: number[] = [];
	public form           		: FormGroup;
	public patientID            : number;
	public adultID				: number;
	public providerID			: number;
	public isLoaded				: boolean = false;

	//---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
	private routerService	: Router;
	private fb              : FormBuilder;
	private visitService	: VisitService;
	private logService		: LogService;
	

	constructor(
		fb: FormBuilder,
		rt: Router,
		ls: LogService,
		vs : VisitService,
		private ar: ActivatedRoute
	)
	{ 
		// Services
		this.visitService = vs;
		this.logService = ls;
		this.routerService = rt;
		this.fb = fb;
	}

	ngOnInit() {
		this.patientID 	= +this.ar.snapshot.paramMap.get('id');
		this.adultID 	= +this.ar.snapshot.paramMap.get('adultID');
		this.providerID = +this.ar.snapshot.paramMap.get('providerID');

		this.visitService.PatientStartVisitStep4().subscribe(resp => {
			this.reasons = resp;
			console.log(resp);

			this.isLoaded = true;
		});

		// Form Configuration
		this.createForm();
	}

	createForm()
    {
        this.form  = this.fb.group({
			'check'   : ['', Validators.compose([Validators.required ])],
			'other'   : [{value: '', disabled: true}, Validators.compose([Validators.minLength(3)])],
        });
	}
	
	//---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	onSubmit()
    {
		let visit : StartVisit = {
			PatientID 			: this.patientID,
			PatientGuardianID	: this.adultID,
			ProviderID			: this.providerID,
			OtherReasonsForVisit: this.form.controls["other"].value,
			ReasonsForVisit		: this.reasonSelected
		}
		console.log(visit);
		

		this.visitService.PatientStartVisitStep5(visit).subscribe(resp => {
			if(resp){
				console.log(resp);
				
				this.routerService.navigate(
					[
						'/home/patient-home/chat-with-provider/',
						this.patientID,
						this.providerID,
						resp.VisitID,
						this.adultID
					]
				);
			}
		})

		
	}

	changeButton_click(value : any)
    {
		let temp = value.source.value;

		if(value.checked){
			if(!this.reasonSelected.includes(temp))
			{
				this.reasonSelected.push(temp);
			}
		}else{
			var index = this.reasonSelected.indexOf(temp, 0);
			if (index > -1) {
				this.reasonSelected.splice(index, 1);
			}
		}       
	}
	
	enableOther(value : any){
		if(value){
			this.form.controls["other"].enable();
		}else{
			this.form.controls["other"].disable();
		}
	}

	onChangeOther(value : string)
	{
		if(value.length >= 3){
			this.form.controls['check'].setErrors(null);
			this.form.controls['other'].setErrors(null);
		}
	}
}
