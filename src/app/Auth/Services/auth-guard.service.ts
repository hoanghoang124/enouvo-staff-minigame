import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../Models/user.model';

@Injectable()
export class AuthGuardService implements CanActivate {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
