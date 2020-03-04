import { Role } from "src/app/Auth/models/enum-type";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { User } from "../models/user";

@Injectable()
export class AuthGuardService implements CanActivate {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    public auth: AuthService,
    public router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    if (this.auth.isAdmin() === Role.Admin) {
      this.router.navigateByUrl("/");
      return false;
    }
    return true;
  }

  isStaff(): boolean {
    if (this.auth.isStaff() === Role.User) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
