//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 					from '@angular/core';
import { OnInit } 						from '@angular/core';

//---------------------------
// Routing
//---------------------------
import { Router } 						from '@angular/router';
import { ActivatedRoute } 				from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService } 				from '../../../services/security.service';


// Interfaces
//---------------------------
import { CreatePasswordPageDTO } 		from '../../../models/interfaces/useraccount/create-password-pageDTO.interface';


@Component({
  selector: 'app-oauth-token',
  templateUrl: './oauth-token.component.html',
  styleUrls: ['./oauth-token.component.scss']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class OauthTokenComponent implements OnInit {

	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
  public oauth_token  : string;
  public userId       : string;
	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------

	//-------------------------------------------------------------------------------
	// Component Class Section
	//-------------------------------------------------------------------------------
	constructor(
		private rt: Router,
		private ss: SecurityService,
		private routerActivate: ActivatedRoute,
	) {

	}

	ngOnInit() {
		this.routerActivate.queryParams.subscribe(params => {
			this.oauth_token = params['oauth_token'];
			this.userId = params['userId'];

      localStorage.setItem("access_token", this.oauth_token);
			localStorage.setItem('authFactor','true');

      this.ss.GetUserInfo("true",this.userId).subscribe(resp => {
				console.log(resp);
				
        if(resp.UserID == +this.userId){
          this.rt.navigate(['/home/patient-home/patient-main'])
        }else{
          this.rt.navigate(['/security/login'])
        }
			})
    }); 
		
	}
}
