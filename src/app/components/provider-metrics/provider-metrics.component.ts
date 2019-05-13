//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';
import { Input }             from '@angular/core';

//---------------------------
// Servicios
//---------------------------
import { ProvidersService }  from '../../services/providers.service';
import { LogService }        from '../../core/services/log.service';
import { SecurityService } from '../../services/security.service';



//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-metrics',
  templateUrl: './provider-metrics.component.html',
  styleUrls: ['./provider-metrics.component.scss']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ProviderMetricsComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Component Properties Section
    //---------------------------------------------------------------------------
   // @Input("providerId") providerId    : number;

    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public dtAverageResponseTimeStart  : Date;
    public dtAverageResponseTimeEnd    : Date;
    public dtPatientVisitsStart        : Date;
    public dtPatientVisitsEnd          : Date;

    public averageResponseTime         : string;
    public patientVisits               : string;


    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private providersService    : ProvidersService;
    private logService          : LogService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ps          : ProvidersService,
        ls          : LogService,
        private ss  : SecurityService
    )
    {
        // Models (Defaults)
        this.dtAverageResponseTimeStart   = this.getDateForToday(-3);
        this.dtAverageResponseTimeEnd     = new Date();

        this.dtPatientVisitsStart         = this.getDateForToday(-3)
        this.dtPatientVisitsEnd           = new Date();

        this.averageResponseTime          = "00:00";
        this.patientVisits                = "0";

        // Services
        this.providersService             = ps;
        this.logService                   = ls;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        this.updateAverageResponseTime();
        this.updatePatientVisits();
        
        
    }

    //---------------------------------------------------------------------------
    // Eventhandler Methods Section
    //---------------------------------------------------------------------------
    public averageResponseStart_closed()
    {
        console.log('michelito');
        
        this.updateAverageResponseTime();
    }

    //---------------------------------------------------------------------------
    public averageResponseEnd_closed()
    {
        this.updateAverageResponseTime();
    }

    //---------------------------------------------------------------------------
    public patientVisitsStart_closed()
    {
        
        this.updatePatientVisits();
    }

    //---------------------------------------------------------------------------
    public patientVisitsEnd_closed()
    {
        this.updatePatientVisits();
    }


    //---------------------------------------------------------------------------
    // Private Methods Section
    //---------------------------------------------------------------------------
    private updateAverageResponseTime() : void
    {        
        this.ss.GetUserInfo('false').subscribe(respU =>{
            console.log(respU);     
            this.providersService.responseTime(
                respU.ProviderID,
                this.dtAverageResponseTimeStart,
                this.dtAverageResponseTimeEnd)
                .subscribe(resp =>{
                    console.log(resp);
                    this.averageResponseTime = resp;
                },
                (error) => {
                    this.logService.logError(error);
                })       
        });       
        
    }

    //---------------------------------------------------------------------------
    private updatePatientVisits() : void
    {       
        this.ss.GetUserInfo('false').subscribe(respU =>{
            console.log(respU);     
            this.providersService.responseTime(
                respU.ProviderID,
                this.dtPatientVisitsStart,
                this.dtPatientVisitsEnd)
                .subscribe(resp =>{
                    console.log(resp);
                    this.patientVisits = resp;
                },
                (error) => {
                    this.logService.logError(error);
                })       
        });
    }

    //---------------------------------------------------------------------------
    // Private (Utility) Methods Section
    //---------------------------------------------------------------------------
    private getDateForToday(offset: number) : Date
    {
        let currentDate = new Date();
        let day         = currentDate.getDate();
        let month       = (currentDate.getMonth() + 1);
        let year        = currentDate.getFullYear();

        return (new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * offset));
    }
}
