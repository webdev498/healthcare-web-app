export interface SelfPayBillingInfoDTO {
    PatientID           : number,
    CardName            : string,
    CardNumber          : string,
    CardExpirationMonth : string,
    CardExpirationYear  : string,  
    CardSecurityCode    : string,
    BillingAddress      : string,
    BillingCity         : string,
    BillingState        : string,
    BillingZip          : string,
    SubscriptionID      : number,
    AdditionalFamilyMembersCount    : number,
    PromoCode           : string,
    ResignupCode        : string
}
