//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Library
//------------------------
import { Injectable }         from '@angular/core';
import { Observable  }        from 'rxjs';
import { throwError }         from 'rxjs';
import { catchError, retry }  from 'rxjs/operators';
import { map}                 from 'rxjs/operators';

//---------------------------
// Router
//---------------------------
import { Router }            from '@angular/router';

//------------------------
// Services
//------------------------
import { GlobalsService }     from '../core/services/globals.service';

import { LogService }         from '../core/services/log.service';

//------------------------
// API_URL
//------------------------
import { API_URL, RELAY_URL }       from '../core/config/config';

import { HttpClient, HttpParams }   from '@angular/common/http';
import { HttpErrorResponse }        from '@angular/common/http';
import { HttpHeaders }              from '@angular/common/http';


//------------------------
// Models
//------------------------
import { User }               from '../models/user.model';
import { enumUserRole }       from '../models/enums/enumUserRole';
import { ResponseDTO }        from '../models/interfaces/useraccount/responseDTO.interface';
import { LoginVerificationResponseDTO } from '../models/interfaces/useraccount/login-verification-responseDTO.interface';

//------------------------
// Temporal Mockup Data
//------------------------
import * as users                       from './mockups/users.mockup';
import { getPatients }                  from './mockups/patients.mockup';
import { UserInfoDto }                  from '../models/interfaces/useraccount/user-info-dto';
import { UserRegistration }             from '../models/interfaces/useraccount/user-registration.interface';
import { ISubscriptionOption }          from '../models/interfaces/patient/subscriptionoption.interface';
import { SecurityQuestion }             from '../models/interfaces/securityQuestion.interface';
import { AvailableSubscriptionOptions } from '../models/interfaces/useraccount/available-subscription-options';
import { SelfPayBillingInfoDTO }        from '../models/interfaces/useraccount/self-pay-billing-infoDTO.interface';
import { UserSecurityQuestionsDTO }     from '../models/interfaces/securityquestion/user-security-questionsDTO';
import { MedicalHistoryDTO }            from '../models/interfaces/visits/medical-historyDTO.interface';
import { CreatePasswordPageDTO }        from '../models/interfaces/useraccount/create-password-pageDTO.interface';
import { SecurityQuestionAnswersDTO } from '../models/interfaces/securityquestion/security-question-answersDTO';
import { RegistrationDTO } from '../models/interfaces/useraccount/RegistrationDTO.interface';




//-------------------------------------------------------------------------------
// Service Class
//-------------------------------------------------------------------------------
@Injectable()
export class SecurityService
{
    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private username         : string;
    private password         : string;
    private users            : User[];
    private currentUser      : User;
    private subscriptionOption: ISubscriptionOption;
    private globalsService   : GlobalsService;    
    private logService       : LogService;

    private currentUserApi   : UserInfoDto;


    //---------------------------------------------------------------------------
    // Public Properties Section
    //---------------------------------------------------------------------------
    // Subscription
    //---------------------------------------------------------------------------
    public getSubscription() : ISubscriptionOption
    {
        return this.subscriptionOption;
    }
    //---------------------------------------------------------------------------
    public setSubscription(value: ISubscriptionOption)
    {
        this.subscriptionOption = value;
    }
    
    //---------------------------------------------------------------------------
    // UserName
    //---------------------------------------------------------------------------
    public get Username() : string
    {
        return this.username;
    }
    //---------------------------------------------------------------------------
    public set Username(value: string)
    {
        this.username = value;
    }

    //---------------------------------------------------------------------------
    // Password
    //---------------------------------------------------------------------------
    public get Password() : string
    {
        return this.password;
    }
    //---------------------------------------------------------------------------
    public set Password(value: string)
    {
        this.password = value;
    }

    //---------------------------------------------------------------------------
    // CurrentUser
    //---------------------------------------------------------------------------
    public get CurrentUser() : User
    {
       // return this.currentUser;
       return JSON.parse(localStorage.getItem("currentUser"));
    }
    //---------------------------------------------------------------------------
    public set CurrentUser(value: User)
    {
        this.currentUser = value;
    }
    
    public getCurrentUserApi()
    {
        if(!this.currentUserApi){
            let userId = localStorage.getItem("userid");
            console.log(userId);
            
            let isPatient = (this.isPatient()) ? "true" : "false";

            this.GetUserInfo(isPatient,userId).subscribe(resp => {
                console.log(resp);
                if(resp){
                    this.currentUserApi = resp
                }
            })
        }else{
            return this.currentUserApi;
        }
    }
    //---------------------------------------------------------------------------
    public setCurrentUserApi(value: UserInfoDto)
    {
        this.currentUserApi = value;
    }

    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(        
        ls                      : LogService,
        private http            : HttpClient,
        private routerService   : Router,        
    )
    {
        // Services
        this.globalsService = GlobalsService.getInstance();        
        this.logService = ls;


        // Initialize Models
        this.username    = "";
        this.password    = "";
        
        this.currentUser = undefined;

        //esto es de forma temporal hasta que este el endpoint arreglado
        // voy a validar el change role del provider cuando es ambos
        localStorage.setItem('changeToPatient','0');

    }


    //---------------------------------------------------------------------------
    // Public Methods Section
    //---------------------------------------------------------------------------
    public login(pUserEmail: string, pPassword: string) : Observable<string>
    {
        // Prepares Variables
        let retVal   : Observable<string> = null;
        let that     : any = this;
        

        // Builds the Observable
        retVal = Observable.create(observer => {
            let retCode : string = "success";

            this.eMDLogin(pUserEmail, pPassword)
            .subscribe(
                (authenticatedUser: User) => {

                    that.chatService.login(
                        authenticatedUser
                    ).subscribe(
                        (success) => {

                            retCode = "success";
                            observer.next(retCode);
                            observer.complete();
                        },
                        (error) => {
                            retCode = "error";
                            observer.error(retCode);
                        }
                    );
                },
                (error) => {
                    observer.error(`error from eMDLogin() -> ${error}`);
                }
            );
        });

        return retVal;
    }

    //---------------------------------------------------------------------------
    public eMDLogin(pUserEmail: string, pPassword: string) : Observable<User>
    {
        // Prepares Variables
        let retVal   : Observable<User> = null;
        let that     : any = this;       

        // Builds the Observable
        retVal = Observable.create(innerObserver => {
            let retCode : string = "success";

            // Determines (synchronously for the moment)
            // User Identity, Rol and Profile.
            let authenticatedUser : User = this.users.find(
                o => (o.Email == pUserEmail) && (o.Password == pPassword)
            );

            if (!authenticatedUser)
            {
                innerObserver.error("User could not be authenticated");
                return;
            }
            else
            {
                localStorage.setItem('currentUser',JSON.stringify(authenticatedUser))
                
                this.currentUser = authenticatedUser;
                this.globalsService.currentUser = authenticatedUser;

                innerObserver.next(authenticatedUser);
            }
        });

        return retVal;
    }
    public loginEndpoint(email:string, password:string): Observable<any>
    {
        let url = API_URL + 'token';
        let ip = "10.204.1.0" //location.host;
       /* let content = {
            Email: email,
            Password: password,
            Ip: ip
        } */   
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        let content : string = "grant_type=password&username=" + email +"&password="+password+"&ip="+ip  
        return this.http.post(url,content,{headers: headers}).pipe(
            catchError(this.handleError)
        )
    }
    // Returns user information
    GetUserInfo(ispatient: string, userId? : string): Observable<UserInfoDto>{
        let url = API_URL + 'UserAccount/GetUserInfo';       
        
        let userIdentifier = (userId != undefined) ? userId : localStorage.getItem('userid');
       
        
        const params = new HttpParams()
        .set('userID', userIdentifier)
        .set('IsPatient', ispatient);
        return this.http.get<UserInfoDto>(url,{params}).pipe(
            retry(3),
            catchError(this.handleError)
        )
    }
    
    // Gets all avialble subscription plans
    GetAvailablePatientSubscriptions(): Observable<AvailableSubscriptionOptions>{
        let url = API_URL + 'UserAccount/GetAvailablePatientSubscriptions';
        
        return this.http.get<AvailableSubscriptionOptions>(url).pipe(
        catchError(this.handleError)
        )
    }
    
    // Validate Supplied Credit Card and starts selfpaid registration process
    StartSelfPayRegistration(SelfPayBillingInfoDTO : SelfPayBillingInfoDTO): Observable<UserRegistration>{
        let url = API_URL + 'UserAccount/StartSelfPayRegistration';

        return this.http.post<UserRegistration>(url,SelfPayBillingInfoDTO).pipe(
            catchError(this.handleError)
        )
    }
    
    // Takes MPIID and returns the pateint info to fill in the form for step 1 of the prepay registraiton process
    StartPrePayRegistration(MPI : string): Observable<UserRegistration>{
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/StartPrePayRegistration';
        
        Params = Params.append('MPI', MPI);

        return this.http.get<UserRegistration>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    // Validate Promo Code
    ValidatePromoCode(SubscriptionID : number, PromoCode : string): Observable<ResponseDTO>{
        let url = API_URL + 'UserAccount/ValidatePromoCode';
        
        const params = new HttpParams()
            .set('SubscriptionID', SubscriptionID.toString())
            .set('PromoCode', PromoCode);

        return this.http.get<ResponseDTO>(url,{params}).pipe(
        catchError(this.handleError)
        )
    }

    //---------------------------------------------------------------------------
    public isUserAuthenticated() : boolean
    {
        let retVal: boolean = false;

        if(localStorage.getItem('isLoggedin'))
        {
            retVal = true;
        }

        return retVal;
    }

    //---------------------------------------------------------------------------
    public logout() : void
    {        
        localStorage.clear();
        this.logService.logEvent("will logout from app");
        this.routerService.navigate(['/security/login'])
    }


    //---------------------------------------------------------------------------
    // Public Utility Methods Section
    //---------------------------------------------------------------------------
    public getGuid() : string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
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

    
    //---------------------------------------------------------------------------
    // Util methods
    //---------------------------------------------------------------------------
    public isPatient()
    {
        if(localStorage.getItem("role") == "1" || localStorage.getItem("role") == "3"){
            return true;
        }
        return false;
    }
    
    

    //Sends authorization code to user by text message or email.
    public sendCode(userID : number, sendMethod: string, IsPatient: boolean, optionEmailForTesting? : string) : Observable<ResponseDTO>{
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/SendCode';


        Params = Params.append('userID', userID.toString());
        Params = Params.append('sendMethod', sendMethod);
        Params = Params.append('IsPatient', (IsPatient) ? "true" : "false");
        Params = Params.append('optionEmailForTesting', optionEmailForTesting);
        
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Sends authorization code to user by text message or email.
    public authenticateCode(code: string, userID : number) : Observable<ResponseDTO>{
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/AuthenticateCode';

        Params = Params.append('code', code);
        Params = Params.append('userID', userID.toString());
        
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }
    
    //Sends authorization code to user by text message or email on registration process.
    public SendRegistrationCode(verificationID: number, sendMethod : string, phone : string, email: string) : Observable<ResponseDTO>{
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/SendRegistrationCode';

        Params = Params.append('verificationID', verificationID.toString());
        Params = Params.append('sendMethod', sendMethod);
        Params = Params.append('phone', phone);
        Params = Params.append('email', email);
        
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }

    //Sends authorization code to user by text message or email on registration process.
    public AuthenticateRegistrationCode(code: string, codeID : number) : Observable<ResponseDTO>{
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/AuthenticateRegistrationCode';

        Params = Params.append('code', code);
        Params = Params.append('codeID', codeID.toString());
        
        return this.http.get<ResponseDTO>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }

    // Get the email and phone number from user
    public GetUserContactPreference(userID : string): Observable<any>
    {
        let Params = new HttpParams();
        let url = API_URL+'UserAccount/GetUserContactPreference';
        
        Params = Params.append('userID', userID);
        Params = Params.append('IsPatient', "true");

        return this.http.get<any>(url,{params: Params}).pipe(
            catchError(this.handleError)
        );
    }

    // Searches for patient in MPI database. If single match found email is generated and sent to the customer.
    public FindPatient(firstName : string, lastName : string, dob : string, optionEmailForTesting? : string):Observable<ResponseDTO>
    {
        let mail = (optionEmailForTesting != undefined) ? optionEmailForTesting : "";

        let url = API_URL + 'UserAccount/FindPatient';    
        const params = new HttpParams()
            .set('firstName', firstName)
            .set('lastName', lastName)
            .set('dob', dob)
            .set('optionEmailForTesting', mail)
        
        return this.http.get<ResponseDTO>(url,{params}).pipe(
        catchError(this.handleError)
        )
    }

    //Returns full list of all active security quetions.
    SecurityQuestions(): Observable<SecurityQuestion[]>
    {
        let url = API_URL + 'SecurityQuestions';    
        
        return this.http.get<SecurityQuestion[]>(url).pipe(
        catchError(this.handleError)
        );
    }

    // Takes the patient's question object and saves to the database.
    ResetPassword(userID : number, password : string):Observable<ResponseDTO>
    {
        let url = API_URL + 'ForgotPassword/ResetPassword';

        let content = {
            UserID : userID,
            Password: password
            }

        return this.http.post<ResponseDTO>(url,content).pipe(
        catchError(this.handleError)
        )

    }

    //Created for testing purposes only. Deletes patient related to passed MPI.
    DeletPatientByMPI(mpi : string): Observable<ResponseDTO[]>
    {
        let url = API_URL + 'SecurityQuestions';    
        let Params = new HttpParams();
        Params = Params.append('mpi', mpi);
        
        return this.http.get<ResponseDTO[]>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    
    //Searches for patient in MPI database by MPI ID. If single match found email returns patient object.
    FindPatientByMPI(mpi : string): Observable<UserRegistration>
    {
        let url = API_URL + 'SecurityQuestions';    
        let Params = new HttpParams();
        Params = Params.append('mpi', mpi);
        
        return this.http.get<UserRegistration>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }





    
    // Takes patient object and saves to the database.
    RegistrationStep1(user : UserRegistration):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/RegistrationStep1';

        return this.http.post<ResponseDTO>(url,user).pipe(
        catchError(this.handleError)
        )

    }
    // Takes the patient's question object and saves to the database.
    RegistrationStep2(UserSecurityQuestionsDTO : UserSecurityQuestionsDTO):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/RegistrationStep2';

        return this.http.post<ResponseDTO>(url,UserSecurityQuestionsDTO).pipe(
        catchError(this.handleError)
        )

    }

    // 
    RegistrationStep3SelfPay(RegistrationDTO : RegistrationDTO):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/RegistrationStep3SelfPay';

        return this.http.post<ResponseDTO>(url,RegistrationDTO).pipe(
        catchError(this.handleError)
        )
    }
    
    // 
    RegistrationStep3PrePay(RegistrationDTO : RegistrationDTO):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/RegistrationStep3PrePay';

        return this.http.post<ResponseDTO>(url,RegistrationDTO).pipe(
        catchError(this.handleError)
        )
    }
    
    // Takes the patient's medical history and saves to the database.
    RegistrationStep4(MedicalHistoryDTO : MedicalHistoryDTO):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/RegistrationStep4';

        return this.http.post<ResponseDTO>(url,MedicalHistoryDTO).pipe(
        catchError(this.handleError)
        )
    }
    
    // Takes the patient's medical history and saves to the database.
    GetMakePrivateLinkInfo(PasswordID : string):Observable<CreatePasswordPageDTO>
    {
        let url = API_URL + 'UserAccount/GetMakePrivateLinkInfo';

        let Params = new HttpParams();
        Params = Params.append('PasswordID', PasswordID);
        
        return this.http.get<CreatePasswordPageDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );
    }
    
    // Used to create passwords for users sent a password link
    CreatePrivateMemberPassword(PasswordID : string, Password: string):Observable<ResponseDTO>
    {
        let url = API_URL + 'UserAccount/CreatePrivateMemberPassword';
        let content = {
            PasswordID : PasswordID,
            Password: Password
        }

        return this.http.post<ResponseDTO>(url,content).pipe(
            catchError(this.handleError)
        )
    }

    //Find user based on inputs supplied and returns one of their security quetions.
    getSecurityQuestion(user:any): Observable<SecurityQuestionAnswersDTO>
    {    
        let url = API_URL + 'ForgotPassword/GetSecurityQuestion/';
        let Params = new HttpParams();

        // Begin assigning parameters
        Params = Params.append('firstname', user.firstname);
        Params = Params.append('lastname', user.lastname);
        Params = Params.append('dob', user.dob);
        Params = Params.append('email', user.email);
        Params = Params.append('isPatient', user.isPatient);
        
        return this.http.get<SecurityQuestionAnswersDTO>(url,{params: Params}).pipe(
        catchError(this.handleError)
        );

    }

    //Verifies if user submitted correct answer to their security question.
    checkSecurityQuestion(SecurityQuestionAnswersDTO : SecurityQuestionAnswersDTO): Observable<ResponseDTO>
    {    
        let url = API_URL+'ForgotPassword/CheckSecurityQuestion';
    
            return this.http.post<ResponseDTO>(url, SecurityQuestionAnswersDTO).pipe(
                catchError(this.handleError)
            );
    }
}
