import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "../Models/user";
import { AppState, selectAuthState } from "../Store/app.state";
import { LogIn } from "../Store/actions/auth.action";

@Component({
  selector: "app-log-in",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    // const payload = {
    //   username: this.user.username,
    //   password: this.user.password
    // };
    this.store.dispatch(new LogIn(this.loginForm.value));
  }
}
