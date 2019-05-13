//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { User }                         from './user.model';

import { enumProviderAvailability }     from './enums/enumProviderAvailability';
import { enumProviderStatus }           from './enums/enumProviderStatus';

//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class Provider extends User
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private specialty       : string;
    private rating          : number;

   // private availability    : boolean;//enumProviderAvailability;
    private status          : enumProviderStatus;
    private title           : string;
    private education       : string;
    private notes           : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(physician: {});
    //---------------------------------------------------------------------------
    constructor(
        pUserId      : string,
        pName        : string,
        pSpecialty   : string,
        pRating      : number,
        pAvatar      : string,
        title        : string,
        education    : string,
        notes        : string
    )
    //---------------------------------------------------------------------------
    constructor(
        pUserId?     : string,
        pName?       : string,
        pSpecialty?  : string,
        pRating?     : number,
        pAvatar?     : string,
        pTitle?      : string,
        pEducation?  : string,
        pNotes?      : string,
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

       // this.availability = true;
        this.status       = enumProviderStatus.Idle;

        this.title        = pTitle;
        this.education    = pEducation;
        this.notes        = pNotes;
    }


    //---------------------------------------------------------------------------
    // Public Properties Section
    //---------------------------------------------------------------------------
    // Specialty
    //---------------------------------------------------------------------------
    public get Specialty() : string
    {
        return this.specialty;
    }
    //---------------------------------------------------------------------------
    public set Specialty(value: string)
    {
        this.specialty = value;
    }

    //---------------------------------------------------------------------------
    // Rating
    //---------------------------------------------------------------------------
    public get Rating() : number
    {
        return this.rating;
    }
    //---------------------------------------------------------------------------
    public set Rating(value: number)
    {
        this.rating = value;
    }

    //---------------------------------------------------------------------------
    // Availability
    //---------------------------------------------------------------------------
   /* public get Availability() : boolean
    {
        return this.availability;
    }
    //---------------------------------------------------------------------------
    public set Availability(value: boolean)
    {
        this.availability = value;
    }*/

    //---------------------------------------------------------------------------
    // Status
    //---------------------------------------------------------------------------
    public get Status() : enumProviderStatus
    {
        return this.status;
    }
    //---------------------------------------------------------------------------
    public set Status(value: enumProviderStatus)
    {
        this.status = value;
    }

    //---------------------------------------------------------------------------
    // Title
    //---------------------------------------------------------------------------
    public get Title() : string
    {
        return this.title;
    }
    //---------------------------------------------------------------------------
    public set Title(value: string)
    {
        this.title = value;
    }

    //---------------------------------------------------------------------------
    // Education
    //---------------------------------------------------------------------------
    public get Education() : string
    {
        return this.education;
    }
    //---------------------------------------------------------------------------
    public set Education(value: string)
    {
        this.education = value;
    }

    //---------------------------------------------------------------------------
    // Notes
    //---------------------------------------------------------------------------
    public get Notes() : string
    {
        return this.notes;
    }
    //---------------------------------------------------------------------------
    public set Notes(value: string)
    {
        this.notes = value;
    }

}
