import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';

import { Observable }     from 'rxjs';
import { tap}  from 'rxjs/operators';
import { Router }         from '@angular/router';
import { MatSnackBar }    from '@angular/material';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private rt : Router,
    private snackBarService     :MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('access_token');
    if (!!jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(event.status);
          }
        }, error => {
          console.log(error.status);

          if(error.status == 401){
            this.snackBarService.open( "Session expired!", undefined, {duration: 2000} );  
            this.rt.navigate(
              [
                  '/security/login',                
              ]);
            }
        })
      )
  }
}