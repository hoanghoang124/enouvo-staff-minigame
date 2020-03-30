import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/reducers';
import * as fromStaff from '../store';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositionTypes } from '../../auth-layout/models/role.model';
import { Cities } from '../../auth-layout/models/city.model';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../auth-layout/store/auth.action';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  staffs$: Observable<any>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //get staffs from api
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getError);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsStaffLoading);

    //initialize edit profile form
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      roleId: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required]
    });

    //initialize reset password form
    this.resetPasswordForm = this.formBuilder.group({
      id: ['']
    });

    //get error message response from API
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);

    //get loading status
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  //onsumit edit profile
  onSubmitEditProfile() {
    if (this.editProfileForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(
        new fromStaff.UpdateStaff(this.editProfileForm.value)
      );
      this.modalService.dismissAll();
    }
  }

  //onsubmit reset password
  onSubmitResetPassword() {
    if (this.resetPasswordForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      console.log(this.resetPasswordForm.value);
      this.store.dispatch(
        new fromAuthAction.ResetPassword(this.resetPasswordForm.value)
      );
      this.modalService.dismissAll();
    }
  }

  //open modal container
  openModal(targetModal, staff) {
    this.modalService.open(targetModal, { size: 'lg', scrollable: true });

    //patch value form table to edit profile form modal
    this.editProfileForm.patchValue({
      firstName: staff.firstName,
      middleName: staff.middleName,
      lastName: staff.lastName,
      birthday: staff.birthday,
      email: staff.email,
      phone: staff.phone,
      roleId: staff.roleId,
      addressCity: staff.addressCity,
      addressStreet: staff.addressStreet
    });

    //patch value form table to reset password form modal
    this.resetPasswordForm.patchValue({
      id: staff.id
    });
  }
}
