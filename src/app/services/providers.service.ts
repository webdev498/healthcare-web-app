//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }              from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpParams }  from '@angular/common/http';
import { API_URL }                 from '../core/config/config';                   

//------------------------
// RXJS
//------------------------
import { Observable, throwError } from 'rxjs';
import { catchError }             from 'rxjs/operators';
import { Subject }                from 'rxjs';
import { BehaviorSubject }        from 'rxjs';
//------------------------
// Models
//------------------------
import { User }                   from '../models/user.model';
import { Provider }               from '../models/provider.model';

//------------------------
// Services
//------------------------
import { SecurityService }        from './security.service';

//------------------------
// Temporal Mockup Data
//------------------------
import * as providers             from './mockups/providers.mockup';
import { IVisits }                from '../models/interfaces/visits.interface';
import { Patient }                from '../models/patient.model';


//------------------------
// Interfaces
//------------------------
import { IProviderStatsDto }      from '../models/interfaces/provider/provider-stats-dto.interface';
import { IProviderStatus }        from '../models/interfaces/provider/provider-status.interface';
import { IProviderInfo }          from '../models/interfaces/provider/provider-info.interface';
import { IProviderPreferences } from '../models/interfaces/provider/provider-preferences.interface';
import { IAddendum } from '../models/interfaces/addendum.interface';
import { IPatientWaitInfoDTO } from '../models/interfaces/visits/patientWaitInfoDTO.interface';
import { IPcp } from '../models/interfaces/provider/pcp.interface';
import { PatientVisitDTO } from '../models/interfaces/visits/patient-visitDTO.interface';
import { IQuickPhraseListDTO } from '../models/interfaces/provider/quickPhraseListDTO';
import { IQuickPhraseDTO } from '../models/interfaces/provider/quickPhraseDTO';
import { IDocumentDTO } from '../models/interfaces/provider/documentDTO';
import { IDocumentListDTO } from '../models/interfaces/provider/documentListDTO';
import { ISpecialtiesDTO } from '../models/interfaces/provider/specialtiesDTO';
import { GenericRecord } from '../models/interfaces/visits/generic-record.interface';
import { ResponseDTO } from '../models/interfaces/useraccount/responseDTO.interface';
import { IPasswordDTO } from '../models/interfaces/provider/passwordDTO';




//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class ProvidersService
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private securityService     : SecurityService;
    summaryVisit                : IVisits;
    openChats                   : PatientVisitDTO[] = [];
    available: Subject<boolean> = new BehaviorSubject<boolean>(true);
    adendumList                 : IAddendum[] = [];                   


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(ss: SecurityService, private http: HttpClient)
    {
        // Services
        this.securityService = ss;
    }

    //API OK

    //Returns the providers number of incomplete visits, number of patients in the wait list
    //for the provider and the curent status (available / unavailable) of the provider
    public getStats(providerId : number) : Observable<IProviderStatsDto>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/Stats';

        Params = Params.append('providerID', providerId.toString());

        return this.http.get<IProviderStatsDto>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }

    //Sets the provider's status (available / unavailable)
    public setStatus(providerId : number, available: boolean) : Observable<IProviderStatus>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/SetStatus';

        Params = Params.append('providerID', providerId.toString());
        Params = Params.append('available', available.toString());

        return this.http.get<IProviderStatus>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Gets the provider's profile information
    public getProfile(providerId : number) : Observable<IProviderInfo>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/GetProfile';

        Params = Params.append('providerID', providerId.toString());

        return this.http.get<IProviderInfo>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Gets the provider's preferences
    public getPreferences(providerId : number) : Observable<IProviderPreferences>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/GetPreferences';

        Params = Params.append('providerID', providerId.toString());

        return this.http.get<IProviderPreferences>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
        
    //Updates the provider's profile information
    public updateProfile(providerInfoDTO : IProviderInfo) : Observable<IProviderStatus>{
        let url = API_URL+'Provider/UpdateProfile';

        return this.http.post<IProviderStatus>(url, providerInfoDTO).pipe(
            catchError(this.handleError)
        );
    }
    
    //Updates the provider's preferences
    public updatePreferences(providerPreferences : IProviderPreferences) : Observable<IProviderStatus>{
        let url = API_URL+'Provider/UpdatePreferences';

        return this.http.post<IProviderStatus>(url, providerPreferences).pipe(
            catchError(this.handleError)
        );
    }
    
    //Updates the provider's password
    public updatePassword(PasswordDTO : IPasswordDTO) : Observable<ResponseDTO>{
        let url = API_URL+'Provider/UpdatePassword';

        return this.http.post<ResponseDTO>(url, PasswordDTO).pipe(
            catchError(this.handleError)
        );
    }
    // Takes a provider profile picture as form data and saves it to the uploads directory
    public UpdatePhoto(providerID : number, file : File):Observable<ResponseDTO>{
        let url = API_URL + 'Provider/UpdatePhoto?providerID='+providerID;

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<ResponseDTO>(url,formData).pipe(
            catchError(this.handleError)
        )
    }

    //Gets the provider's response time between two time periods
    public responseTime(providerId : number, startDate: Date, endDate: Date) : Observable<string>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/ResponseTime';


        Params = Params.append('providerID', providerId.toString());
        Params = Params.append('startDate', startDate.toDateString());
        Params = Params.append('endDate', endDate.toDateString());
        
        return this.http.get<string>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Gets the provider's response time between two time periods
    public patientVisits(providerId : number, startDate: string, endDate: string) : Observable<string>{
        let Params = new HttpParams();
        let url = API_URL+'Provider/PatientVisits';


        Params = Params.append('providerID', providerId.toString());
        Params = Params.append('startDate', startDate);
        Params = Params.append('endDate', endDate);
        
        return this.http.get<string>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    //Return QuickPrases
    public GetProviderQuickPhrases(providerID : number):Observable<IQuickPhraseListDTO>
    {
        let Params = new HttpParams();
        let url = API_URL+'Provider/GetProviderQuickPhrases';
        Params = Params.append('providerID', providerID.toString());
        return this.http.get<IQuickPhraseListDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    // Add or Update a quick phrase
    public UpdateProviderQuickPhrase(quickfrase: IQuickPhraseDTO):Observable<IQuickPhraseListDTO>
    {
        let url = API_URL+'Provider/UpdateProviderQuickPhrase';
        return this.http.post<IQuickPhraseListDTO>(url,quickfrase).pipe(
            catchError(this.handleError)
        );

    }
    // Get Provider Document Library
    public GetProviderDocuments(providerID : number):Observable<IDocumentListDTO>
    {
        let url = API_URL+'Provider/GetProviderDocuments';
        let Params = new HttpParams();
        Params = Params.append('providerID', providerID.toString());
        return this.http.get<IDocumentListDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    // Add Provider Document Library
    public AddProviderDocument(providerID : number,file : File):Observable<IDocumentListDTO>
    {
        let url = API_URL+'Provider/AddProviderDocument';
        let Params = new HttpParams();
        Params = Params.append('providerID', providerID.toString());
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<IDocumentListDTO>(url,formData,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    public DeleteProviderDocument(providerDocumentID: number):Observable<IDocumentListDTO>
    {
        let url = API_URL+'Provider/DeleteProviderDocument';
        let Params = new HttpParams();
        Params = Params.append('providerDocumentID', providerDocumentID.toString());
        return this.http.get<IDocumentListDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    public UpdateProviderDocumentSortOrder(providerDocumentID: number,sortOrder:number):Observable<IDocumentListDTO>
    {
        let url = API_URL+'Provider/UpdateProviderDocumentSortOrder';
        let Params = new HttpParams();
        Params = Params.append('providerDocumentID', providerDocumentID.toString());
        Params = Params.append('sortOrder', sortOrder.toString());
        return this.http.get<IDocumentListDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    public GetSpecialties():Observable<ISpecialtiesDTO>
    {
        let url = API_URL+'Provider/GetSpecialties';
        return this.http.get<ISpecialtiesDTO>(url).pipe(
            catchError(this.handleError)
        );
    }
    // Returns list of all ICD 10 Codes
    public GetCodes():Observable<GenericRecord[]>
    {
        let url = API_URL+'Icd10Codes/GetCodes';
        return this.http.get<GenericRecord[]>(url).pipe(
            catchError(this.handleError)
        );
    }
    public Logout(providerID: number): Observable<ResponseDTO>
    {
       let url = API_URL + 'Provider/Logout';
       let Params = new HttpParams();
       Params = Params.append('providerID', providerID.toString());
       
       return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
         catchError(this.handleError)
       );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
    };




    






    // BEFORE API
    /**
     * setSummaryVisits
     */
    public setSummaryVisits(visit: IVisits) {
        this.summaryVisit = visit;
    }
    /**
     * getSummaryVisits
     */
    public getSummaryVisits(): Observable<IVisits> {
        let retVal   : Observable<IVisits> = null;
        let that     : any = this;
        // Builds the Observable
        retVal = Observable.create(observer => {

            let retCode : IVisits = this.summaryVisit; 
           
            observer.next(retCode);
        
        });
        return retVal;        
    }

    public setOpenChat(visit: PatientVisitDTO)
    {
        this.openChats.push(visit);
    }
    /**
     * getOpenChat
     */
    public getOpenChat() {
        return this.openChats;
    }
    public setAvailable(av: boolean){
        this.available.next(av);
    }
    public getAdendum()
    {
        return this.adendumList;
    }
    public setAdendum(adenda: IAddendum)
    {
        this.adendumList.push(adenda);
    }
    
   

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------

    public getMyProviders(patientId: string) : Observable<Provider[]>
    {
        // Prepares Variables
        let retVal   : Observable<Provider[]> = null;
        let that     : any = this;

        /// TODO: Remove this mockup data:
        let tempProviders = providers.getProviders();

        // Builds the Observable
        retVal = Observable.create(observer => {
            /// TODO: Remove Default Value or set to empty Provider[]
            let retCode : Provider[] = tempProviders;

            if (patientId == "")
            {
                observer.error("ProviderService::getMyProviders(): Patient Id was empty!");
                return;
            }

            // Some Asynchronous stuff here...
            observer.next(retCode);
        });

        return retVal;
    }

    //---------------------------------------------------------------------------
    public getAverageResponseTime(providerId: string, starDate: Date, endDate: Date) : Observable<string>
    {
        // Prepares Variables
        let retVal   : Observable<string> = null;
        let that     : any = this;

        // Builds the Observable
        retVal = Observable.create(observer => {
            /// TODO: Remove Default Value or set to 0
            let retCode : string = "08:10";

            if (providerId == "")
            {
                observer.error("ProviderService::getAverageResponseTime(): Provider Id was empty!");
                return;
            }

            // Some Asynchronous stuff here...
            observer.next(retCode);
        });

        return retVal;

    }

     //---------------------------------------------------------------------------
     public getPatientVisits(providerId: string, starDate: Date, endDate: Date) : Observable<string>
     {
        // Prepares Variables
        let retVal   : Observable<string> = null;
        let that     : any = this;

        // Builds the Observable
        retVal = Observable.create(observer => {
            /// TODO: Remove Default Value or set to 0
            let retCode : string = "125";

            if (providerId == "")
            {
                observer.error("ProviderService::getPatientVisits(): Provider Id was empty!");
                return;
            }

            // Some Asynchronous stuff here...
            observer.next(retCode);
        });

        return retVal;
     }
     /**
      * getAvailable
      */
     public getAvailable(): Observable<boolean> {
        
        let retVal   : Observable<boolean>;
        // Builds the Observable
        retVal = Observable.create(observer => {
            /// TODO: Remove Default Value or set to 0
            let retCode  = this.available;
            if(retCode == undefined)
            {
                observer.error('error of availability');                
            }      

           
            observer.next(retCode);
        });

        return retVal;
     }    
     
    //Returns list of all PCPs that match the search terms
    public PCPSearch(firstName? : string, lastName? : string, city? : string, state? : string): Observable<IPcp[]>{
        let url = API_URL + 'PCP/Search';
        
        let Params = new HttpParams();
        if(firstName != ""){
            Params = Params.append('firstName', firstName);
        }
        if(lastName != ""){
            Params = Params.append('lastName', lastName);
        }
        if(city != ""){
            Params = Params.append('city', city);
        }
        if(state != ""){
            Params = Params.append('state', state);
        }
    
        return this.http.get<IPcp[]>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }

}
