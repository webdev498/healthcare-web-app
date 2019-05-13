import { IFamilyMember } from "./familymember.interface";


export interface SubscriptionChangeInfoDTO {
    SubscriptionID  :   number,
    CostDifference  :   string,
    SubscriptionCost:   string,
    Last4ofCC       :   string,
    NextBillingDate :   string,
    AdditonalFamilyMemberAmount :   string,
    SubscriptionMemberLimit     :   number,
    FamilyMemberList            :   IFamilyMember[]
}
