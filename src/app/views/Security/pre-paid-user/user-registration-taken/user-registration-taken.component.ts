//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 		from '@angular/core';
import { OnInit } 			from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router } 			from '@angular/router';


// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
	selector: 'app-user-registration-taken',
	templateUrl: './user-registration-taken.component.html',
	styleUrls: ['./user-registration-taken.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistrationTakenComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private routerService	: Router;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		rt: Router,
	) {
		// Services
		this.routerService = rt;
	}
	//---------------------------------------------------------------------------
	// LifeCycle Handlers
	//---------------------------------------------------------------------------
	ngOnInit() {
		// Debug:
	}

	onClick()
	{
		return this.routerService.navigateByUrl('/security/login');
	}

}
