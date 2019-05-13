//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }                            from '@angular/core';
import { OnInit }                               from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }                               from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }                          from '@angular/forms';
import { FormGroup }                            from '@angular/forms';
import { Validators }                           from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { SecurityService }                      from '../../../../services/security.service';
import { UserService }                          from '../../../../services/user.service';

//---------------------------
// Dialogs
//---------------------------
import { MatDialog }                            from '@angular/material';
import { DialogCodeVerificationSentComponent }  from '../../../../components/Dialogs/dialog-code-verification-sent/dialog-code-verification-sent.component';
import { DialogFailedLoginComponent }           from '../../../../components/Dialogs/dialog-failed-login/dialog-failed-login.component';

//---------------------------
// Interfaces
//---------------------------
import { ResponseDTO }                          from '../../../../models/interfaces/useraccount/responseDTO.interface';
import { RegistrationDTO }                      from '../../../../models/interfaces/useraccount/RegistrationDTO.interface';

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------


@Component({
    selector: 'app-verify-account',
    templateUrl: './verify-account.component.html',
    styleUrls: ['./verify-account.component.css']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class VerifyAccountComponent implements OnInit {
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public _formFactors     : FormGroup;
    public email            : string;
    public phone            : string;
    public isLoad           : boolean = false;
    public isLoaded         : boolean = false;
    public showSpinner      : boolean = false;
    public isDisabled       : boolean = true;
    public isDisabledSubmit : boolean = true;
    public attemptsLeft     : number;
    public failedVerfication: boolean = false;
    public verificationID   : number = 0;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private verificationMethod: string;
    private ResponseDTO: ResponseDTO;

    private routerService: Router;
    private securityService: SecurityService;
    private fb: FormBuilder;


    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
        fb: FormBuilder,
        ss: SecurityService,
        us: UserService,
        public dialog: MatDialog,
        rt: Router,
    ) {
        // Services
        this.securityService = ss;
        this.fb = fb;
        this.routerService = rt;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit() {
        this.attemptsLeft = 5;
        // Form Configuration
        this.GetEmailPhone();
        this.createForm();
    }

    //---------------------------------------------------------------------------
    // creating the Form (Michel)
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // creating the Form
    //---------------------------------------------------------------------------
    createForm() {
        this._formFactors = this.fb.group({
            'email': [null,
                Validators.compose([
                    Validators.email
                ])
            ],
            'phone': [null,
                Validators.compose([
                ])
            ],
            'code': [{ value: '', disabled: true },
            Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6)
            ])],


        });
    }

    selectOption(e) {
        this.verificationMethod = e.value
        this.isDisabled = false;
    }
    // Get data from user
    GetEmailPhone() {
        let newUser = JSON.parse(localStorage.getItem("NewUser"));
        this.email = newUser.Email;
        this.phone = newUser.Phone;
        this.isLoad = true;
    }

    sendCode() {
        this.showSpinner = true;
        let sendMethod = (this.verificationMethod == 'email') ? "email" : "phone";

        this.securityService.SendRegistrationCode(this.verificationID, sendMethod, this.phone, this.email).subscribe(res => {
            this.ResponseDTO = res;
            console.log(res);

            if (res.Message == "Success") {
                this.verificationID = +res.Payload;

                let dialogRef = this.dialog.open(DialogCodeVerificationSentComponent, {
                });
                this._formFactors.controls["code"].enable();

                this.isLoaded = true;
            }
        });
    }

    someCode(value) {
        if (value.length != 6) {
            this._formFactors.controls["code"].setErrors(["Code Invalid"]);
        }
        this.isDisabledSubmit = (value.length == 6) ? false : true;
    }

    onSubmit() {
        let code: string = this._formFactors.value.code;

        this.securityService.AuthenticateRegistrationCode(code, this.verificationID).subscribe(res => {
            this.ResponseDTO = res;
            console.log(res);

            if (res.Message == "Success") {
                let typeRegistration = localStorage.getItem("processRegistrationType");
                console.log(typeRegistration);
                

                let creditCard = JSON.parse(localStorage.getItem("CreaditCard"));
                console.log(creditCard);
                
                let newUser = JSON.parse(localStorage.getItem("NewUser"));
                let answers = JSON.parse(localStorage.getItem("answers"));

                let realAnswers = [];

                answers.Answers.forEach(element => {
                    if (element.Answer != "") {
                        realAnswers.push(element)
                    }
                }, realAnswers);


                let registration: RegistrationDTO = {
                    PatientID: newUser.PatientID,
                    Email: newUser.Email,
                    Password: newUser.Password,
                    MPI: newUser.MPI,
                    Domain: newUser.Domain,
                    IsPrimary: newUser.IsPrimary,
                    FirstName: newUser.FirstName,
                    MiddleName: newUser.MiddleName,
                    LastName: newUser.LastName,
                    DateAdded: newUser.DateAdded,
                    DOB: newUser.DOB,
                    Gender: newUser.Gender,
                    Phone: newUser.Phone,
                    Street1: newUser.Street1,
                    Street2: newUser.Street2,
                    City: newUser.City,
                    State: newUser.State,
                    Zip: newUser.Zip,
                    CardFirstName: (creditCard != null) ? creditCard.CardName : "",
                    CardLastName: (creditCard != null) ? creditCard.CardName  : "",
                    CardNumber: (creditCard != null) ? creditCard.CardNumber : "",
                    CardExpirationMonth: (creditCard != null) ?creditCard.CardExpirationMonth : "",
                    CardExpirationYear: (creditCard != null) ?creditCard.CardExpirationYear : "",
                    CardSecurityCode: (creditCard != null) ?creditCard.CardSecurityCode : "",
                    BillingAddress: (creditCard != null) ?creditCard.BillingAddress : "",
                    BillingCity: (creditCard != null) ?creditCard.BillingCity : "",
                    BillingState: (creditCard != null) ?creditCard.BillingState : "",
                    BillingZip: (creditCard != null) ?creditCard.BillingZip : "",
                    SubscriptionID: (creditCard != null) ?creditCard.SubscriptionID : "",
                    AdditionalFamilyMembersCount: 0,
                    PromoCode: (creditCard != null) ?creditCard.PromoCode : "",
                    ResignupCode: (creditCard != null) ?creditCard.ResignupCode : "",
                    Answers: realAnswers
                }

                console.log(registration);



                if (typeRegistration === "selfpaid") {
                    this.selfPaidRegistration(registration, newUser);
                }else{
                    this.prepaidRegistration(registration, newUser);
                }
            } else {
                this.failedVerfication = true;
                this.attemptsLeft--;

                if (this.attemptsLeft == 0) {
                    let dialogRef = this.dialog.open(DialogFailedLoginComponent, {
                        data: {

                        },
                    });
                }
            }

        });
    }

    public setUser(user: any) {
        console.log(user);

        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('token_type', user.token_type);
        localStorage.setItem('expires_in', user.expires_in);
        localStorage.setItem('email', user.email);
        localStorage.setItem('loginid', user.loginid);
        localStorage.setItem('userid', user.userid);
        localStorage.setItem('isLoggedin', 'true');

        // control vars
        localStorage.setItem('authFactor', 'false');
    }

    public selfPaidRegistration(registration, newUser) {
        this.securityService.RegistrationStep3SelfPay(registration).subscribe(resp => {
            console.log(resp);

            if (resp.Message == "Success") {
                this.securityService.loginEndpoint(newUser.Email, newUser.Password)
                    .subscribe(response => {
                        this.setUser(response);

                        let role: number = response.role;
                        let isPatient: string = 'false';

                        if (response.role < 3) {
                            role = response.role;
                            isPatient = (role == 2) ? 'false' : 'true';
                        }

                        this.securityService.GetUserInfo(isPatient).subscribe(resp1 => {
                            this.securityService.setCurrentUserApi(resp1);
                            let availity = (resp1.Availability) ? 'true' : 'false';
                            localStorage.setItem('available', availity);


                            localStorage.setItem('authFactor', 'true');
                            this.routerService.navigate(
                                [
                                    'security/pre-paid/user-registration-medical-information',
                                    resp.Payload
                                ]
                            );
                        })
                    });

                localStorage.removeItem('CreaditCard');
                localStorage.removeItem('NewUser');
                localStorage.removeItem('answers');
            }
        })
    }

    public prepaidRegistration(registration, newUser){
        this.securityService.RegistrationStep3PrePay(registration).subscribe(resp => {
            console.log(resp);

            if (resp.Message == "Success") {
                this.securityService.loginEndpoint(newUser.Email, newUser.Password)
                    .subscribe(response => {
                        this.setUser(response);

                        let role: number = response.role;
                        let isPatient: string = 'false';

                        if (response.role < 3) {
                            role = response.role;
                            isPatient = (role == 2) ? 'false' : 'true';
                        }

                        this.securityService.GetUserInfo(isPatient).subscribe(resp1 => {
                            this.securityService.setCurrentUserApi(resp1);
                            let availity = (resp1.Availability) ? 'true' : 'false';
                            localStorage.setItem('available', availity);


                            localStorage.setItem('authFactor', 'true');
                            this.routerService.navigate(
                                [
                                    'security/pre-paid/user-registration-medical-information',
                                    resp.Payload
                                ]
                            );
                        })
                    });

                localStorage.removeItem('CreaditCard');
                localStorage.removeItem('NewUser');
                localStorage.removeItem('answers');
            }
        })
    }
}
