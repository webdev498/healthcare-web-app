//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';

//------------------------
// Models
//------------------------
import { PatientPreferences }     from '../models/patient-preferences.model';
import { Patient }                from '../models/patient.model';


//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class PatientPreferencesService
{
    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor()
    {

    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public getCurrentPreferences(patientId: string) : PatientPreferences
    {
        return new PatientPreferences();
    }

}
