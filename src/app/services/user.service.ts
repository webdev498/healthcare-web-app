//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable }             from '@angular/core';

//------------------------
// RXJS
//------------------------
import { Observable }            from 'rxjs';
import { Observer }              from 'rxjs';
import { throwError}             from 'rxjs';

//------------------------
// API_URL
//------------------------
import { API_URL, RELAY_URL }     from '../core/config/config';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse }      from '@angular/common/http';
import { HttpHeaders }            from '@angular/common/http';

//------------------------
// Services
//------------------------
import { SecurityService }        from './security.service';

//------------------------
// Models
//------------------------
import { SecurityQuestionAnswersDTO } from '../models/interfaces/securityquestion/security-question-answersDTO';
import { ResponseDTO }            from '../models/interfaces/useraccount/responseDTO.interface';
import { AvailableSubscriptionOptions } from '../models/interfaces/useraccount/available-subscription-options';
import { SecurityQuestion }       from '../models/interfaces/securityQuestion.interface';


import { User }                   from '../models/user.model';
import { IUser }                  from '../models/interfaces/user.interface';
import { catchError }             from 'rxjs/operators';


import { Patient }                from '../models/patient.model';
import { getPatients }            from './mockups/patients.mockup';
import { UserInfoDto } from '../models/interfaces/useraccount/user-info-dto';




//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class UserService {
  // Data that come from user registration
  public userName                 : string;
  public userLastName             : string;
  public userDOB                  : any;
  public paymentPlan              : string;
  public email                    : string;
  public patients                 : Patient[];  
  public patient                  : Patient;

  constructor(
    private http: HttpClient,
    private securityservice : SecurityService
  ) {
    this.patients = getPatients()
   }

  //---------------------------------------------------------------------------
  // Propertis from users (Estas propiedades son globales y se ven donde quiera)
  //---------------------------------------------------------------------------
  getUserName()
  {
    return this.userName;
  }
  setUserName(name: string)
  {
    this.userName = name;
  }
  getUserLastName()
  {
    return this.userLastName;
  }
  setUserLastName(lastName: string)
  {
    this.userLastName = lastName;
  }
  getUserDob()
  {
    return this.userDOB;
  }
  setUserDob(dob: any)
  {
    this.userDOB = dob;
  }
  getPaymentPlant()
  {
    return this.paymentPlan;
  }
  setPaymenPlant(payment: string)
  {
    this.paymentPlan = payment;
  }
  getEmail()
  {
    return this.email;
  }
  setEmail(email: string)
  {
    this.email = email;
  }
  // Aqui voy a trabajar con los patiens
  setPatiens(patientList: Patient[])
  {
    this.patients = patientList;
  }
  getPatiens():Patient[]
  {
    return this.patients;
  }
  setPatient(patient: Patient)
  {
    this.patient = patient;
  }
  getPatient():Patient
  {
    return this.patient;
  }

  //---------------------------------------------------------------------------
  // Public Methods Section
  //---------------------------------------------------------------------------
  // este metodo en realidad tiene que venir del endpoint o sea esto ahora es un fake
  getUser(): Observable<any[]> {
    let url = API_URL + 'useraccount';
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    )
  }
  MedicalIssue(): Observable<any[]>{
    let url = API_URL + 'MedicalIssue';
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    )
  }
  saveUser(user:any): Observable<any>
  {    
    let url = API_URL + 'useraccount/RegistrationStep1';
    return this.http.post(url,user).pipe(
      catchError(this.handleError)
    );

  }
  userData(user:any):Observable<any>
  {   
    let url = API_URL + 'GetSecurityQuestion/'+ user.firstname +'/' + user.lastname;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    )

  }

  

 
  
  passwordResetByUser(newPassword:string): Observable<any>
  {
   
    let url = API_URL + 'ForgotPassword/ResetPassword/' ;
    let content = {
      UserID: localStorage.getItem('UserID'),
      Password: newPassword      
    }  

    let retVal  : Observable<number> = null;
    retVal = Observable.create(observer => {
      let retCode : number = 1;
      observer.next(retCode)
    });
    return retVal;


  /*  return this.http.post<any>(url,content).pipe(
      catchError(this.handleError)
    );*/
  }

  GetAvailablePatientSubscriptions(): Observable<AvailableSubscriptionOptions>
  {
    let url = API_URL + 'UserAccount/GetAvailablePatientSubscriptions';    
    
    return this.http.get<AvailableSubscriptionOptions>(url).pipe(
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
