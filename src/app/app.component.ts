import { Observable } from "rxjs";
import { selectAuthState, AppState } from "./Auth/Store/app.state";
import { LogOut } from "./Auth/Store/actions/auth.action";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "./Auth/Models/user";
import { AuthGuardService } from "./Auth/Services/auth-guard.service";
import { Role } from "./Auth/Models/role";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  getState: Observable<any>;
  currentUser: User;
  title = "auth";
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authGuardService: AuthGuardService
  ) {
    this.getState = this.store.select(selectAuthState);
    this.authGuardService.currentUser.subscribe(x => (this.currentUser = x));
  }
}
