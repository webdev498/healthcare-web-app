import { ISubscriptionOption }    from './subscriptionoption.interface';
import { IFamilyMember }          from './familymember.interface';
export interface ISubscriptionInfo{
  CanAddFamilyMembers                       : boolean;
  CurrentSubscriptionPlan                   : string;
  CurrentSubscriptionPlanCost               : string;
  CurrentSubscriptionAddOnMembers           : number;
  CurrentSubscriptionAddOnMemberCost        : string;
  CurrentSubscriptionTotalCost              : string;
  CurrentSubscriptionEndDate                : string;
  NewSubscriptionPlan                       : string;
  NewSubscriptionPlanCost                   : string;
  NewSubscriptionAddOnMembers               : number;
  NewSubscriptionAddOnMemberCost            : string;
  NewSubscriptionTotalCost                  : string;
  NewSubscriptionStartDate                  : string;
  AccountMembers                            : IFamilyMember[];
  AvailableSubscriptions                    : ISubscriptionOption[];
  AvailableSubscriptionAddOns               : ISubscriptionOption[];
}