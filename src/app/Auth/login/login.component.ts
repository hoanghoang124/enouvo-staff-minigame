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
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    // console.log("vaoday");
    this.store.dispatch(new LogIn(payload));
  }
}
