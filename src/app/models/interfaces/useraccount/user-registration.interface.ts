import { Title } from "@angular/platform-browser";

export interface UserRegistration {
    PatientID   : number,
    Email       : string,
    Password    : string,
    MPI         : string,
    Domain      : string,
    IsPrimary   : boolean,
    FirstName   : string,
    Title       : string,
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
    StatusCode  : string,
    Message     : string
}
