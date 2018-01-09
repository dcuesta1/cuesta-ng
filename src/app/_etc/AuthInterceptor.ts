import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaderResponse, HttpResponse, HttpRequest, HttpErrorResponse, HttpEventType, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { LocalService } from '../_services/local.service';
import { Router } from '@angular/router';
import { GLobalEventsManager } from './GlobalEventsManager';
import { environment } from "../../environments/environment"

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Intercepts an outgoing HTTP request, sets Authorization header if token available, sets default headers, adds proper url 
     * to the request, executes it and handles any error that could be triggered in execution.
     * 
     * @see HttpInterceptor
     * @param req the outgoing HTTP request
     * @param next a HTTP request handler
     */

    constructor(
        private local :LocalService, 
        private router :Router,
        private globalEventsManager: GLobalEventsManager,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.local.getAuthToken();

        if(token) {
            req = req.clone({ headers: req.headers.set("Authorization", token)});
        } 

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({url: environment.apiUrl + req.url})

        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              let token = event.headers.get('token');
              
              if(token) {
                this.local.SetAuthToken(token);
              }
            }
          }, (err: any) => {
            let errMsg: string;

            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.local.clear();
                    this.globalEventsManager.showNavigations(false);
                    this.router.navigate(['/dashboard']);
                } else {
                    const error = err.message || JSON.stringify(err.error);
                    errMsg = `${err.status} - ${err.statusText || ''} Details: ${err}`;
                }    

            }  else {
                errMsg = err.message ? err.message : err.toString();
            }
            return _throw(errMsg);  
        });
    }
}


export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};