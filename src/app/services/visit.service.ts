//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';

//------------------------
// RXJS
//------------------------
import { Observable }             from 'rxjs';
import { throwError}              from 'rxjs';

//------------------------
// API_URL
//------------------------
import { API_URL }                from '../core/config/config';


//------------------------
// HTTP LIBRARY
//------------------------
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse }      from '@angular/common/http';
import { catchError }             from 'rxjs/operators';
import { IVisit }                 from '../models/interfaces/visits/visit.interface';

//------------------------
// INTERFACES
//------------------------
import { PatientVisitSummaryDTO } from '../models/interfaces/patient/patient-visit-summaryDTO.interface';
import { PatientVisitDTO }        from '../models/interfaces/visits/patient-visitDTO.interface';
import { IAddendumDTO }           from '../models/interfaces/visits/AddendumDTO.interface';
import { AbsenceNoteDTO }         from '../models/interfaces/visits/absence-noteDTO.interface';
import { IPatientWaitListDTO }    from '../models/interfaces/visits/patientWaitListDTO.interface';
import { Patientsforvisits }      from '../models/interfaces/visits/patients-for-visits.interface';
import { IProviderInfo }          from '../models/interfaces/provider/provider-info.interface';
import { GenericRecord }          from '../models/interfaces/visits/generic-record.interface';
import { StartVisit }             from '../models/interfaces/visits/start-visit.interface';
import { MedicalHistoryDTO }      from '../models/interfaces/visits/medical-historyDTO.interface';
import { IMedicalHistory }        from '../models/interfaces/patient/medicalhistory.interface';
import { ResponseDTO }            from '../models/interfaces/useraccount/responseDTO.interface';
import { IVisitInfoDTO }          from '../models/interfaces/visits/visitInfoDTO';
import { IEncounterNoteDTO }      from '../models/interfaces/visits/encounterNoteDTO';
import { ICompleteVisitDTO }      from '../models/interfaces/visits/completeVisitDTO';
import { IVisitQuestionnaireDTO } from '../models/interfaces/visits/visitQuestionnaireDTO';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private http: HttpClient
  ) { }

  //Gets list of all patients currently waiting for a specific provider and their wait time
  WaitList(providerId:number): Observable<IPatientWaitListDTO>
  {
    let url = API_URL + 'Visits/WaitList';
    
    //let token = localStorage.getItem('access_token');
    //let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });    

    let Params = new HttpParams();
    Params = Params.append('providerId', providerId.toString());
   
    return this.http.get<IPatientWaitListDTO>(url,{params: Params}).pipe(
      catchError(this.handleError)
    );
  }
  // Returns list of complete or incomplete visits for a specific provider or searches completed visits for all providers by patient name

  public ProviderVisits(providerId:number, completed: string, search? : string, date?: string,date2?: string): Observable<IVisit[]> 
  {
    let url = API_URL + 'Visits/ProviderVisits';
    
    let Params = new HttpParams();
    Params = Params.append('providerID', providerId.toString());
    Params = Params.append('completed', completed);

    if(search != undefined){
      Params = Params.append('search', search);
    }
    
    if(date != undefined){
      Params = Params.append('date', date);
    }
    if(date2 != undefined){
      Params = Params.append('date2', date2);
    }
    
    return this.http.get<IVisit[]>(url,{params: Params}).pipe(
      catchError(this.handleError)
    );

  }
  // Returns list of addenda for a visit
  public GetVisitAddenda(visitId: number):Observable<IAddendumDTO[]>
  {
    let url = API_URL + 'Visits/GetVisitAddenda';
    
    let Params = new HttpParams();
    Params = Params.append('visitID', visitId.toString());    
    return this.http.get<IAddendumDTO[]>(url,{params: Params}).pipe(
      catchError(this.handleError)
    );
  }
  //Updates or creates a visit addendum
  public UpdateVisitAddendum(addenda: IAddendumDTO):Observable<any>
  {
    let url = API_URL + 'Visits/UpdateVisitAddendum';
    return this.http.post(url,addenda).pipe(
      catchError(this.handleError)
    );
  }

  //Returns list of all visits for a patient
  public PatientVisits(patientID : number): Observable<PatientVisitSummaryDTO[]> 
  {
    let url = API_URL + 'Visits/PatientVisits';
    
    let Params = new HttpParams();
    Params = Params.append('patientID', patientID.toString());    
    return this.http.get<PatientVisitSummaryDTO[]>(url,{params: Params}).pipe(
      catchError(this.handleError)
    );
  }

   //Returns the details of a single visit
   public Visit(visitID : number): Observable<PatientVisitDTO> 
   {
     let url = API_URL + 'Visits/Visit';
     
     let Params = new HttpParams();
     Params = Params.append('visitID', visitID.toString());    
     return this.http.get<PatientVisitDTO>(url,{params: Params}).pipe(
       catchError(this.handleError)
     );
   }
   
   //
   public GetPatientAccountVisits(primaryPatientID : number): Observable<IVisit[]> 
   {
     let url = API_URL + 'Visits/GetPatientAccountVisits';
     
     let Params = new HttpParams();
     Params = Params.append('primaryPatientID', primaryPatientID.toString());    
     return this.http.get<IVisit[]>(url,{params: Params}).pipe(
       catchError(this.handleError)
     );
   }

   //Gets a list of all absences notes for a visit
   public getVisitAbsenceNotes(visitID : number): Observable<AbsenceNoteDTO[]> 
   {
     let url = API_URL + 'Visits/GetVisitAbsenceNotes';
     
     let Params = new HttpParams();
     Params = Params.append('visitID', visitID.toString());    
     return this.http.get<AbsenceNoteDTO[]>(url,{params: Params}).pipe(
       catchError(this.handleError)
     );
   }
   //Returns a specific visit absences note
   public GetVisitAbsenceNote(absencesNoteID: number): Observable<AbsenceNoteDTO> 
   {
     let url = API_URL + 'Visits/GetVisitAbsenceNote';
     
     let Params = new HttpParams();
     Params = Params.append('absencesNoteID', absencesNoteID.toString());    
     return this.http.get<AbsenceNoteDTO>(url,{params: Params}).pipe(
       catchError(this.handleError)
     );
   }
   //Updates or creates a visit absence note
   public UpdateVisitAbsencesNote(absen: AbsenceNoteDTO): Observable<ResponseDTO>
   {
      let url = API_URL + 'Visits/UpdateVisitAbsencesNote';
      return this.http.post<ResponseDTO>(url,absen).pipe(
        catchError(this.handleError)
      );
   }

    //Takes loginID and returns patient list
    public PatientStartVisitStep1(): Observable<Patientsforvisits> 
    {
      let url = API_URL + 'Visits/PatientStartVisitStep1';
      
      let Params = new HttpParams();
      Params = Params.append('loginID', localStorage.getItem("loginid"));    
      return this.http.get<Patientsforvisits>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    
    //Takes loginID and returns patient list
    public PatientStartVisitStep2(patientID : string): Observable<IMedicalHistory> 
    {
      let url = API_URL + 'Visits/PatientStartVisitStep2';
      
      let Params = new HttpParams();
      Params = Params.append('patientID', patientID);    
      return this.http.get<MedicalHistoryDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
   
    //Gets list of all avilable providers
    public PatientStartVisitStep3(patientID : string): Observable<IProviderInfo[]> 
    {
      let url = API_URL + 'Visits/PatientStartVisitStep3';
      let Params = new HttpParams();
      Params = Params.append('patientID', patientID);  
      
      return this.http.get<IProviderInfo[]>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    
    //Gets list of reasons for visit
    public PatientStartVisitStep4(): Observable<GenericRecord[]> 
    {
      let url = API_URL + 'Visits/PatientStartVisitStep4';
      
      return this.http.get<GenericRecord[]>(url).pipe(
        catchError(this.handleError)
      );
    }

  //Submits patient info and starts visit
   public PatientStartVisitStep5(visit : StartVisit): Observable<PatientVisitDTO>
   {
      let url = API_URL + 'Visits/PatientStartVisitStep5';
      return this.http.post<PatientVisitDTO>(url,visit).pipe(
        catchError(this.handleError)
      );
   }

   //Returns individual visit addendum
   public GetVisitAddendum(addendumID: number): Observable<IAddendumDTO> 
   {
     let url = API_URL + 'Visits/GetVisitAddendum';
     
     let Params = new HttpParams();
     Params = Params.append('addendumID', addendumID.toString());

     return this.http.get<IAddendumDTO>(url,{params: Params}).pipe(
       catchError(this.handleError)
     );
   }

    //
    public DeleteVisitAddendum(addendumID: number): Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/DeleteVisitAddendum';
      
      let Params = new HttpParams();
      Params = Params.append('addendumID', addendumID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    
    //
    public DeleteVisitAbsencesNote(absenceNoteID: number): Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/DeleteVisitAddendum';
      
      let Params = new HttpParams();
      Params = Params.append('addendumID', absenceNoteID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }

    //Gets the remaining amount of visits an account has left for the cycle
    public GetRemainingVisitCount(loginID: number): Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/GetRemainingVisitCount';
      
      let Params = new HttpParams();
      Params = Params.append('loginID', loginID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    
    
    public ProviderStartVisit(VisitID: number, ProviderID : number): Observable<IVisitInfoDTO> 
    {
      let url = API_URL + 'Visits/ProviderStartVisit';
      
      let Params = new HttpParams();
      Params = Params.append('VisitID', VisitID.toString());
      Params = Params.append('ProviderID', ProviderID.toString());
 
      return this.http.get<IVisitInfoDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    public ProviderEndVisit(VisitID: number):Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/ProviderEndVisit';
      
      let Params = new HttpParams();
      Params = Params.append('VisitID', VisitID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    public AddEncounterNote(encounterNote: IEncounterNoteDTO):Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/AddEncounterNote';      
 
      return this.http.post<ResponseDTO>(url,encounterNote).pipe(
        catchError(this.handleError)
      );
    }
    public AddDiagnosis(VisitID: number, Diagnosis1ID: number, Diagnosis2ID: number):Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/AddDiagnosis';
      
      let Params = new HttpParams();
      Params = Params.append('VisitID', VisitID.toString());
      Params = Params.append('Diagnosis1ID', Diagnosis1ID.toString());
      Params = Params.append('Diagnosis2ID', Diagnosis2ID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    public CompleteVisit(completeVisit: ICompleteVisitDTO):Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/CompleteVisit';     
 
      return this.http.post<ResponseDTO>(url,completeVisit).pipe(
        catchError(this.handleError)
      );
    }    

    public AddQuestionnaire(questionary: IVisitQuestionnaireDTO):Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/AddQuestionnaire';     
 
      return this.http.post<ResponseDTO>(url,questionary).pipe(
        catchError(this.handleError)
      );
    }

    public PollVisitStatus(VisitID: number): Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/PollVisitStatus';
      
      let Params = new HttpParams();
      Params = Params.append('VisitID', VisitID.toString());
 
      return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
      );
    }
    
    
    public GetVisitAvatars(VisitID: number): Observable<ResponseDTO> 
    {
      let url = API_URL + 'Visits/GetVisitAvatars';
      
      let Params = new HttpParams();
      Params = Params.append('VisitID', VisitID.toString());
 
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
  
}
