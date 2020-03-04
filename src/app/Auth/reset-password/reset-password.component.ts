import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/Store/reducers";
import * as fromAuth from "../../Store";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  resetPasswordForm: FormGroup;

  constructor(private store: Store<State>, private FormBuilder: FormBuilder) {}

  ngOnInit() {
    this.resetPasswordForm = this.FormBuilder.group({
      confirmPassword: ["", Validators.required]
    });

    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
  }
  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.store.dispatch(
      new fromAuth.ResetPassword(this.resetPasswordForm.value)
    );
  }
}
