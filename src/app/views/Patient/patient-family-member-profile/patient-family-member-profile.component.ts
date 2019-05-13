//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit } 	from '@angular/core';

//---------------------------
// Router
//---------------------------
import { ActivatedRoute } 		from '@angular/router';

@Component({
	selector: 'app-patient-family-member-profile',
	templateUrl: './patient-family-member-profile.component.html',
	styleUrls: ['./patient-family-member-profile.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientFamilyMemberProfileComponent implements OnInit {
	public patientID: string;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		private router: ActivatedRoute
	) { }

	ngOnInit() {
		this.patientID = this.router.snapshot.paramMap.get('id');
	}

}
