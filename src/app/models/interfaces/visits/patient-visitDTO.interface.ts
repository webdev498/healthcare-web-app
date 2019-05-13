export interface PatientVisitDTO {
    VisitID 	        :   number,
    PatientFirstName    :   string,
    PatientLastName     :   string,
    PatientDisplayName  :   string,
    DOB                 :   string,
    EstablishedPatient  :   boolean,
    Guardian            :   string,
    MembershipDomain    :   string,
    Status              :   string,
    StartTime           :   string,
    EndTime             :   string,
    ProviderName        :   string,
    ProviderID          :   number,
    ReferredToProviderName 	:   string,
    ReasonForVisit      :   string, 
    PrimaryDiagnosisID  :   number,
    PrimaryDiagnosis    :   string,
    SecondaryDiagnosisID:   number,
    SecondaryDiagnosis  :   string,
    Prescription        :   boolean,
    EncounterNotes      :   string,
    Transcript          :   string
}
