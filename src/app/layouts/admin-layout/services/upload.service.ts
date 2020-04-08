import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

const url =
  'https://training-management-dev.herokuapp.com/api/v1/auth/register-by-importing-csv-file';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(files: Set<File>) {
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file);
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });
      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          window.alert('Upload progress: Uploading');
        } else if (event instanceof HttpResponse) {
          window.alert('Upload progress: Success');
        }
      });
    });
  }
}
