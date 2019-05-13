//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { BaseRequestOptions }      from '@angular/http';
import { GlobalsService }          from '../globals.service';


//--------------------------------------------------------------------------------------------------
// Component Class Section:
//--------------------------------------------------------------------------------------------------
export class EMDRequestOptions extends BaseRequestOptions {

	//----------------------------------------------------------------------------------------------
	// Public Fields Section:
	//----------------------------------------------------------------------------------------------
    public token: string;


	//----------------------------------------------------------------------------------------------
	// Private Fields Section:
	//----------------------------------------------------------------------------------------------
    private globals     : GlobalsService;


	//----------------------------------------------------------------------------------------------
	// Constructor Method Section:
	//----------------------------------------------------------------------------------------------
    constructor (verb: string, EMDOptions?: any) {

        super();

        this.globals = GlobalsService.getInstance();
        this.token = this.globals.currentToken;

        if (verb == "GET")
        {
            this.headers.append('Content-Type', 'application/json');
        }
        else
        {
            this.headers.append('Accept', 'application/json');
            this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        }

        this.headers.append('Authorization', 'Bearer ' + this.token );

        if (EMDOptions != null) {

            for (let option in EMDOptions) {
                let optionValue = EMDOptions[option];
                this[option] = optionValue;
            }
        }
    }
}
