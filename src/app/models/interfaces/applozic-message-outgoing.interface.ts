export interface ApplozicMessageOutgoing
{
    type           : number;
    contentType    : number;
    message        : string;
    to             : string;
    metadata       : {};
    key            : string;
    source         : number;
}
