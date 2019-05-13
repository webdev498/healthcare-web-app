import { IPatientWaitInfoDTO } from "./patientWaitInfoDTO.interface";

export interface IPatientWaitListDTO{
  PatientWaitListCount : number;
  PatientWaitList: IPatientWaitInfoDTO[];
}