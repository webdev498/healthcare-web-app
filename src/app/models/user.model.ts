//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { ClonableModel }            from './_base/clonable.model';
import { enumUserRole }             from './enums/enumUserRole';


//-------------------------------------------------------------------------------
// Class Implementation Section
//-------------------------------------------------------------------------------
export class User extends ClonableModel
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private userId              : string;
    private name                : string;
    private avatar              : string;
    private email               : string;
    private password            : string;
    private contactNumber       : string;
    private userRole            : enumUserRole;
    
    private firstName           : string;
    private middleName          : string;
    private lastName            : string;
    private dateOfBirth         : string;
    private gender              : string;
    private insuranceEmployer   : string;
    private addressLine1        : string;
    private addressLine2        : string;
    private city                : string;
    private state               : string;
    private zip                 : string;
    private availability        : boolean;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor();
    //---------------------------------------------------------------------------
    constructor(user: {});
    //---------------------------------------------------------------------------
    constructor(
        pUserId         : string,
        pName           : string,
        pAvatar         : string,
        pEmail          : string,
        pPassword       : string,
        pContactNumber  : string,
        pUserRole       : enumUserRole,
        pState          : string,
    )
    //---------------------------------------------------------------------------
    constructor(
        pUserId?        : string,
        pName?          : string,
        pAvatar?        : string,
        pEmail?         : string,
        pPassword?      : string,
        pContactNumber? : string,
        pUserRole?      : enumUserRole,
        pState?         : string
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

    //---------------------------------------------------------------------------
    // Name
    //---------------------------------------------------------------------------
    public get Name() : string
    {
        return this.name;
    }
    //---------------------------------------------------------------------------
    public set Name(value: string)
    {
        this.name = value;
    }

    //---------------------------------------------------------------------------
    // Avatar
    //---------------------------------------------------------------------------
    public get Avatar() : string
    {
        return this.avatar;
    }
    //---------------------------------------------------------------------------
    public set Avatar(value: string)
    {
        this.avatar = value;
    }

    //---------------------------------------------------------------------------
    // Email
    //---------------------------------------------------------------------------
    public get Email() : string
    {
        return this.email;
    }
    //---------------------------------------------------------------------------
    public set Email(value: string)
    {
        this.email = value;
    }

    //---------------------------------------------------------------------------
    // Password
    //---------------------------------------------------------------------------
    public get Password() : string
    {
        return this.password;
    }
    //---------------------------------------------------------------------------
    public set Password(value: string)
    {
        this.password = value;
    }

    //---------------------------------------------------------------------------
    // ContactNumber
    //---------------------------------------------------------------------------
    public get ContactNumber() : string
    {
        return this.contactNumber;
    }
    //---------------------------------------------------------------------------
    public set ContactNumber(value: string)
    {
        this.contactNumber = value;
    }

    //---------------------------------------------------------------------------
    // UserRole
    //---------------------------------------------------------------------------
    public get UserRole() : enumUserRole
    {
        return this.userRole;
    }
    //---------------------------------------------------------------------------
    public set UserRole(value: enumUserRole)
    {
        this.userRole = value;
    }
    
    //---------------------------------------------------------------------------
    // FirstName
    //---------------------------------------------------------------------------
    public get FirstName() : string
    {
        return this.firstName;
    }
    //---------------------------------------------------------------------------
    public set FirstName(value: string)
    {
        this.firstName = value;
    }
    //---------------------------------------------------------------------------
    // MiddleName
    //---------------------------------------------------------------------------
    public get MiddleName() : string
    {
        return this.middleName;
    }
    //---------------------------------------------------------------------------
    public set MiddleName(value: string)
    {
        this.middleName = value;
    }
    //---------------------------------------------------------------------------
    // LastName
    //---------------------------------------------------------------------------
    public get LastName() : string
    {
        return this.lastName;
    }
    //---------------------------------------------------------------------------
    public set LastName(value: string)
    {
        this.lastName = value;
    }
    //---------------------------------------------------------------------------
    // DateOfBirth
    //---------------------------------------------------------------------------
    public get DateOfBirth() : string
    {
        return this.dateOfBirth;
    }
    //---------------------------------------------------------------------------
    public set DateOfBirth(value: string)
    {
        this.dateOfBirth = value;
    }
     //---------------------------------------------------------------------------
    // Gender
    //---------------------------------------------------------------------------
    public get Gender() : string
    {
        return this.gender;
    }
    //---------------------------------------------------------------------------
    public set Gender(value: string)
    {
        this.gender = value;
    }
    //---------------------------------------------------------------------------
    // InsuranceEmployer
    //---------------------------------------------------------------------------
    public get InsuranceEmployer() : string
    {
        return this.insuranceEmployer;
    }
    //---------------------------------------------------------------------------
    public set InsuranceEmployer(value: string)
    {
        this.insuranceEmployer = value;
    }
    //---------------------------------------------------------------------------
    // AddressLine1
    //-----------------------------AddressLine1----------------------------------------------
    public get AddressLine1() : string
    {
        return this.addressLine1;
    }
    //---------------------------------------------------------------------------
    public set AddressLine1(value: string)
    {
        this.addressLine1 = value;
    }
     //---------------------------------------------------------------------------
    // AddressLine2
    //-----------------------------AddressLine1----------------------------------------------
    public get AddressLine2() : string
    {
        return this.addressLine2;
    }
    //---------------------------------------------------------------------------
    public set AddressLine2(value: string)
    {
        this.addressLine2 = value;
    }
    //---------------------------------------------------------------------------
    // City
    //---------------------------------------------------------------------------
    public get City() : string
    {
        return this.city;
    }
    //---------------------------------------------------------------------------
    public set City(value: string)
    {
        this.city = value;
    }
    //---------------------------------------------------------------------------
    // State
    //---------------------------------------------------------------------------
    public get State() : string
    {
        return this.state; 
    }
    //---------------------------------------------------------------------------
    public set State(value: string)
    {
        this.state = value;
    }
    //---------------------------------------------------------------------------
    // Zip
    //---------------------------------------------------------------------------
    public get Zip() : string
    {
        return this.zip; 
    }
    //---------------------------------------------------------------------------
    public set Zip(value: string)
    {
        this.zip = value;
    }
    public set Availability(value: boolean)
    {
        this.availability = value;
    }
    public get Availability():boolean
    {
        return this.availability;
    }
}
