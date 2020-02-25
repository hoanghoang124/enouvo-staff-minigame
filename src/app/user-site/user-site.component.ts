import { Component, OnDestroy, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "../login/models/user";
import { UserService } from "./../login/services/user.service";

@Component({
  selector: "app-user-site",
  templateUrl: "./user-site.component.html",
  styleUrls: ["./user-site.component.css"]
})
export class UserSiteComponent implements OnInit {
  loading = false;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });
  }
}
