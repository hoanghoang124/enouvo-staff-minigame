import { AuthService } from "./auth.service";

import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAdmin()) {
      this.router.navigate(["/dashboard"]);
      return false;
    }
    return true;
  }
}
