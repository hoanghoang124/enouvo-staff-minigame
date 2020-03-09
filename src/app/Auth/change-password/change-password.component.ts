import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  errorMessage$: Observable<string> = null;
  changePasswordForm: FormGroup;
  public router: Router;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.store.dispatch(
      new fromAuth.ChangePassword(this.changePasswordForm.value)
    );
    // this.router.navigate(['/login']);
  }
}
