//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                from '@angular/core';
import { OnInit }                   from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                   from '@angular/router';
import { ActivatedRoute }           from '@angular/router';

//---------------------------
// Models
//---------------------------
import { ISpecialtiesDTO }          from '../../../models/interfaces/provider/specialtiesDTO';

//---------------------------
// Services
//---------------------------
import { VisitService }             from '../../../services/visit.service';
import { LogService }               from '../../../core/services/log.service';
import { IProviderInfo }            from '../../../models/interfaces/provider/provider-info.interface';
import { ProvidersService }         from '../../../services/providers.service';
import { timer, Subscription } from 'rxjs';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
    selector: 'app-patient-providers',
    templateUrl: './patient-providers.component.html',
    styleUrls: ['./patient-providers.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientProvidersComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public providers        : IProviderInfo[] = [];
    public specialties      : ISpecialtiesDTO;
    public patientID        : string;
    public adultID          : number;
    public isLoaded         : boolean = false;
    public error            : string = "false";
    public subscriptionTimer: Subscription;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    private visitService    : VisitService;
    private logService      : LogService;

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        rt: Router,
        vs: VisitService,
        ls: LogService,
        private route: ActivatedRoute,
        private providerService : ProvidersService,
    ) {
        // Services
        this.routerService = rt;
        this.visitService = vs;
        this.logService = ls;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit() {
        this.patientID = this.route.snapshot.paramMap.get('id');
        this.adultID = +this.route.snapshot.paramMap.get('adultID');
        this.error = this.route.snapshot.paramMap.get('error');

        this.getMyProviders();

        const source = timer(10000, 15000);
        let temp = 0;
        this.subscriptionTimer = source.subscribe(val =>{
            this.getMyProviders();
        } );
    }

    ngOnDestroy()
    {
        this.subscriptionTimer.unsubscribe();
    }

    //---------------------------------------------------------------------------
    private getMyProviders(): void {
        this.visitService.PatientStartVisitStep3(this.patientID)
            .subscribe(
                (data) => {
                    this.providers = data;
                    console.log(data);

                    this.providerService.GetSpecialties().subscribe(resp => {
                        this.specialties = resp;
                        console.log(resp);

                        this.isLoaded = true;
                    })
                },
                (error) => {
                    this.logService.logError(error);
                }
        );
    }
    
    
    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    public cmdChatWithPatient_click(providerID: string) {
        this.routerService.navigate(
            [
                '/home/patient-home/patient-select-reasons-visit/', 
                this.patientID,
                this.adultID,
                providerID
            ]
        );
    }


    


    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    /*public getEnumProviderAvailability(availability: number): string {
        return enumProviderAvailability[availability];
    }

    //---------------------------------------------------------------------------
    public getEnumProviderStatus(status: number): string {
        return enumProviderStatus[status];
    }*/


}
