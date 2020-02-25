import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./login/_services/authentication.service";
import { User } from "./login/_models/user";
import { Role } from "./login/_models/role";

@Component({
  selector: "app",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  //admin
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
