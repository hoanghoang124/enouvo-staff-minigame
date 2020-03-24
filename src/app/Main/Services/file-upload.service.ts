import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FileUploadService {
  apiUrl =
    "https://training-management-dev.herokuapp.com/api/v1/auth/registerByImportingCSVFile";
  constructor(private http: HttpClient) {}
  upload(formData) {
    return this.http
      .post<any>(`${this.apiUrl}`, formData, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map(event => this.getEventMessage(event, formData)),
        catchError(this.handleError)
      );
  }
  private getEventMessage(event: HttpEvent<any>, formData) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get("file").name}" surprising upload event: ${
          event.type
        }.`;
    }
  }
  private fileUploadProgress(event) {
    const percentDone = Math.round((100 * event.loaded) / event.total);
    return { status: "progress", message: percentDone };
  }
  private apiResponse(event) {
    return event.body;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened. Please try again later.");
  }

  // constructor(private http: HttpClient) {}

  // addUser(name: string, file: File): Observable<any> {
  //   var formData: any = new FormData();
  //   formData.append("name", name);
  //   formData.append("file", file);

  //   return this.http
  //     .post(
  //       "https://training-management-dev.herokuapp.com/api/v1/auth/registerByImportingCSVFile",
  //       formData,
  //       {
  //         reportProgress: true,
  //         observe: "events"
  //       }
  //     )
  //     .pipe(catchError(this.errorMgmt));
  // }

  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = "";
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
