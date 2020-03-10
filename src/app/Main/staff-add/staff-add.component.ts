import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StaffService } from '../Services/staff.service';
import { State } from 'src/app/Store/reducers';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  staffForm: FormGroup;
  namePattern = '^[a-zA-Z-]$';
  phonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  // tslint:disable-next-line:max-line-length
  urlPattern = '^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$';
  isLoadingResults = false;

  constructor(
    private router: Router,
    private staffService: StaffService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required, Validators.pattern(this.namePattern)],
      middleName: [null, Validators.required, Validators.pattern(this.namePattern)],
      lastName: [null, Validators.required, Validators.pattern(this.namePattern)],
      avatar: [null, Validators.required, Validators.pattern(this.urlPattern)],
      email: [null, Validators.required, Validators.pattern(this.emailPattern)],
      quote: [null, Validators.required],
      birthday: [null, Validators.required],
      phone: [null, Validators.required, Validators.pattern(this.phonePattern)],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required],
      star: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.staffService.createStaff(form).subscribe(
      res => {
        const Id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(['/admin']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
