import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Auth/Models/user";
import { Store } from "@ngrx/store";
import { State } from "src/app/Auth/Store/reducers/app.state";
import { LogOut } from "src/app/Auth/Store/actions/auth.action";
import { Role } from "src/app/Auth/Models/role";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {}

  // admin
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }
}
