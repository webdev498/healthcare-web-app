//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';

//------------------------
// RXJS
//------------------------
import { Observable }             from 'rxjs';

//------------------------
// Models
//------------------------
import { Patient }                from '../models/patient.model';
import { Consultation }           from '../models/consultation.model';

//------------------------
// Services
//------------------------
import { SecurityService }        from './security.service';

//------------------------
// Temporal Mockup Data
//------------------------
import * as consultations         from './mockups/consultations.mockup';


//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class ConsultationsService
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private securityService         : SecurityService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(ss: SecurityService)
    {
        // Services
        this.securityService = ss;
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public getPendingConsultations(providerId: string) : Observable<Consultation[]>
    {
        // Prepares Variables
        let retVal   : Observable<Consultation[]> = null;
        let that     : any = this;

        /// TODO: Remove this mockup data:
        let tempConsultations = consultations.getConsultations();

        // Builds the Observable
        retVal = Observable.create(observer => {
            /// TODO: Remove Default Value or set to empty Provider[]
            let retCode : Consultation[] = tempConsultations;

            if (providerId == "")
            {
                observer.error("ConsultationsService::gePendingConsultations(): Provider Id was empty!");
                return;
            }

            // Some Asynchronous stuff here...
            observer.next(retCode);
        });

        return retVal;
    }

}
