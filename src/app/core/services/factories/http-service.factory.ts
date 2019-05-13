
//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { Http }                          from '@angular/http';
import { XHRBackend }                    from '@angular/http';
import { EMDRequestOptions }             from '../options/emd-request.options';
import { HttpAWTProvider }               from '../http-awt.service';
import { LogService }                    from '../log.service';


//--------------------------------------------------------------------------------------------------
// Factory Class Section:
//--------------------------------------------------------------------------------------------------
function httpServiceFactory(
                                backend : XHRBackend,
                                options : EMDRequestOptions,
                                http    : Http,
                                ls      : LogService
)
{
    return new HttpAWTProvider(backend, options, http, ls);
}

//--------------------------------------------------------------------------------------------------
// Export Section:
//--------------------------------------------------------------------------------------------------
export { httpServiceFactory };
