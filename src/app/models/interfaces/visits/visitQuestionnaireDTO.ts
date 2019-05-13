export interface IVisitQuestionnaireDTO{
    VisitID                 : number;
    EncounterType           : string;
    MedicationPrescribed    : boolean;
    LabOrdered              : boolean;
    RadiologyOrdered        : boolean;
    PCPFollowUp             : boolean;
    SpecialistFollowUP      : boolean;
    SpecialistName          : string;
    SentToER                : boolean;
    TelemedFollowUp         : boolean;
    TelemedFollowUpDate     : string;
}