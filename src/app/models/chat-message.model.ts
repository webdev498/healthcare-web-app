//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { ClonableModel }            from './_base/clonable.model';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class ChatMessage extends ClonableModel
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private messageKey      : string;
    private createdAt       : number;
    private fromUserId      : string;
    private toUserId        : string;
    private message         : string;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(consultation: {});
    //---------------------------------------------------------------------------
    constructor(
        pMessageKey         : string,
        pCreatedAt          : number,
        pFromUserId         : string,
        pToUserId           : string,
        pMessage            : string
    )
    //---------------------------------------------------------------------------
    constructor(
        pMessageKey?        : string,
        pCreatedAt?         : number,
        pFromUserId?        : string,
        pToUserId?          : string,
        pMessage?           : string
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
    // MessageKey
    //---------------------------------------------------------------------------
    public get MessageKey() : string
    {
        return this.messageKey;
    }
    //---------------------------------------------------------------------------
    public set MessageKey(value: string)
    {
        this.messageKey = value;
    }

    //---------------------------------------------------------------------------
    // CreatedAt
    //---------------------------------------------------------------------------
    public get CreatedAt() : number
    {
        return this.createdAt;
    }
    //---------------------------------------------------------------------------
    public set CreatedAt(value: number)
    {
        this.createdAt = value;
    }

    //---------------------------------------------------------------------------
    // FromUserId
    //---------------------------------------------------------------------------
    public get FromUserId() : string
    {
        return this.fromUserId;
    }
    //---------------------------------------------------------------------------
    public set FromUserId(value: string)
    {
        this.fromUserId = value;
    }

    //---------------------------------------------------------------------------
    // ToUserId
    //---------------------------------------------------------------------------
    public get ToUserId() : string
    {
        return this.toUserId;
    }
    //---------------------------------------------------------------------------
    public set ToUserId(value: string)
    {
        this.toUserId = value;
    }

    //---------------------------------------------------------------------------
    // Message
    //---------------------------------------------------------------------------
    public get Message() : string
    {
        return this.message;
    }
    //---------------------------------------------------------------------------
    public set Message(value: string)
    {
        this.message = value;
    }
}
