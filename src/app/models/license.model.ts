//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { ClonableModel }            from './_base/clonable.model';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class License extends ClonableModel
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private licenseId              : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(user: {});
    //---------------------------------------------------------------------------
    constructor(
        pLicenseId      : string
    )
    //---------------------------------------------------------------------------
    constructor(
        pLicenseId?     : string
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
    // LicenseId
    //---------------------------------------------------------------------------
    public get LicenseId() : string
    {
        return this.licenseId;
    }
    //---------------------------------------------------------------------------
    public set LicenseId(value: string)
    {
        this.licenseId = value;
    }

}
