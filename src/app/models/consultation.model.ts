//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { ClonableModel }            from './_base/clonable.model';
import { Patient }                  from './patient.model';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class Consultation extends ClonableModel
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private consultationId  : string;
    private patient         : Patient;
    private problem         : string;
    private description     : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(consultation: {});
    //---------------------------------------------------------------------------
    constructor(
        pConsultationId     : string,
        pPatient            : Patient,
        pProblem            : string,
        pDescription        : string
    )
    //---------------------------------------------------------------------------
    constructor(
        pConsultationId?    : string,
        pPatient?           : Patient,
        pProblem?           : string,
        pDescription?       : string
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
    // ConsultationId
    //---------------------------------------------------------------------------
    public get ConsultationId() : string
    {
        return this.consultationId;
    }
    //---------------------------------------------------------------------------
    public set ConsultationId(value: string)
    {
        this.consultationId = value;
    }

    //---------------------------------------------------------------------------
    // Patient
    //---------------------------------------------------------------------------
    public get Patient() : Patient
    {
        return this.patient;
    }
    //---------------------------------------------------------------------------
    public set Patient(value: Patient)
    {
        this.patient = value;
    }

    //---------------------------------------------------------------------------
    // Problem
    //---------------------------------------------------------------------------
    public get Problem() : string
    {
        return this.problem;
    }
    //---------------------------------------------------------------------------
    public set Problem(value: string)
    {
        this.problem = value;
    }


    //---------------------------------------------------------------------------
    // Description
    //---------------------------------------------------------------------------
    public get Description() : string
    {
        return this.description;
    }
    //---------------------------------------------------------------------------
    public set Description(value: string)
    {
        this.description = value;
    }

}
