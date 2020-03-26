import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { State } from '../../auth-layout/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../auth-layout/store/auth.action';
import { User } from '../../auth-layout/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  resetPasswordForm: FormGroup;
  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  id: User;
  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    //  cho nay logic sai goi`
    // this.store.dispatch(new fromAuthAction.ResetPassword(id));
  }
}
