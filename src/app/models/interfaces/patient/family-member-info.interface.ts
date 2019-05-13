import { IProfile }             from './profile.interface'
import { MedicalHistoryDTO }    from '../visits/medical-historyDTO.interface';

export interface FamilyMemberInfoDTO {
    FamilyMemberInformation : IProfile,
    MedicalHistory          : MedicalHistoryDTO 	
}
