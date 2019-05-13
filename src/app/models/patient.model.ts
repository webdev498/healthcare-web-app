//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { User }         from './user.model';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class Patient extends User
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private sex         : string;
    private age         : number;
    private membership  : string;
    private active      : number;  
    private privateUser : boolean;      


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(patient: {});
    //---------------------------------------------------------------------------
    constructor(
        pUserId      : string,
        pName        : string,
        pSex         : string,
        pAge         : number,
        pAvatar      : string,
        membership   : string,
        active       : number,
        privateUser  : boolean
    )
    //---------------------------------------------------------------------------
    constructor(
        pUserId?     : string,
        pName?       : string,
        pSex?        : string,
        pAge?        : number,
        pAvatar?     : string,
        pMembership? : string,
        pActive?     : number,
        pPrivateUser?: boolean,
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
    // Sex
    //---------------------------------------------------------------------------
    public get Sex() : string
    {
        return this.sex;
    }
    //---------------------------------------------------------------------------
    public set Sex(value: string)
    {
        this.sex = value;
    }

    //---------------------------------------------------------------------------
    // Age
    //---------------------------------------------------------------------------
    public get Age() : number
    {
        return this.age;
    }
    //---------------------------------------------------------------------------
    public set Age(value: number)
    {
        this.age = value;
    }

    //---------------------------------------------------------------------------
    // Membership
    //---------------------------------------------------------------------------
    public get Membership() : string
    {
        return this.membership; 
    }
    //---------------------------------------------------------------------------
    public set Membership(value: string)
    {
        this.membership = value;
    }

    //---------------------------------------------------------------------------
    // Active
    //---------------------------------------------------------------------------
    public set Active(value:number)
    {
        this.active = value;
    }
    public get Active():number{
        return this.active;
    }

    //---------------------------------------------------------------------------
    // PrivateUser
    //---------------------------------------------------------------------------
    public set PrivateUser(value:boolean)
    {
        this.privateUser = value;
    }
    public get PrivateUser():boolean{
        return this.privateUser;
    }
}
