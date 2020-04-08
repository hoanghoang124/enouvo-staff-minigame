import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from 'src/app/layouts/auth-layout/store';
import { UploadService } from '../../services/upload.service';

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

  isLoadingResult$: Observable<boolean>;
  canBeClosed = true;
  showCancelButton = true;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
  progress: any;

  constructor(
    private uploadService: UploadService,
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

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.progress = this.uploadService.upload(this.files);
    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
