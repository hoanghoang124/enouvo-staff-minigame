import { Component, OnInit, ViewChild } from "@angular/core";
import { CSVRecord } from "../Models/staff-csv.model";
import { FormBuilder, FormGroup } from "@angular/forms";
// import { HttpEventType, HttpClient, HttpHeaders } from "@angular/common/http";
import { FileUploadService } from "../Services/file-upload.service";

@Component({
  templateUrl: "./staff-add-from-csv.component.html",
  styleUrls: ["./staff-add-from-csv.component.css"]
})
export class StaffAddFromCsvComponent implements OnInit {
  text = [];
  public csvArr = [];
  public records: any[] = [];
  displayedColumns: string[] = [
    "id",
    "firstName",
    "middleName",
    "lastName",
    "email",
    "roleId",
    "phone",
    "birthday",
    "addressStreet",
    "addressCity"
  ];
  @ViewChild("csvReader") csvReader: any;
  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {}
  uploadListener($event: any): void {
    this.text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };
      reader.onerror = function() {
        console.log("error is occured while reading file!");
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(",");
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = Number(curruntRecord[0]);
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.middleName = curruntRecord[2].trim();
        csvRecord.lastName = curruntRecord[3].trim();
        csvRecord.email = curruntRecord[4].trim();
        csvRecord.roleId = Number(curruntRecord[5]);
        csvRecord.phone = Number(curruntRecord[6]);
        csvRecord.birthday = curruntRecord[7].trim();
        csvRecord.addressStreet = curruntRecord[8].trim();
        csvRecord.addressCity = curruntRecord[9].trim();
        this.csvArr.push(csvRecord);
        // csvArr = [...csvArr, csvRecord]; //mảng nè
      }
    }
    return this.csvArr;
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(",");
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  // option 1
  profileForm: FormGroup;
  error: string;

  fileUpload = { status: "", message: "", filePath: "" };

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [""],
      file: [""]
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get("file").setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.profileForm.get("name").value);
    formData.append("file", this.profileForm.get("file").value);

    this.fileUploadService.upload(formData).subscribe(
      res => (this.fileUpload = res),
      err => (this.error = err)
    );
  }

  // form: FormGroup;
  // progress: number = 0;

  // constructor(
  //   public fb: FormBuilder,
  //   public fileUploadService: FileUploadService
  // ) {
  //   this.form = this.fb.group({
  //     name: [""],
  //     file: [null]
  //   });
  // }

  // ngOnInit() {}

  // uploadFile(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     file: file
  //   });
  //   this.form.get("avatar").updateValueAndValidity();
  // }

  // submitUser() {
  //   this.fileUploadService
  //     .addUser(this.form.value.name, this.form.value.file)
  //     .subscribe((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           console.log("Request has been made!");
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           console.log("Response header has been received!");
  //           break;
  //         case HttpEventType.UploadProgress:
  //           this.progress = Math.round((event.loaded / event.total) * 100);
  //           console.log(`Uploaded! ${this.progress}%`);
  //           break;
  //         case HttpEventType.Response:
  //           console.log("User successfully created!", event.body);
  //           setTimeout(() => {
  //             this.progress = 0;
  //           }, 1500);
  //       }
  //     });
  // }

  // selectedFile: File = null;
  // constructor(private http: HttpClient) {}
  // uploadProgress: any;
  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0] as File;
  // }
  // onUpload() {
  //   const fd = new FormData();
  //   fd.append("file", this.selectedFile);
  //   this.http
  //     .post(
  //       "https://training-management-dev.herokuapp.com/api/v1/auth/registerByImportingCsvFile",
  //       fd,
  //       {
  //         reportProgress: true,
  //         observe: "events",
  //         headers: new HttpHeaders({ "Content-Type": "application/json" })
  //       }
  //     )
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.uploadProgress =
  //           "Upload Progress: " +
  //           Math.round((event.loaded / event.total) * 100) +
  //           "%";
  //       } else if (event.type === HttpEventType.Response) {
  //         console.log(event);
  //       }
  //       console.log(event);
  //     });
  // }
}
