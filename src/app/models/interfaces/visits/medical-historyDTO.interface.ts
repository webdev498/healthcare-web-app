import { GenericNameDescriptionDTO }    from './generic-name-descriptionDTO.interface';
import { IPharmacy }                    from '../patient/pharmacy.interface';
import { IPCP }                         from '../patient/pcp.interface';

export interface MedicalHistoryDTO {
    PatientID 	        :   number,
    OtherMedicalIssue   :   string;
    MedicalIssues       :   number[];
    Allergies           :   GenericNameDescriptionDTO[];
    Medications 	    :   GenericNameDescriptionDTO[];
    Surgeries           :   GenericNameDescriptionDTO[];
    Pharmacy            :   IPharmacy;
    PCP 	            :   IPCP;
}
