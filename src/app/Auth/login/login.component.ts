import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "../Models/user";
import { AppState, selectAuthState } from "../Store/app.state";
import { LogIn } from "../Store/actions/auth.action";
@Component({
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  formBuilder: any;
  route: any;
  authenticationService: any;
  router: any;

  constructor(private store: Store<AppState>) {
    // redirect to home if already logged in
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return this.error;
    }

    this.loading = true;
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    // console.log("vaoday");
    this.store.dispatch(new LogIn(payload));
  }
}
