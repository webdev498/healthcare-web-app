import { IGenericNameDescription } from "./genericnamedescription.interface";
import { IPharmacy }               from "./pharmacy.interface";
import { IPCP }                    from "./pcp.interface";

export interface IMedicalHistory{
  PatientID         : number;
  OtherMedicalIssue : string;
  MedicalIssues     : number[];
  Allergies         : IGenericNameDescription[];
  Medications       : IGenericNameDescription[];
  Surgeries         : IGenericNameDescription[];
  Pharmacy          : IPharmacy;
  PCP               : IPCP;
}