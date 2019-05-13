//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         				from '@angular/core';
import { OnInit }            				from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }            				from '@angular/router';

import { DndDropEvent, DropEffect } 		from 'ngx-drag-drop';
import { MatSnackBar } 						from "@angular/material/snack-bar";


//---------------------------
// Dialog
//---------------------------
import { MatDialog }		 				from '@angular/material';
import { DialogDeleteDocumentComponent  } 	from '../../../../components/DialogsProvider/dialog-delete-document/dialog-delete-document.component';
import { DialogAddDocumentComponent } 		from '../../../../components/DialogsProvider/dialog-add-document/dialog-add-document.component';


//---------------------------
// Services
//---------------------------
import { SecurityService }   				from '../../../../services/security.service';
import { GlobalsService }    				from '../../../../core/services/globals.service';
import { LogService }        				from '../../../../core/services/log.service';
import { UserService }       				from '../../../../services/user.service';
import { ProvidersService } from '../../../../services/providers.service';
import { IDocumentListDTO } from '../../../../models/interfaces/provider/documentListDTO';
import { IDocumentDTO } from '../../../../models/interfaces/provider/documentDTO';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-document-library',
  templateUrl: './provider-document-library.component.html',
  styleUrls: ['./provider-document-library.component.scss']
})



//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderDocumentLibraryComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public expanded			: boolean;
	public documents		: IDocumentListDTO;
	public document         : IDocumentDTO;
	public documentSelected	: string;
	public isLoad           : boolean = false;
	public ProviderID       : number;

	private currentDraggableEvent	:DragEvent;
	private currentDragEffectMsg	:string;
	public efectallow				: string = "copyMove";
	public lastDropEvent			:string = "";

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
   


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(      	
		public dialog			: MatDialog,
		private ps      		: ProvidersService,
		private ss      		: SecurityService,
		private snackBarService	:MatSnackBar
	)
    {
	}
    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
		
		this.expanded 	= true;	
		this.GetProviderDocuments();	

	}
	onDragStart( event:DragEvent ) 
	{

		this.currentDragEffectMsg = "";
		this.currentDraggableEvent = event;
		this.lastDropEvent = "";
	
		this.snackBarService.dismiss();
		this.snackBarService.open( "Drag started!", undefined, {duration: 2000} );
	}
	onDragged( $event:DragEvent, effect:string ) 
	{

		this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;
		console.log($event);

		if( effect === "move" ) {

			//const index = list.indexOf( item );
			//list.splice( index, 1 );
		}
	}
	onDragEnd( event:DragEvent ) 
	{
		this.currentDraggableEvent = event;
		this.snackBarService.dismiss();
		this.snackBarService.open( this.currentDragEffectMsg || `Drag ended!`, undefined, {duration: 2000} );
	}
	onDrop( event:DndDropEvent, list?:any[] ) 
	{
		console.log(list);
		console.log(event);
		this.lastDropEvent = event.data;
		console.log(this.lastDropEvent);	
		
	}
	onDragover(event:DragEvent) 
	{    
		console.log("dragover", JSON.stringify(event, null, 2));
	}


	public GetProviderDocuments()
	{
		this.ss.GetUserInfo('false').subscribe(respU => {
			this.ProviderID = respU.ProviderID;
			this.ps.GetProviderDocuments(respU.ProviderID).subscribe(resp =>{
				this.documents = resp;
				if(resp.DocumentList.length > 0)
				{
					this.document = resp.DocumentList.slice(-1)[0];
				}					
								
				this.isLoad = true;
				console.log(resp);				
			})
		})
	}


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	addDocument()
	{
		let dialogRef = this.dialog.open(DialogAddDocumentComponent, {
			data: {providerId: this.ProviderID
			},
		});
		dialogRef.afterClosed().subscribe(result => {			
			this.GetProviderDocuments();			
		});
	}

	viewDocument()
	{
		window.open(this.document.FileLink, '_blank');
	}

	deleteDocument()
	{
		let dialogRef = this.dialog.open(DialogDeleteDocumentComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.ps.DeleteProviderDocument(this.document.ProviderDocumentID).subscribe(resp =>{
					console.log(resp);				
					
					this.GetProviderDocuments();					
				});
				this.documentSelected = "";
			}
		});
	}

	selectDocument(document : IDocumentDTO)
	{
		this.documentSelected = document.FileName;
		this.document = document;
	}
}
