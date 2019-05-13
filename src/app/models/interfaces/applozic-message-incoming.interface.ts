export interface ApplozicMessageIncoming
{
   /* 
    id                    : string;
    message               : string;
    metaData              : {};
    source                : number;
    timeStamp             : number;
    to                    : string;
    type                  : string;
    */
    
    
    from        : string;
    key         : any;
    message     : string;
    metadata    : {};
    source      : number;
    status      : string;
    timeStamp   : number;
    to          : any;
    type        : string;

}
