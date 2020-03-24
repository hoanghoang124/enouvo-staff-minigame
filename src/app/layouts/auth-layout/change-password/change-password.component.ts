import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  AbstractControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormGroup
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { State } from "../../admin-layout/store";
import * as fromAuthSelector from "../store/auth.selector";
import * as fromAuthAction from "../store/auth.action";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  changePasswordForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: this.MatchPassword("newPassword", "confirmPassword")
      }
    );
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const changePasswordValue = {
      password: this.changePasswordForm.controls["currentPassword"].value,
      newPassword: this.changePasswordForm.controls["newPassword"].value
    };
    this.store.dispatch(new fromAuthAction.ChangePassword(changePasswordValue));
  }

  MatchPassword(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
