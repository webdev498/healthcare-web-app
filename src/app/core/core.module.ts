//---------------------------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------------------------
import { NgModule }                      from '@angular/core';

import { CommonModule } from '@angular/common';

//http
//import { HttpClientModule }              from '@angular/common/http';
// Angular Material Components
import { MaterialModule }                  from './material/material.module';

// ngx-infite-scroll
import { InfiniteScrollModule }            from 'ngx-infinite-scroll';


// Core Services
import { ValidatorsLibrary }             from './services/validators.service'
import { LogService }                    from './services/log.service';

// Own Components

import { NavigationButtonComponent }                  from '../components/navigation-button/navigation-button.component';
import { NavigationColumnComponent }                  from '../components/navigation-column/navigation-column.component';



//---------------------------------------------------------------------------------------
// Module Section
//---------------------------------------------------------------------------------------
@NgModule({
    declarations: [
      
      NavigationButtonComponent,
      NavigationColumnComponent,      

    ],
    imports: [
      MaterialModule,
      CommonModule,
      InfiniteScrollModule,     
      

    ],
    exports: [
     
      NavigationButtonComponent,
      NavigationColumnComponent,
      InfiniteScrollModule            

    ],
    providers: [ LogService ]
  })
  //---------------------------------------------------------------------------------------
  // Class Section
  //---------------------------------------------------------------------------------------
  export class CoreModule { }
