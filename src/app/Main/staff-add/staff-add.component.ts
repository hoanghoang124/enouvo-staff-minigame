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
  isLoadingResults = false;

  constructor(
    private router: Router,
    private staffService: StaffService,
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      name: [null, Validators.required],
      information: [null, Validators.required],
      star: [0, Validators.required]
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
