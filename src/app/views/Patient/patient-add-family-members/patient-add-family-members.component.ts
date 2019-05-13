//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit, AfterViewInit }    from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                   from '@angular/router';
import { ActivatedRoute }           from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }              from '@angular/forms';
import { FormGroup }                from '@angular/forms';
import { Validators }               from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { SecurityService }          from '../../../services/security.service';

//---------------------------
// Interfaces
//---------------------------
import { IProfile }                 from '../../../models/interfaces/patient/profile.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-patient-add-family-members',
    templateUrl: './patient-add-family-members.component.html',
    styleUrls: ['./patient-add-family-members.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientAddFamilyMembersComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public form: FormGroup;
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


        ;

    public relations = [
        { value: 'Aunt' },
        { value: 'Brother' },
        { value: 'Cousin' },
        { value: 'Daughter' },
        { value: 'Father' },
        { value: 'Foster Child' },
        { value: 'Grandfather' },
        { value: 'Grandmother' },
        { value: 'Husband' },
        { value: 'Legal Dependent' },
        { value: 'Mother' },
        { value: 'Nephew' },
        { value: 'Niece' },
        { value: 'Partner/Significant Other' },
        { value: 'Sister' },
        { value: 'Son' },
        { value: 'Spouse' },
        { value: 'Uncle' },
        { value: 'Wife' },
        { value: 'Other (Write in Box Below)' }
    ]

    public titles = [
        { value: 'Mr.' },
        { value: 'Ms.' },
        { value: 'Mrs.' },
        { value: 'Miss' },

    ];
    public amountMember: number = 0;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService: Router;
    private fb: FormBuilder;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        rt: Router,
        private route: ActivatedRoute,
        private ss: SecurityService
    ) {
        // Services
        this.routerService = rt;
        this.fb = fb;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit() {
        this.amountMember = +this.route.snapshot.paramMap.get('membersAmount');
        // Form Configuration
        this.createForm();
        // this.showDialog();  
    }

    //---------------------------------------------------------------------------
    // creating the Form (Michel)
    //---------------------------------------------------------------------------
    createForm() {
        this.form = this.fb.group({

            'title': ['', Validators.compose([])],
            'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'midleName': [''],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'dateOfBirth': ['', Validators.compose([Validators.required,])],
            'gender': ['', Validators.compose([Validators.required])],
            'phone': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'relationship': ['', Validators.compose([Validators.required])],
            'addressLine1': ['', Validators.compose([])],
            'addressLine2': [''],
            'city': ['', Validators.compose([Validators.required])],
            'state': ['', Validators.compose([Validators.required])],
            'zip': ['', Validators.compose([Validators.required])],

        });
    }
    onPrevious() {
        this.routerService.navigate(['home/patient-home/patient-myaccount-tab']
        );
    }


    onSubmit() {
        let date = new Date(this.form.controls["dateOfBirth"].value);
        let year = date.getFullYear(); //this will give you full year eg : 1990
        let day = date.getDate(); //gives you the date from 1 to 31
        let month = date.getMonth() + 1;

        let date1: string = month.toString() + "/" + day.toString() + "/" + year.toString()

        let patient: IProfile = {
            PatientID: 0,
            Title: this.form.controls["title"].value,
            FirstName: this.form.controls["firstName"].value,
            MiddleName: this.form.controls["midleName"].value,
            LastName: this.form.controls["lastName"].value,
            DOB: date1,
            Gender: this.form.controls["gender"].value,
            Email: "",
            PrimaryPhone: this.form.controls["phone"].value,
            AlternatePhone: "",
            Address1: this.form.controls["addressLine1"].value,
            Address2: this.form.controls["addressLine2"].value,
            City: this.form.controls["city"].value,
            State: this.form.controls["state"].value,
            Zip: this.form.controls["zip"].value,
            Photo: "",
            Relationship: this.form.controls["relationship"].value
        }

        console.log(patient);

        localStorage.setItem('newFamilyMember', JSON.stringify(patient));

        this.routerService.navigate(
            [
                '/home/patient-home/patient-family-member-medical-info/'
            ]
        );
    }


}
