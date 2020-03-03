import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State, selectAuthState } from "../Store/reducers/app.state";
import { LogIn } from "../Store/actions/auth.action";

@Component({
  selector: "app-log-in",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  getState: Observable<any>;
  errorMessage: string | null;
  loginForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
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
    this.store.dispatch(new LogIn(this.loginForm.value));
  }
}
