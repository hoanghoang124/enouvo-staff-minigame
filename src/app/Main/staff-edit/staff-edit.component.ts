import { slideInOutAnimation } from './../animation/slide-in-out.animation';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStaff from '../../Store';
import { State } from '../../Store';
import { Observable } from 'rxjs';
import { Staff } from '../Models/staff.model';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class StaffEditComponent implements OnInit {
  staffForm: FormGroup;
  staff: Staff;
  isLoadingResults$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaff(this.route.snapshot.params.id));

    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')]
      ],
      middleName: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')]
      ],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      avatar: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      quote: [null, Validators.required],
      // birthday: [null | date: 'dd/MM/yyyy', Validators.required],
      phone: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required]
    });
    this.store
      .select(fromStaff.getStaff)
      .pipe()
      .subscribe(staff => {
        if (staff) {
          this.staff = staff;
          this.staffForm.patchValue(this.staff);
        }
      });
    this.isLoadingResults$ = this.store.select(fromStaff.getIsLoading);
  }

  onFormSubmit() {
    this.store.dispatch(new fromStaff.UpdateStaff(this.staffForm.value));
  }

  productdetails(index) {
    this.router.navigate(['/admin/' + index + '/detail']);
  }
}
