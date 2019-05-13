import { ISubscriptionOption }    from '../patient/subscriptionoption.interface';

export interface AvailableSubscriptionOptions {
    AvailableSubscriptions       : ISubscriptionOption[],
    AvailableSubscriptionAddOns  : ISubscriptionOption[],
}
