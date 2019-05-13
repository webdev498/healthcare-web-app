//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }        from '@angular/core';
import { OnInit }           from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }           from '@angular/router';
import { ActivatedRoute } 	from '@angular/router';

@Component({
  selector: 'app-verification-email-sent',
  templateUrl: './verification-email-sent.component.html',
  styleUrls: ['./verification-email-sent.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class VerificationEmailSentComponent implements OnInit {
  //---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public email			: string;

  constructor(
    private rt: Router,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.email = this.ar.snapshot.paramMap.get('email');
  }

  public cmd_Login_click()
  {
    this.rt.navigate(
      [
          '/security/login'
      ])
  }

}
