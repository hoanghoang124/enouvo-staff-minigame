import { Observable } from "rxjs";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./Auth/Models/user";
import { AuthGuardService } from "./Auth/Services/auth-guard.service";

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
    private router: Router,
    private authGuardService: AuthGuardService
  ) {}
}
