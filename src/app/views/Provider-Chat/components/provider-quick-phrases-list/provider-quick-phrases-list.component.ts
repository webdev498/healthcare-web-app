//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         				from '@angular/core';
import { OnInit }            				from '@angular/core';

import { DndDropEvent, DropEffect } 		from 'ngx-drag-drop';
import { MatSnackBar } 						from "@angular/material/snack-bar";

//---------------------------
// Router
//---------------------------
import { Router }            				from '@angular/router';


//---------------------------
// Dialog
//---------------------------
import { MatDialog }		 				from '@angular/material';
import { DialogAddQuickPhraseComponent } 	from '../../../../components/DialogsProvider/dialog-add-quick-phrase/dialog-add-quick-phrase.component';
import { DialogDeleteQuickPhraseComponent } from '../../../../components/DialogsProvider/dialog-delete-quick-phrase/dialog-delete-quick-phrase.component';


//---------------------------
// Services
//---------------------------
import { SecurityService }   				from '../../../../services/security.service';
import { GlobalsService }    				from '../../../../core/services/globals.service';
import { LogService }        				from '../../../../core/services/log.service';
import { UserService }       				from '../../../../services/user.service';
import { IQuickPhraseListDTO } from '../../../../models/interfaces/provider/quickPhraseListDTO';
import { ProvidersService } from '../../../../services/providers.service';
import { IQuickPhraseDTO } from '../../../../models/interfaces/provider/quickPhraseDTO';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-quick-phrases-list',
  templateUrl: './provider-quick-phrases-list.component.html',
  styleUrls: ['./provider-quick-phrases-list.component.scss']
})


//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderQuickPhrasesListComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
	public expanded					: boolean;
	public phrases					: IQuickPhraseListDTO;
	public phrase					: IQuickPhraseDTO;
	public selectedPhraseObjet	    : IQuickPhraseDTO;
	public phraseSelected			: string;
	public ProviderID               : number;
	public isLoad                   : boolean = false;

	private currentDraggableEvent:DragEvent;
	private currentDragEffectMsg:string;
	public efectallow: string = "copyMove";
	public lastDropEvent:string = "";
	

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      	private rt: Router,
      	private ss: SecurityService,
      	private ls: LogService,
		private us: UserService,
		private ps: ProvidersService,
		public dialog: MatDialog,
		private snackBarService:MatSnackBar
	)
    {
		
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {		
		this.expanded 	= true;	
		this.GetProviderQuickPhrases();	
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
		
		
		/*if( list
		  && (event.dropEffect === "copy"
			|| event.dropEffect === "move") ) {
	
		  let index = event.index;
	
		  if( typeof index === "undefined" ) {
	
			index = list.length;
		  }
	
		  list.splice( index, 0, event.data );
			}*/
	}
	onDragover(event:DragEvent) 
	{
    
		console.log("dragover", JSON.stringify(event, null, 2));
	}


	GetProviderQuickPhrases()
	{
		this.ss.GetUserInfo('false').subscribe(respU => {
			this.ProviderID = respU.ProviderID;
			this.ps.GetProviderQuickPhrases(respU.ProviderID).subscribe(resp =>{
				this.phrases = resp;
				if(resp.QuickPhraseList.length > 0)
				{
					this.phrase = resp.QuickPhraseList.slice(-1)[0];
				}
						
								
				this.isLoad = true;
				console.log(resp);				
			})
		})
	}

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
	addPhrase()
	{
		let dialogRef = this.dialog.open(DialogAddQuickPhraseComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {						
				
				let quickPhrase: IQuickPhraseDTO = {
					ProviderID  : this.ProviderID,
					PhraseID    : 0,
					Phrase      : result,
					SortOrder   : this.phrase != undefined? this.phrase.SortOrder + 1:0,
					IsDisplayed : true
				}
				this.ps.UpdateProviderQuickPhrase(quickPhrase).subscribe(resp =>{
					console.log(resp);
					this.GetProviderQuickPhrases();					
				})
			}
		});
	}

	editPhrase()
	{
		let dialogRef = this.dialog.open(DialogAddQuickPhraseComponent, {
			data: {
				'phrase' : this.phraseSelected
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				console.log(result);
				this.selectedPhraseObjet.Phrase = result
				this.ps.UpdateProviderQuickPhrase(this.selectedPhraseObjet)
				.subscribe(resp =>{
					console.log(resp);					
					this.GetProviderQuickPhrases();
				});
				
				this.phraseSelected = "";
			}
		});
	}

	deletePhrase(ev)
	{
		let dialogRef = this.dialog.open(DialogDeleteQuickPhraseComponent, {
			data: {
			},
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				this.selectedPhraseObjet.IsDisplayed = false;
				this.ps.UpdateProviderQuickPhrase(this.selectedPhraseObjet)
				.subscribe(resp =>{
					console.log(resp);					
					this.GetProviderQuickPhrases();
				});
				this.phraseSelected = "";
			}
		});
	}

	selectPhrase(item: IQuickPhraseDTO)
	{
		this.phraseSelected = item.Phrase;	
		this.selectedPhraseObjet = item;
	}
}
