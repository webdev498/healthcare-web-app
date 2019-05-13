//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { ClonableModel }            from './_base/clonable.model';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class PatientPreferences extends ClonableModel
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private userId                  : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(user: {});
    //---------------------------------------------------------------------------
    constructor(
        pUserId      : string
    )
    //---------------------------------------------------------------------------
    constructor(
        pUserId?     : string
    )
    //---------------------------------------------------------------------------
    {
        super();

        let args = Array.prototype.slice.call(arguments);
        if ((typeof(args[0]) !== "object"))
        {
            // Construye desde Argumentos:
            this.loadPropertiesFromParams(args, this.getParamNames(this.constructor));
        }
        else
        {
            // Construye desde Objeto:
            this.loadPropertiesFromObject(args[0]);
        }
    }

    //---------------------------------------------------------------------------
    // Public Properties Section
    //---------------------------------------------------------------------------
    // UserId
    //---------------------------------------------------------------------------
    public get UserId() : string
    {
        return this.userId;
    }
    //---------------------------------------------------------------------------
    public set UserId(value: string)
    {
        this.userId = value;
    }

}
