import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from '../models';

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    // set the Expiry Time for token
    get<TReturn>(apiPath: string, searchParams?: any): Observable<any> {
        const options: any = {
            headers: this.getDefaultRequestHeaders(),
            search: searchParams
        };
        return this.http.get(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    post<TReturn>(apiPath: string, requestObject: Object, options?: any): Observable<TReturn> {

        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.post(GlobalConstants.Host + apiPath, this.DeepTrim(requestObject), options).pipe(
            map(this.extractData), catchError(this.handleError));
    }

    put<TReturn>(apiPath: string, putObject?: Object, options?: any): Observable<TReturn> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.put(GlobalConstants.Host + apiPath, this.DeepTrim(putObject), options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    patch<TReturn>(apiPath: string, putObject?: Object, options?: any): Observable<TReturn> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.patch(GlobalConstants.Host + apiPath, this.DeepTrim(putObject), options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    delete<TReturn>(apiPath: string, options?: any): Observable<TReturn> {
        if (options === undefined || options == null) {
            options = {
                headers: this.getDefaultRequestHeaders()
            };
        }

        return this.http.delete(GlobalConstants.Host + apiPath, options).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getDefaultRequestHeaders(): HttpHeaders {
        let headers = new HttpHeaders();        
        return headers;
    }

    DeepTrim(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                const value = obj[prop], type = typeof value;
                if (value != null && (type === 'string' || type === 'object') && obj.hasOwnProperty(prop)) {
                    if (type === 'object') {
                        this.DeepTrim(obj[prop]);
                    } else {
                        obj[prop] = obj[prop].trim();
                    }
                }
            }
        }
        return obj;
    }

    private extractData(res: any): any {
        if (res === null) {
            return [];
        } else {
            const body: any = res;
            return body || {};
        }
    }

    private handleError(error: any) {
        // console.warn(JSON.stringify(error));
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // checking if usr is logged in or not. If not then do not redirect. if yes then redirect
        // const token = JSON.parse(this.customCookieService.getCookie('ad-angular-token'));
        // if (error.status === 401 && token !== undefined && token !== '' && token !== null) {
        //     window.location.href = '/auth/login';
        //     return observableThrowError(error.status);
        // }
        if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(['/auth/signin'])
        }
       else if ((error.status === 400 || error.status === 401 || error.status === 404 || error.status === 500) && error.hasOwnProperty('error')) {
            return observableThrowError(error.error);
        } else if (error.status === 503) {
            const errorData: any = { status: 0, errorCode: error.errorCode, errorMessage: 'Service Not Available' };
            return observableThrowError(errorData);
        } else if (error.status === 0) {
            const errorData: any = { status: 0, errorCode: error.errorCode, errorMessage: 'Internet Not Connect' };
            return observableThrowError(errorData);
        }
        return observableThrowError(error._body);
    }
}