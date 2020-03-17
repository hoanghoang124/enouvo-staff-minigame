import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StaffService } from '../Services/staff.service';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/reducers';
import { UpdateStaff, GetStaff } from '../Store/actions';
import { getStaff } from '../Store/reducers/staff.reducer';
import { Staff } from '../Models/staff.model';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {

  staff: Staff;
  // staffForm: FormGroup;
  // id = 0;
  // name = '';
  // information = '';
  // star = 0;
  isLoadingResults = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private staffService: StaffService,
              private formBuilder: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
  //   this.getstaff(this.route.snapshot.params.id);
  //   this.staffForm = this.formBuilder.group({
  //   name : [null, Validators.required],
  //   information : [null, Validators.required],
  //   star : [null, Validators.required]
  // });
  this.route.params.subscribe(params => {
    this.store.dispatch(new GetStaff(+params.id));
  });
  this.store.select(getStaff).subscribe(staff => {
    if (staff != null) {
      this.staff = staff;
    }
  });
  }


  onSaveStaff() {
    this.isLoadingResults = true;
    this.store.dispatch(new UpdateStaff(this.staff));
  }

  productdetails() {
    this.router.navigate(['/dashboard']);
  }
}
