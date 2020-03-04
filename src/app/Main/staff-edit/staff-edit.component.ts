import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StaffService } from '../Services/staff.service';
import { State } from 'src/app/Store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  staffForm: FormGroup;
  id = null;
  firstName = null;
  middleName = null;
  lastName = null;
  avatar = null;
  email = null;
  quote = null;
  birthday = null;
  phone = null;
  addressStreet = null;
  addressCity = null;
  position = null;
  star = 0;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getstaff(this.route.snapshot.params.id);
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      avatar: [null, Validators.required],
      email: [null, Validators.required],
      quote: [null, Validators.required],
      birthday: [null, Validators.required],
      phone: [null, Validators.required],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required],
      star: [null, Validators.required]
    });
  }

  getstaff(id) {
    this.staffService.getStaff(id).subscribe(data => {
      this.id = data.id;
      this.staffForm.setValue({
        id: data.id,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        avatar: data.avatar,
        email: data.email,
        quote: data.quote,
        birthday: data.birthday,
        phone: data.phone,
        addressStreet: data.addressStreet,
        addressCity: data.addressCity,
        position: data.position,
        star: data.star
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.staffService.updateStaff(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/admin']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  productdetails() {
    this.router.navigate(['/admin/' + this.id + '/detail']);
  }
}
