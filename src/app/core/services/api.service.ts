import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(path: string, _params: Object = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(_params).forEach(function(key) {
      if (_params[key] !== undefined) {
        if (typeof _params[key] === 'object') {
          params = params.append(key, JSON.stringify(_params[key]));
        } else {
          params = params.append(key, _params[key]);
        }
      }
    });
    return this.http
      .get(path, { params })
      .pipe(catchError(err => this.handleError(err)));
  }

  put(path: string, body: any = {}, _headers: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    Object.keys(_headers).forEach(function(key) {
      if (_headers[key] !== undefined) {
        headers = headers.append(key, _headers[key].toString());
      }
    });
    return this.http
      .put(path, body, { headers })
      .pipe(catchError(err => this.handleError(err)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(path, body)
      .pipe(catchError(err => this.handleError(err)));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(path)
      .pipe(catchError(err => this.handleError(err)));
  }
}
