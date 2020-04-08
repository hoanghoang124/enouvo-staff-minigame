import { Store } from '@ngrx/store';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from 'src/app/layouts/auth-layout/store';
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

@Component({
  selector: 'app-upload-csv-modal',
  templateUrl: './upload-csv-modal.component.html',
  styleUrls: ['./upload-csv-modal.component.scss']
})
export class UploadCsvModalComponent implements OnInit {
  @ViewChild('file') file;
  @Input() title: string;
  @Input() message: string;
  @Input() note: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  url =
    'https://training-management-dev.herokuapp.com/api/v1/auth/register-by-importing-csv-file';
  progress: any;
  uploadingProgress: number;
  uploadSuccessful = false;
  public files: Set<File> = new Set();

  constructor(
    private http: HttpClient,
    private store: Store<State>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.store.select;
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(Number(key))) {
        this.files.add(files[key]);
      }
    }
  }

  private upload(files: Set<File>) {
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file);
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });
      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          return (this.uploadingProgress = percentDone);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccessful = true;
        }
      });
    });
  }
  public decline() {
    this.activeModal.close(true);
  }

  public accept() {
    this.progress = this.upload(this.files);
    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
