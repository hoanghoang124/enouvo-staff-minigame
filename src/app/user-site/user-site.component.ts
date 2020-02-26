import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "../login/_models/user";
import { UserService } from "../login/_services/user.service";
import { AuthenticationService } from "../login/_services/authentication.service";

@Component({
  selector: "app-user-site",
  templateUrl: "./user-site.component.html",
  styleUrls: ["./user-site.component.css"]
})
export class UserSiteComponent implements OnInit {
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe(user => {
        this.userFromApi = user;
      });
  }
}
