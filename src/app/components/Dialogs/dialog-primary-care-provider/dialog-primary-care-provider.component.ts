//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, Inject }         from '@angular/core';
import { OnInit }                    from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MatDialogRef }              from "@angular/material";
import { MAT_DIALOG_DATA } 		     from "@angular/material";

//---------------------------
// Services
//---------------------------
import { ProvidersService }          from "../../../services/providers.service";


//---------------------------
// Interfaces
//---------------------------
import { IPCP }                      from '../../../models/interfaces/patient/pcp.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-primary-care-provider',
  templateUrl: './dialog-primary-care-provider.component.html',
  styleUrls: ['./dialog-primary-care-provider.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogPrimaryCareProviderComponent implements OnInit
{

    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public firstname		    : string = "";
    public lastname		        : string = "";
    public city		            : string = "";
    public state	            : string = "";
    
    public providerSearched     : IPCP[];
    public providerSelected     : IPCP;
    public providerRowSelected  : number;
    
    public isLoaded             : boolean = false;
    public searched             : boolean = false;
    public operationType        : string = "Search";
    public isSelectDisabled     : boolean = true;
    public States = [
        {
            value: 'AL',
            viewValue: 'AL'
        },
        {
            value: 'AK',
            viewValue: 'AK'
        },
        {
            value: 'AS',
            viewValue: 'AS'
        },
        {
            value: 'AZ',
            viewValue: 'AZ'
        },
        {
            value: 'AR',
            viewValue: 'AR'
        },
        {
            value: 'CA',
            viewValue: 'CA'
        },
        {
            value: 'CO',
            viewValue: 'CO'
        },
        {
            value: 'CT',
            viewValue: 'CT'
        },
        {
            value: 'DE',
            viewValue: 'DE'
        },
        {
            value: 'DC',
            viewValue: 'DC'
        },
        {
            value: 'FM',
            viewValue: 'FM'
        },
        {
            value: 'FL',
            viewValue: 'FL'
        },
        {
            value: 'GA',
            viewValue: 'GA'
        },
        {
            value: 'GU',
            viewValue: 'GU'
        },
        {
            value: 'HI',
            viewValue: 'HI'
        },
        {
            value: 'ID',
            viewValue: 'ID'
        },
        {
            value: 'IL',
            viewValue: 'IL'
        },
        {
            value: 'IN',
            viewValue: 'IN'
        },
        {
            value: 'IA',
            viewValue: 'IA'
        },
        {
            value: 'KS',
            viewValue: 'KS'
        },
        {
            value: 'KY',
            viewValue: 'KY'
        },
        {
            value: 'LA',
            viewValue: 'LA'
        },
        {
            value: 'ME',
            viewValue: 'ME'
        },
        {
            value: 'MH',
            viewValue: 'MH'
        },
        {
            value: 'MD',
            viewValue: 'MD'
        },
        {
            value: 'MA',
            viewValue: 'MA'
        },
        {
            value: 'MI',
            viewValue: 'MI'
        },
        {
            value: 'MN',
            viewValue: 'MN'
        },
        {
            value: 'MS',
            viewValue: 'MS'
        },
        {
            value: 'MO',
            viewValue: 'MO'
        },
        {
            value: 'MT',
            viewValue: 'MT'
        },
        {
            value: 'NE',
            viewValue: 'NE'
        },
        {
            value: 'NV',
            viewValue: 'NV'
        },
        {
            value: 'NH',
            viewValue: 'NH'
        },
        {
            value: 'NJ',
            viewValue: 'NJ'
        },
        {
            value: 'NM',
            viewValue: 'NM'
        },
        {
            value: 'NY',
            viewValue: 'NY'
        },
        {
            value: 'NC',
            viewValue: 'NC'
        },
        {
            value: 'ND',
            viewValue: 'ND'
        },
        {
            value: 'MP',
            viewValue: 'MP'
        },
        {
            value: 'OH',
            viewValue: 'OH'
        },
        {
            value: 'OK',
            viewValue: 'OK'
        },
        {
            value: 'OR',
            viewValue: 'OR'
        },
        {
            value: 'PW',
            viewValue: 'PW'
        },
        {
            value: 'PA',
            viewValue: 'PA'
        },
        {
            value: 'PR',
            viewValue: 'PR'
        },
        {
            value: 'RI',
            viewValue: 'RI'
        },
        {
            value: 'SC',
            viewValue: 'SC'
        },
        {
            value: 'SD',
            viewValue: 'SD'
        },
        {
            value: 'TN',
            viewValue: 'TN'
        },
        {
            value: 'TX',
            viewValue: 'TX'
        },
        {
            value: 'UT',
            viewValue: 'UT'
        },
        {
            value: 'VT',
            viewValue: 'VT'
        },
        {
            value: 'VI',
            viewValue: 'VI'
        },
        {
            value: 'VA',
            viewValue: 'VA'
        },
        {
            value: 'WA',
            viewValue: 'WA'
        },
        {
            value: 'WV',
            viewValue: 'WV'
        },
        {
            value: 'WI',
            viewValue: 'WI'
        },
        {
            value: 'WY',
            viewValue: 'WY'
        }
    ];


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogPrimaryCareProviderComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        dr: MatDialogRef<DialogPrimaryCareProviderComponent>,
        private ps: ProvidersService,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.dialogRef = dr;
    }

    //---------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        if(this.data.pcp){
            this.firstname = this.data.pcp.FirstName;
            this.lastname = this.data.pcp.LastName;
            this.city = this.data.pcp.City;
            this.state = this.data.pcp.State;

            this.operationType = "Save";
        }
        
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    
    public searchPrimaryCareProvider()
    {
        if(this.operationType == "Search"){
            this.ps.PCPSearch(this.firstname, this.lastname, this.city, this.state).subscribe(resp => {
                this.providerSearched = resp;

                console.log(resp);
                
                this.searched = true;
                this.isLoaded = true;
            });
        }else{
            
            let provider : IPCP = {
                    DisplayName     : this.firstname + " " + this.lastname,
                    FirstName       : this.firstname,
                    LastName        : this.lastname,
                    Address1        : "",
                    Address2        : "",
                    Address3        : "",
                    City            : this.city,
                    State           : this.state,
                    Phone           : "",
                    Fax             : "",
                    PracticeName    : "",
                    Specialty       : ""
            }
            this.dialogRef.close(provider);
        }
    }

    public dontSeeProviderCB(event : any)
    {
        console.log(event);
        if(event.checked){
            this.searched = false;
            this.isLoaded = false;
            this.operationType = "Save";
        }
    }

    public selectPrimaryCareProvider()
    {   
        this.dialogRef.close(this.providerSelected);
    }

    public closeDialog() {
        this.dialogRef.close();
    }

    public select(item : any, i : number)
    {
        console.log(item);
        this.providerRowSelected = i;
        this.providerSelected = item;        
        this.isSelectDisabled = false;
    }

}
