//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
//------------------------------------------
// Ionic/Angular
//------------------------------------------
import { Injectable }  from '@angular/core';

//--------------------------------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------------------------------
@Injectable()
export class LogService
{
    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------
    constructor() {}

    //----------------------------------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------------------------------
    public logError(error: string) : void
    {
        console.log("%c" + error, 'background: #440000; color: #bada55');
    }

    //----------------------------------------------------------------------------------------------
    public logHttpError(error: any) : void
    {
        console.log("%c Error en Servicio Web: " + "%c" + error.status + " - " + error.statusText + '. ' +
                    ((error.detail) ? 'Detalles: ' + error.detail : ''),
                    'background: #222; color: #bada55',
                    'background: #222; color: #aa2222'
        );
        if (error._body != "")
        {
            console.log("%c Detalles del Error: ", 'background: #222; color: #aa4455');
            if (typeof(error._body) !== "object")
            {
                let errorObject : any = JSON.parse(error._body);
                if (errorObject.validation_messages)
                {
                    for (var validatedObject in errorObject.validation_messages)
                    {
                        if (errorObject.validation_messages.hasOwnProperty(validatedObject))
                        {
                            let failedValidations: any = errorObject.validation_messages[validatedObject];

                            for (var validation in failedValidations)
                            {

                                console.log("     " +
                                            "%c" + validatedObject + ": " +
                                            "%c" + validation + ": " +
                                            "%c" + failedValidations[validation],
                                            'background: #222; color: #3498db',
                                            'background: #222; color: #bada55',
                                            'background: #222; color: #69BB7B'
                                );
                            }
                        }
                    }
                }
            }
            else
            {
                console.log("%c" + error, 'background: #440000, color: #4aaa55');
            }
        }
    }

    //----------------------------------------------------------------------------------------------
    public logEvent(pEvent: string) : void
    {
        console.log("%c" + pEvent, 'background: #000033; color: #3498db');
    }
}
