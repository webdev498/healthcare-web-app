//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
//------------------------
// RXJS
//------------------------
import { Observable }                from 'rxjs';

//----------------------------------
// Models:
//----------------------------------
import { User }                      from '../../models/user.model';
import { License }                   from '../../models/license.model';
import { PatientPreferences }        from '../../models/patient-preferences.model';
import { ProviderPreferences }       from '../../models/provider-preferences.model';
import { ApplozicMessageIncoming }   from '../../models/interfaces/applozic-message-incoming.interface';


//--------------------------------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------------------------------
export class GlobalsService
{
    //----------------------------------------------------------------------------------------------
    // Static (Singleton Implementation) Properties Section:
    //----------------------------------------------------------------------------------------------
    static instance         : GlobalsService
;
    static isCreating       : Boolean = false;


    //----------------------------------------------------------------------------------------------
    // Private Properties Section:
    //----------------------------------------------------------------------------------------------
    private _currentToken               : string                 = null;
    private _currentUser                : User;
    private _currentLicense             : License;
    private _currentPatientPreferences  : PatientPreferences;
    private _currentProviderPreferences : ProviderPreferences;
    private _applozicEvents             : Observable<string>;
    private _applozicMessages           : Observable<ApplozicMessageIncoming>;
    private _applozicTypingStatus       : Observable<string>;


    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------
    constructor()
    {
        if (!GlobalsService
        .isCreating)
        {
            throw new Error("You can't call this class with 'new' - Use getInstance() instead.. --WV");
        }
        if (!this.currentUser)
        {
            this.currentUser = new User();
        }
    }


    //----------------------------------------------------------------------------------------------
    // (Singleton Implementation) getInstance() Method:
    //----------------------------------------------------------------------------------------------
    static getInstance() : GlobalsService

    {
        if (GlobalsService
        .instance == null)
        {
            GlobalsService
        .isCreating = true;
            GlobalsService
        .instance = new GlobalsService
        ();
            GlobalsService
        .isCreating = false;
        }

        return GlobalsService
    .instance;
    }


    //----------------------------------------------------------------------------------------------
    // Properties Section (currentUserId):
    //----------------------------------------------------------------------------------------------
    // Properties Section (currentToken):
    //----------------------------------------------------------------------------------------------
    public get currentToken() : string
    {
        return this._currentToken;
    }
    //----------------------------------------------------------------------------------------------
    public set currentToken(val: string)
    {
        this._currentToken = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (currentUser):
    //----------------------------------------------------------------------------------------------
    public get currentUser() : User
    {
        return this._currentUser;
    }
    //----------------------------------------------------------------------------------------------
    public set currentUser(val: User)
    {
        this._currentUser = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (currentLicense):
    //----------------------------------------------------------------------------------------------
    public get currentLicense() : License
    {
        return this._currentLicense;
    }
    //----------------------------------------------------------------------------------------------
    public set currentLicense(val: License)
    {
        this._currentLicense = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (currentPatientPreferences):
    //----------------------------------------------------------------------------------------------
    public get currentPatientPreferences() : PatientPreferences
    {
        return this._currentPatientPreferences;
    }
    //----------------------------------------------------------------------------------------------
    public set currentPatientPreferences(val: PatientPreferences)
    {
        this._currentPatientPreferences = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (currentProviderPreferences):
    //----------------------------------------------------------------------------------------------
    public get currentProviderPreferences() : ProviderPreferences
    {
        return this._currentProviderPreferences;
    }
    //----------------------------------------------------------------------------------------------
    public set currentProviderPreferences(val: ProviderPreferences)
    {
        this._currentProviderPreferences = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (applozicEvents)
    //----------------------------------------------------------------------------------------------
    public get applozicEvents() : Observable<string>
    {
        return this._applozicEvents;
    }
    //----------------------------------------------------------------------------------------------
    public set applozicEvents(val: Observable<string>)
    {
        this._applozicEvents = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (applozicMessages)
    //----------------------------------------------------------------------------------------------
    public get applozicMessages() : Observable<ApplozicMessageIncoming>
    {
        return this._applozicMessages;
    }
    //----------------------------------------------------------------------------------------------
    public set applozicMessages(val: Observable<ApplozicMessageIncoming>)
    {
        this._applozicMessages = val;
    }

    //----------------------------------------------------------------------------------------------
    // Properties Section (applozicTypingStatus)
    //----------------------------------------------------------------------------------------------
    public get applozicTypingStatus() : Observable<string>
    {
        return this._applozicTypingStatus;
    }
    //----------------------------------------------------------------------------------------------
    public set applozicTypingStatus(val: Observable<string>)
    {
        this._applozicTypingStatus = val;
    }

}
