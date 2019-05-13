//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpParams, } from '@angular/common/http';

//------------------------
// RXJS
//------------------------
import { Observable, throwError } from 'rxjs';

//------------------------
// Models
//------------------------
import { User }                   from '../models/user.model';
import { Patient }                from '../models/patient.model';

//------------------------
// Services
//------------------------
import { SecurityService }          from './security.service';

//------------------------
// Temporal Mockup Data
//------------------------
import { API_URL }                  from '../core/config/config';

import { catchError }               from 'rxjs/operators';
import { ICardInfo }                from '../models/interfaces/patient/cardinfo.interface';
import { IProfile }                 from '../models/interfaces/patient/profile.interface';
import { ISubscriptionInfo }        from '../models/interfaces/patient/subscriptioninfo.interface';
import { IMedicalHistory }          from '../models/interfaces/patient/medicalhistory.interface';
import { IFamilyMember }            from '../models/interfaces/patient/familymember.interface';
import { ResponseDTO }              from '../models/interfaces/useraccount/responseDTO.interface';
import { FamilyMemberInfoDTO }          from '../models/interfaces/patient/family-member-info.interface';
import { IAccountSubscriptionChange }   from '../models/interfaces/patient/account-subscription-change.interface';
import { SubscriptionChangeInfoDTO }    from '../models/interfaces/patient/subscription-change-infoDTO.interface';
import { AccountAddFamilyMemberInfoDTO }from '../models/interfaces/patient/AccountAddFamilyMemberInfoDTO.interface';


//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class PatientsService
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private securityService         : SecurityService;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        ss: SecurityService, 
        private http: HttpClient
    )
    {
        // Services
        this.securityService = ss;
    }

    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    //Gets the patient's profile information
    public GetProfile(patientId? : string): Observable<IProfile>{
        let url = API_URL + 'Patient/GetProfile';
        let patientIdentifier = (patientId != undefined) ? patientId :  this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('patientID', patientIdentifier);
    
        return this.http.get<IProfile>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    //Gets the patient's credit card info
    public GetCreditCardInfo(): Observable<ICardInfo>{
        let url = API_URL + 'Patient/GetCreditCardInfo';
        let patientId = this.securityService.getCurrentUserApi().PatientID;
        let Params = new HttpParams();
        Params = Params.append('patientID', patientId.toString());
    
        return this.http.get<ICardInfo>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    //Gets the patient's subscription info
    public GetSubscriptionInfo(patientId?: string): Observable<ISubscriptionInfo>{
        let url = API_URL + 'Patient/GetSubscriptionInfo';
        let patientIdentifier = (patientId != undefined) ? patientId :  this.securityService.getCurrentUserApi().PatientID.toString();


        let Params = new HttpParams();
        Params = Params.append('patientID', patientIdentifier);
    
        return this.http.get<ISubscriptionInfo>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    //Get the patient's or family member's medical history
    public GetMedicalHistory(patientID : string): Observable<IMedicalHistory>{
        let url = API_URL + 'Patient/GetMedicalHistory';
        let patientIdentifier = (patientID != undefined) ? patientID : this.securityService.getCurrentUserApi().PatientID.toString();
        let Params = new HttpParams();
        Params = Params.append('patientID', patientIdentifier);
    
        return this.http.get<IMedicalHistory>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    //Gets list of family members
    public GetFamilyMemberList(): Observable<IFamilyMember[]>{
        let url = API_URL + 'Patient/GetFamilyMemberList';
        let patientId = this.securityService.getCurrentUserApi().PatientID;
        let Params = new HttpParams();
        Params = Params.append('patientID', patientId.toString());
       
    
        return this.http.get<IFamilyMember[]>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    // Make a family member private
    public MakeFamilyMemberPrivate(familyMemberPatientID : string, familyMemberEmail : string, optionEmailForTesting : string): Observable<ResponseDTO>{
        let url = API_URL + 'Patient/MakeFamilyMemberPrivate';
        
        let patientId = this.securityService.getCurrentUserApi().PatientID;
        let Params = new HttpParams();
        Params = Params.append('primaryPatientID', patientId.toString())
        .append('familyMemberPatientID', familyMemberPatientID)
        .append('familyMemberEmail', familyMemberEmail)
        .append('optionEmailForTesting', optionEmailForTesting);
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }

    //Updates the patient's password
    public UpdatePassword(patientID: string, CurrentPassword:any,NewPassword:any):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/UpdatePassword';
        let content = {
            'ID': patientID,
            'CurrentPassword': CurrentPassword,
            'NewPassword' : NewPassword
        }
        return this.http.post<ResponseDTO>(url,content).pipe(
            catchError(this.handleError)
        )
    }
    //Update the patient's credit card info
    public UpdateCreditCardInfo(creditCard: ICardInfo):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/UpdateCreditCardInfo';
        return this.http.post<ResponseDTO>(url,creditCard).pipe(
            catchError(this.handleError)
        )

    }
    
    //Deactivate a family member
    public DeactivateFamilyMember(familyMemberPatientID:number)
    :Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/DeactivateFamilyMember';
        let primaryPatientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('primaryPatientID', primaryPatientID)
        .append('familyMemberPatientID',familyMemberPatientID.toString());        
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }

    //Reactivate existing deactivated family member
    public ReactivateFamilyMember(familyMemberPatientID:number):Observable<ResponseDTO>
    {
        console.log(this.securityService.getCurrentUserApi().PatientID.toString());
        console.log(familyMemberPatientID);
        
        
        let url = API_URL + 'Patient/ReactivateFamilyMember';
        let Params = new HttpParams();
        Params = Params.append('primaryPatientID', this.securityService.getCurrentUserApi().PatientID.toString())
        .append('familyMemberPatientID',familyMemberPatientID.toString());        
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );

    }
    
    //Removes family member from account
    public RemoveFamilyMember(familyMemberPatientID:number, email : string, newEmail : string):Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/RemoveFamilyMember';
        let patientId = this.securityService.getCurrentUserApi().PatientID;

        let Params = new HttpParams();
        Params = Params.append('primaryPatientID', patientId.toString())
        .append('familyMemberPatientID',familyMemberPatientID.toString())        
        .append('email',email)
        .append('newEmail',newEmail);        
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );

    }
    

    //Cancel's the user's subscription
    public CancelSubcription():Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/CancelSubscription';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        console.log(patientID);
        
        let Params = new HttpParams();
        Params = Params.append('patientID', patientID);     
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );

    }

    //Updates the patient's profile information
    public UpdateProfile(patientInfo : IProfile):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/UpdateProfile';
 
        return this.http.post<ResponseDTO>(url,patientInfo).pipe(
            catchError(this.handleError)
        )
    }
    
    //Update patient's or family member's medical history
    public UpdateMedicalHistory(medicalhistory : IMedicalHistory):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/UpdateMedicalHistory';
 
        return this.http.post<ResponseDTO>(url,medicalhistory).pipe(
            catchError(this.handleError)
        )
    }
    
    //Add a new family member
    public AddFamilyMembers(PrimaryPatientID : number, AdditionalFamilyMembers: FamilyMemberInfoDTO[]):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/AddFamilyMembers';

        let content = {
            'PrimaryPatientID': PrimaryPatientID,
            'AdditionalFamilyMembers': AdditionalFamilyMembers,
        }
        return this.http.post<ResponseDTO>(url,content).pipe(
            catchError(this.handleError)
        )
    }

     //Changes the account subscription to a new subscription
     public ChangeSubscription(accountSubscriptionChange : IAccountSubscriptionChange):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/ChangeSubscription';

        return this.http.post<ResponseDTO>(url,accountSubscriptionChange).pipe(
            catchError(this.handleError)
        )
    }

    //Get the date the user's subscription would end if they cancel their subscription
    public GetCancelSubscriptionDate():Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/GetCancelSubscriptionDate';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('patientID', patientID);     
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }

    //Returns information on if reactivate existing deactivated family member will require an additional cost
    public ReactivateFamilyMemberInfo(familyMemberPatientID : number):Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/ReactivateFamilyMemberInfo';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('patientID', patientID)
        .append('familyMemberPatientID',familyMemberPatientID.toString());        
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }

    public GetAddFamilyMemberInfo():Observable<AccountAddFamilyMemberInfoDTO>
    {
        let url = API_URL + 'Patient/GetAddFamilyMemberInfo';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('primaryPatientID', patientID);
        console.log(patientID);
        
    
        return this.http.get<AccountAddFamilyMemberInfoDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    
    //Provides information to show the user when they select to change a plan
    public GetChangeSubscriptionInfo(newSubscriptionOptionID : number):Observable<SubscriptionChangeInfoDTO>
    {
        let url = API_URL + 'Patient/GetChangeSubscriptionInfo';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('patientID', patientID)
            .append('newSubscriptionOptionID', newSubscriptionOptionID.toString());
    
        return this.http.get<SubscriptionChangeInfoDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Get the private member mail with starts
    public RemovePrivateFamilyMemberInfo(familyMemberPatientID : number):Observable<ResponseDTO>
    {
        let url = API_URL + 'Patient/RemovePrivateFamilyMemberInfo';
        let patientID = this.securityService.getCurrentUserApi().PatientID.toString();
        
        let Params = new HttpParams();
        Params = Params.append('familyMemberPatientID', familyMemberPatientID.toString());
    
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }

    //Add a new family member
    public UpdatePhoto(patientID : number, file : File):Observable<ResponseDTO>{
        let url = API_URL + 'Patient/UpdatePhoto?patientID='+patientID;

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<ResponseDTO>(url,formData).pipe(
            catchError(this.handleError)
        )
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

}
