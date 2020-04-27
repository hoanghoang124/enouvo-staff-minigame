import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  handleError(error: HttpErrorResponse, isShow: boolean = true) {
    if (isShow) {
      const errMsg = (error && error.error.message) || error.statusText;
      this.toastr.error(errMsg, 'Error' + error.status);
    }
    return throwError(error);
  }

  displaySuccessMessage(res: any, isShow: boolean = true) {
    if (isShow) {
      this.toastr.success(res.message || 'Success', 'Successful');
    }
    return res;
  }

  get(
    path: string,
    _params: Object = {},
    showSuccess: boolean = false
  ): Observable<any> {
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
    return this.http.get(path, { params }).pipe(
      map(res => this.displaySuccessMessage(res, showSuccess)),
      catchError(err => this.handleError(err, showSuccess))
    );
  }

  put(
    path: string,
    body: any = {},
    _headers: Object = {},
    showSuccess: boolean = true
  ): Observable<any> {
    let headers = new HttpHeaders();
    Object.keys(_headers).forEach(function(key) {
      if (_headers[key] !== undefined) {
        headers = headers.append(key, _headers[key].toString());
      }
    });
    return this.http.put(path, body, { headers }).pipe(
      map(res => this.displaySuccessMessage(res, showSuccess)),
      catchError(err => this.handleError(err, showSuccess))
    );
  }

  post(
    path: string,
    body: Object = {},
    showSuccess: boolean = true
  ): Observable<any> {
    return this.http.post(path, body).pipe(
      map(res => this.displaySuccessMessage(res, showSuccess)),
      catchError(err => this.handleError(err, showSuccess))
    );
  }

  delete(path, showSuccess: boolean = true): Observable<any> {
    return this.http.delete(path).pipe(
      map(res => this.displaySuccessMessage(res, showSuccess)),
      catchError(err => this.handleError(err, showSuccess))
    );
  }
}
