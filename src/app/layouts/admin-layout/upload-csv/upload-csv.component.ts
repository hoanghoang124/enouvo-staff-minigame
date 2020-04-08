import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
// import { UploadService } from './upload.service';
import { State } from '../store/reducers';
import * as fromStaff from '../store';
@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCSVComponent implements OnInit {
  @ViewChild('file') file;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
  progress: any;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

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
  closeDialog() {
    console.log(this.files);
    this.store.dispatch(new fromStaff.UploadCSV(this.files));
    // this.progress = this.uploadService.upload(this.files);

    // const allProgressObservables = [];
    // for (const key in this.progress) {
    //   allProgressObservables.push(this.progress[key].progress);
    // }
  }
}
