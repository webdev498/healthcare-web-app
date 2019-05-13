//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit, Inject }           from '@angular/core';

//---------------------------
// Material Dialog
//---------------------------
import { MAT_DIALOG_DATA }          from "@angular/material";
import { MatDialogRef }             from "@angular/material";

//---------------------------
// Models
//---------------------------
import { Provider } 				from '../../../models/provider.model';
import { SelectionModel } 			from '@angular/cdk/collections';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-dialog-add-primary-care-provider-search',
  templateUrl: './dialog-add-primary-care-provider-search.component.html',
  styleUrls: ['./dialog-add-primary-care-provider-search.component.css']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class DialogAddPrimaryCareProviderSearchComponent implements OnInit
{
  	//---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public search     		: boolean;
	public selected			: boolean;
	public dontSee			: boolean;
	public add				: boolean;

	public displayedColumns	: string[];
	public dataSource 		: Provider[];
	public selectedProvider	: Provider;
	
	public firstName		: string = "";
	public lastName			: string = "";
	public city				: string = "";
	public state			: string = "";

	public fullName			: string = "";
	public phone			: string = "";


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private dialogRef : MatDialogRef<DialogAddPrimaryCareProviderSearchComponent>;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      dr: MatDialogRef<DialogAddPrimaryCareProviderSearchComponent>,
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
		this.search 	= true;
		this.selected 	= false;
		this.dontSee 	= false;
		this.dontSee 	= false;
		this.displayedColumns = ['name', 'title', 'specialty'];
		this.dataSource = this.data.providers;
		this.selectedProvider = new Provider();
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
	public getColor(row : any)
	{
		if(row.userId == this.selectedProvider.UserId){
			return 'aqua';
		}else{
			return "";
		}
	}
	
	public searchPrimaryCareProvider()
    {
		if(this.add){
			
			let dataProvider = new Provider(
				'100',this.fullName, 'someSpecialty',20,'someavatar','somTitle','someEducation','someNotes'	
			);				
				//this.city,
				//this.state,
				//this.phone

			this.dialogRef.close(dataProvider);
		}
		this.search = false;
		this.add	= true;
	}

	public cmdSelectProvider_click(row : any)
	{
		this.selectedProvider = row;
	}
	
	public dontSeeProvider_click()
	{
		this.dontSee 	= true;
		this.firstName	= "";
		this.lastName	= "";

		this.search = true;
	}

	public selectProvider()
	{
		this.dialogRef.close(this.selectedProvider);
	}

	cancel()
	{
	  this.dialogRef.close();
	}
}
