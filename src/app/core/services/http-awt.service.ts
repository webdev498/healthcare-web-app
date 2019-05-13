//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
//----------------------------------
// API Libraries:
//----------------------------------
import { Injectable }                         from '@angular/core';

//----------------------------------
// HTTP:
//----------------------------------
import { Http }                               from '@angular/http';
import { RequestOptionsArgs }                 from '@angular/http';
import { Response }                           from '@angular/http';
import { Headers }                            from '@angular/http';
import { XHRBackend }                         from '@angular/http';

//----------------------------------
// RXJS:
//----------------------------------
import { Observable }                         from 'rxjs';
import 'rxjs/Rx';

//----------------------------------
// Services:
//----------------------------------
import { GlobalsService }                     from './globals.service';
import { LogService }                         from './log.service';

//----------------------------------
// Config:
//----------------------------------
import { API_URL }                            from "../config/config";

//----------------------------------
// Custom:
//----------------------------------
import { EMDRequestOptions }                  from './options/emd-request.options';


//--------------------------------------------------------------------------------------------------
// Este es un servicio inyectable:
//--------------------------------------------------------------------------------------------------
@Injectable()

//--------------------------------------------------------------------------------------------------
// Component Class Section:
//--------------------------------------------------------------------------------------------------
export class HttpAWTProvider extends Http
{
	//----------------------------------------------------------------------------------------------
	// Private Properties Section:
	//----------------------------------------------------------------------------------------------
    private globals             : GlobalsService
    private logService          : LogService;
    private httpService         : Http;


	//----------------------------------------------------------------------------------------------
	// Constructor Method Section:
	//----------------------------------------------------------------------------------------------
    constructor(
                    backend        : XHRBackend,
                    defaultOptions : EMDRequestOptions,
                    http           : Http,
                    ls             : LogService
    )
    {
        super(backend, defaultOptions);

        // Services
        this.globals     = GlobalsService.getInstance();
        this.logService  = ls;
        this.httpService = http;
    }


	//----------------------------------------------------------------------------------------------
	// Public Methods Section:
    //----------------------------------------------------------------------------------------------
    public doGet(url: string, options?: RequestOptionsArgs): Observable<any>
    {
        let oauthBody = {
            "grant_type": "password",
            "username"  : this.globals.currentUser.Email,
            "password"  : this.globals.currentUser.Password,
            "client_id" : this.globals.currentUser.Email
        };

        return new Observable<any>(observer => {
            // Try Operation
            super.get(this.getFullUrl(url), this.requestOptions("GET", options)).subscribe(
                (res: Response) =>
                {
                    observer.next(res.json());
                },
                (error) =>
                {
                    this.logService.logHttpError(error);

                    if (error.status === 401)
                    {
                        this.httpService.post(`${API_URL}` + 'oauth', oauthBody)
                            .map((res: Response) => res.json())
                            .subscribe(
                                (data) =>
                                {
                                    this.logService.logEvent("HttpService: Security Token has been Refreshed");

                                    // Store Token:
                                    this.globals.currentToken = data.access_token;

                                    // Retry Operation:
                                    super.get(this.getFullUrl(url), this.requestOptions("GET", options)).subscribe(
                                        (res: Response) => {
                                            observer.next(res.json());
                                        },
                                        (error) => {
                                            this.logService.logHttpError(error);
                                            observer.error(error);
                                        }
                                    );
                                },
                                (error) => {
                                    this.logService.logHttpError(error);
                                }
                            );
                    }
                    else
                    {
                        observer.error();
                    }
                }
            );
        });
    }

    //----------------------------------------------------------------------------------------------
    public doPost(url: string, body: any, options?: RequestOptionsArgs): Observable<any>
    {
        const urlParams = new URLSearchParams();
        Object.keys(body).forEach(key => {
            urlParams.set(key, body[key]);
        });

        let oauthBody = {
            "grant_type": "password",
            "username"  : this.globals.currentUser.Email,
            "password"  : this.globals.currentUser.Password,
            "client_id" : this.globals.currentUser.Email
        };

        return new Observable<any>(observer => {

            // Try Operation
            super.post(this.getFullUrl(url), urlParams.toString(), this.requestOptions("POST", options)).subscribe(
                (res: Response) =>
                {
                    observer.next(res.json());
                },
                (error) =>
                {
                    this.logService.logHttpError(error);

                    if (error.status === 401)
                    {
                        this.httpService.post(`${API_URL}` + 'oauth', oauthBody)
                            .map((res: Response) => res.json())
                            .subscribe(
                                (data) =>
                                {
                                    this.logService.logEvent("HttpService: Security Token has been Refreshed");

                                    // Store Token:
                                    this.globals.currentToken = data.access_token;

                                    // Retry Operation:
                                    super.post(this.getFullUrl(url), urlParams.toString(), this.requestOptions("POST", options)).subscribe(
                                        (res: Response) => {
                                            observer.next(res.json());
                                        },
                                        (error) => {
                                            this.logService.logHttpError(error);
                                            observer.error(error);
                                        }
                                    );
                                },
                                (error) => {
                                    this.logService.logHttpError(error);
                                }
                            );
                    }
                    else
                    {
                        observer.error();
                    }
                }
            );
        });
    }

    //----------------------------------------------------------------------------------------------
    public doPut(url: string, body: any, pId: string, options?: RequestOptionsArgs): Observable<any>
    {
        const urlParams = new URLSearchParams();
        Object.keys(body).forEach(key => {
            urlParams.set(key, body[key]);
        });

        let oauthBody = {
            "grant_type": "password",
            "username"  : this.globals.currentUser.Email,
            "password"  : this.globals.currentUser.Password,
            "client_id" : this.globals.currentUser.Email
        };

        return new Observable<any>(observer => {

            // Try Operation
            super.put((this.getFullUrl(url) + "/" + pId), urlParams.toString(), this.requestOptions("PUT", options)).subscribe(
                (res: Response) =>
                {
                    observer.next(res.json());
                },
                (error) =>
                {
                    this.logService.logHttpError(error);

                    if (error.status === 401)
                    {
                        this.httpService.post(`${API_URL}` + 'oauth', oauthBody)
                            .map((res: Response) => res.json())
                            .subscribe(
                                (data) =>
                                {
                                    this.logService.logEvent("HttpService: Security Token has been Refreshed");

                                    // Store Token:
                                    this.globals.currentToken = data.access_token;

                                    // Retry Operation:
                                    super.put((this.getFullUrl(url) + "/" + pId), urlParams.toString(), this.requestOptions("PUT", options)).subscribe(
                                        (res: Response) => {
                                            observer.next(res.json());
                                        },
                                        (error) => {
                                            this.logService.logHttpError(error);
                                            observer.error(error);
                                        }
                                    );
                                },
                                (error) => {
                                    this.logService.logHttpError(error);
                                }
                            );
                    }
                    else
                    {
                        observer.error();
                    }
                }
            );
        });
    }

    //----------------------------------------------------------------------------------------------
    public doDelete(url: string, pId: string, options?: RequestOptionsArgs): Observable<any>
    {
        let oauthBody = {
            "grant_type": "password",
            "username"  : this.globals.currentUser.Email,
            "password"  : this.globals.currentUser.Password,
            "client_id" : this.globals.currentUser.Email
        };

        return new Observable<any>(observer => {

            // Try Operation
            super.delete((this.getFullUrl(url) + "/" + pId), this.requestOptions("DELETE", options)).subscribe(
                (res: Response) =>
                {
                    observer.next(res.json());
                },
                (error) =>
                {
                    this.logService.logHttpError(error);

                    if (error.status === 401)
                    {
                        this.httpService.post(`${API_URL}` + 'oauth', oauthBody)
                            .map((res: Response) => res.json())
                            .subscribe(
                                (data) =>
                                {
                                    this.logService.logEvent("HttpService: Security Token has been Refreshed");

                                    // Store Token:
                                    this.globals.currentToken = data.access_token;

                                    // Retry Operation:
                                    super.put((this.getFullUrl(url) + "/" + pId), this.requestOptions("DELETE", options)).subscribe(
                                        (res: Response) => {
                                            observer.next(res.json());
                                        },
                                        (error) => {
                                            this.logService.logHttpError(error);
                                            observer.error(error);
                                        }
                                    );
                                },
                                (error) => {
                                    this.logService.logHttpError(error);
                                }
                            );
                    }
                    else
                    {
                        observer.error();
                    }
                }
            );
        });
    }


	//----------------------------------------------------------------------------------------------
	// Private Methods Section:
	//----------------------------------------------------------------------------------------------
    private requestOptions(verb: string, options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new EMDRequestOptions(verb);
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    //----------------------------------------------------------------------------------------------
    private getFullUrl(url: string): string
    {
        return `${API_URL}` + url;
    }
}
