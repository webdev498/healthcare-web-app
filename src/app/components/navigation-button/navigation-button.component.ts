//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { ViewChild }         from '@angular/core';
import { ElementRef }        from '@angular/core';
import { Input }             from '@angular/core';
import { Output }            from '@angular/core';
import { OnInit }            from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { Subscription, timer } from 'rxjs';
import {MatSnackBar}         from '@angular/material';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-navigation-button',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./navigation-button.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class NavigationButtonComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Component Properties Section
    //---------------------------------------------------------------------------
    @Input("nav-id")         navId          : number;
    @Input("icon")           icon           : string;
    @Input("text")           text           : string;
    @Input("buttonIsOn")     buttonIsOn     : boolean;
    @Input("pendings")       pendings       : number;
    @Input("disabled")       disabled       : number;


    //---------------------------------------------------------------------------
    // Component Events Section
    //---------------------------------------------------------------------------
    @Output() clicked: EventEmitter<number> = new EventEmitter<number>();


    //---------------------------------------------------------------------------
    // Public Properties Section
    //---------------------------------------------------------------------------
    public badge        : HTMLSpanElement;
    public disabledButtons : boolean = false;
    public subscriptionTimer : Subscription;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(public snackBar: MatSnackBar)
    {
        this.buttonIsOn = false;       
        
    }


    //---------------------------------------------------------------------------
    // LifeCycle Event Handler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.disabledButtons = false;

        const source = timer(1000, 1100);
        
        this.subscriptionTimer = source.subscribe(val =>{
            let disButtons = localStorage.getItem("disableButtons");

            if(disButtons == "true"){
                this.disabledButtons = true;
            }else{
                this.disabledButtons = false;
            }
        });
    }

    ngOnDestroy()
    {
        this.subscriptionTimer.unsubscribe();
    }

    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public cmdNav_click()
    {
        let disButtons = localStorage.getItem("disableButtons");
        if(disButtons != "true"){
            this.clicked.emit(this.navId);
        }else{
            this.snackBar.open("You have to complete the visit.", "", {
                duration: 2000,
              });
        }
        
    }

}
