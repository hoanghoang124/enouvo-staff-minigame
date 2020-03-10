import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StaffService } from '../Services/staff.service';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  staffForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private staffService: StaffService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      avatar: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      quote: [null, Validators.required],
      birthday: [{value: null, disabled: true}, Validators.required],
      phone: [null, Validators.required],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required]
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
