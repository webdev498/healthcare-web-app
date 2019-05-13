import { FamilyMemberInfoDTO } from "./family-member-info.interface";

export interface FamilyMemberAccount {
    PrimaryPatientID : number,
    AdditionalFamilyMembers : FamilyMemberInfoDTO[]
}
