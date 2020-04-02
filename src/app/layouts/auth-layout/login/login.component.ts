import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../store";
import * as fromAuthSelector from "../store/auth.selector";
import * as fromAuthAction from "../store/auth.action";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  loginForm: FormGroup;
  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new fromAuthAction.LogIn(this.loginForm.value));
    }
  }
}
