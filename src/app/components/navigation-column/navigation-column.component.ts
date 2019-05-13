//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { Input }             from '@angular/core';
import { Output }            from '@angular/core';
import { OnInit }            from '@angular/core';
import { EventEmitter }      from '@angular/core';

//---------------------------
// Services
//---------------------------
import { LogService }        from '../../core/services/log.service';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-navigation-column',
  templateUrl: './navigation-column.component.html',
  styleUrls: ['./navigation-column.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class NavigationColumnComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Component Properties Section
    //---------------------------------------------------------------------------
    @Input("nav-buttons") navButtons: any[];

    //---------------------------------------------------------------------------
    // Component Events Section
    //---------------------------------------------------------------------------
    @Output() clicked: EventEmitter<number> = new EventEmitter<number>();


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private logService    : LogService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ls: LogService
    )
    {
        this.navButtons = [];

        // Services
        this.logService = ls;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Event Handler Methods Section
    //---------------------------------------------------------------------------
    ngOnInit()
    {

    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    public navigationButton_click(buttonId: number)
    {
        this.logService.logEvent(buttonId.toString());

        let navButton = this.navButtons.map((value: any, index: number, array: any[]) => {
            if (value.navId !== buttonId)
            {
                value.buttonIsOn = false;
            }
            else
            {
                value.buttonIsOn = true;
            }

            return true
        });
        this.clicked.emit(buttonId);
    }
}
