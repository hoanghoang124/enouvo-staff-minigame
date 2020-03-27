import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCSVComponent implements OnInit {
  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  SERVER_URL =
    'https://training-management-dev.herokuapp.com/api/v1/auth/register-by-importing-csv-file';
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      file: [null]
    });
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  submitForm() {
    const formData = new FormData();

    formData.append('file', this.form.get('file').value);
    this.http
      .post(this.SERVER_URL, formData, { headers: this.headers })
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    console.log(formData.get('file'));
  }
}
