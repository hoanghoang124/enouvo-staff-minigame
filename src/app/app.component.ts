import { LogOut } from "./Auth/Store/actions/auth.action";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./Auth/Models/user";
import { AuthGuardService } from "./Auth/Services/auth-guard.service";
import { Role } from "./Auth/Models/role";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentUser: User;
  title = "auth";
  constructor(
    private router: Router,
    private authGuardService: AuthGuardService
  ) {
    this.authGuardService.currentUser.subscribe(x => (this.currentUser = x));
  }
  // admin
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  // logOut(): void {
  //   this.store.dispatch(new LogOut());
  //   this.router.navigate(["/login"]);
  // }
}
