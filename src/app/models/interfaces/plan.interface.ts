export interface Plan
{
    id                  : number;
    name                : string;
    price               : number;
    otherPrice          : number;   // Used for price Family Member
    description         : string;
    codesPromotional    : string[]
}
