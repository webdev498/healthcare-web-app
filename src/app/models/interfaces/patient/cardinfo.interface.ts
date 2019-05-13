export interface ICardInfo{
  PatientID             : number;
  SubscriptionPaymentID : number;
  CardName              : string;
  CardNumber            : string;
  CardExpirationDate    : string;
  CardSecurityCode      : string;
  BillingAddress        : string;
  BillingCity           : string;
  BillingState          : string;
  BillingZip            : string;
}