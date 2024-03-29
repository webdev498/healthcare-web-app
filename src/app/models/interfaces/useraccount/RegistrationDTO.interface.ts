import { SecurityQuestionAnswerDTO } from "../securityquestion/security-question-answer.interface";

export interface RegistrationDTO {
    PatientID   : number,
    Email       : string,
    Password    : string,
    MPI         : string,
    Domain      : string,
    IsPrimary   : boolean,
    FirstName   : string,
    MiddleName  : string,
    LastName    : string,
    DateAdded   : string,
    DOB         : string,
    Gender      : string,
    Phone       : string,
    Street1     : string,
    Street2     : string,
    City        : string,
    State       : string,
    Zip         : string,
    CardFirstName 	:   string,
    CardLastName    :   string, 
    CardNumber  : string,
    CardExpirationMonth :   string,
    CardExpirationYear  :   string, 
    CardSecurityCode    : string,
    BillingAddress      : string,
    BillingCity         : string,
    BillingState        : string,
    BillingZip          : string,
    SubscriptionID      : number,
    AdditionalFamilyMembersCount :  number,
    PromoCode           : string,
    ResignupCode        : string,
    Answers             : SecurityQuestionAnswerDTO[]
}
