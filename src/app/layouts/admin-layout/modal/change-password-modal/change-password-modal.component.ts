import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/layouts/auth-layout/store";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as fromAuthSelector from "../../../auth-layout/store/auth.selector";
import * as fromAuthAction from "../../../auth-layout/store/auth.action";

@Component({
  selector: "app-change-password-modal",
  templateUrl: "./change-password-modal.component.html",
  styleUrls: ["./change-password-modal.component.scss"]
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() title: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  changePasswordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(
    private store: Store<State>,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required, Validators.minLength(8)]],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: this.MatchPassword("newPassword", "confirmPassword")
      }
    );
    this.errorMessage$ = this.store.select(
      fromAuthSelector.getErrorChgPswMessage
    );
    this.isLoadingResults$ = this.store.select(
      fromAuthSelector.getIsChgPswLoading
    );
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

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      const changePasswordValue = {
        password: this.changePasswordForm.controls["currentPassword"].value,
        newPassword: this.changePasswordForm.controls["newPassword"].value
      };
      this.store.dispatch(
        new fromAuthAction.ChangePassword(changePasswordValue)
      );
      this.activeModal.close(true);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
