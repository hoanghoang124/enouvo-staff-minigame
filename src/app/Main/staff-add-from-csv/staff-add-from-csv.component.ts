import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
// import { CSVRecord } from '../Models/staff-csv.model';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { FileUploadService } from '../Services/file-upload.service';
@Component({
  templateUrl: './staff-add-from-csv.component.html',
  styleUrls: ['./staff-add-from-csv.component.css']
})
export class StaffAddFromCsvComponent {
  // read csv
  // text = [];
  // public csvArr = [];
  // public records: any[] = [];
  // displayedColumns: string[] = [
  //   'id',
  //   'firstName',
  //   'middleName',
  //   'lastName',
  //   'avatar',
  //   'email',
  //   'quote',
  //   'birthday',
  //   'phone',
  //   'addressStreet',
  //   'addressCity',
  //   'position'
  // ];
  // @ViewChild('csvReader') csvReader: any;
  // constructor() {}
  // uploadListener($event: any): void {
  //   this.text = [];
  //   let files = $event.srcElement.files;
  //   if (this.isValidCSVFile(files[0])) {
  //     let input = $event.target;
  //     let reader = new FileReader();
  //     reader.readAsText(input.files[0]);
  //     reader.onload = () => {
  //       let csvData = reader.result;
  //       let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
  //       let headersRow = this.getHeaderArray(csvRecordsArray);
  //       this.records = this.getDataRecordsArrayFromCSVFile(
  //         csvRecordsArray,
  //         headersRow.length
  //       );
  //     };
  //     reader.onerror = function() {
  //       console.log('error is occured while reading file!');
  //     };
  //   } else {
  //     alert('Please import valid .csv file.');
  //     this.fileReset();
  //   }
  // }
  // getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     let curruntRecord = (<string>csvRecordsArray[i]).split(',');
  //     if (curruntRecord.length == headerLength) {
  //       let csvRecord: CSVRecord = new CSVRecord();
  //       csvRecord.id = Number(curruntRecord[0]);
  //       csvRecord.firstName = curruntRecord[1].trim();
  //       csvRecord.middleName = curruntRecord[2].trim();
  //       csvRecord.lastName = curruntRecord[3].trim();
  //       csvRecord.avatar = curruntRecord[4].trim();
  //       csvRecord.email = curruntRecord[5].trim();
  //       csvRecord.quote = curruntRecord[6].trim();
  //       csvRecord.birthday = curruntRecord[7].trim();
  //       csvRecord.phone = Number(curruntRecord[8].trim());
  //       csvRecord.addressStreet = curruntRecord[9].trim();
  //       csvRecord.addressCity = curruntRecord[10].trim();
  //       csvRecord.position = curruntRecord[11].trim();
  //       this.csvArr.push(csvRecord);
  //       // csvArr = [...csvArr, csvRecord]; //mảng nè
  //     }
  //   }
  //   return this.csvArr;
  // }
  // isValidCSVFile(file: any) {
  //   return file.name.endsWith('.csv');
  // }
  // getHeaderArray(csvRecordsArr: any) {
  //   let headers = (<string>csvRecordsArr[0]).split(',');
  //   let headerArray = [];
  //   for (let j = 0; j < headers.length; j++) {
  //     headerArray.push(headers[j]);
  //   }
  //   return headerArray;
  // }
  // fileReset() {
  //   this.csvReader.nativeElement.value = '';
  //   this.records = [];
  // }

  // option 1
  // profileForm: FormGroup;
  // error: string;

  // fileUpload = { status: '', message: '', filePath: '' };

  // constructor(
  //   private fb: FormBuilder,
  //   private fileUploadService: FileUploadService
  // ) {}

  // ngOnInit() {
  //   this.profileForm = this.fb.group({
  //     name: [''],
  //     profile: ['']
  //   });
  // }

  // onSelectedFile(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.profileForm.get('profile').setValue(file);
  //   }
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('name', this.profileForm.get('name').value);
  //   formData.append('profile', this.profileForm.get('profile').value);

  //   this.fileUploadService.upload(formData).subscribe(
  //     res => (this.fileUpload = res),
  //     err => (this.error = err)
  //   );
  // }

  // option 2
  selectedFile: File = null;
  constructor(private http: HttpClient) {}
  uploadProgress: any;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http
      .post('https://5e55e20836450d001428865d.mockapi.io/staff', fd, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress =
            'Upload Progress: ' +
            Math.round((event.loaded / event.total) * 100) +
            '%';
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
        console.log(event);
      });
  }
}
