//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';

//------------------------
// Models
//------------------------
import { ProviderPreferences }    from '../models/provider-preferences.model';
import { Provider }               from '../models/provider.model';


//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class ProviderPreferencesService
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
    public getCurrentPreferences(patientId: string) : ProviderPreferences
    {
        return new ProviderPreferences();
    }

}
