import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RoleId } from '../models/role.model';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = environment.apiBaseUrl;
  role: string;
  roles = RoleId;
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    this.role = localStorage.getItem('role');
    if (
      (this.role === this.roles.HR || this.role === this.roles.PM) &&
      this.isLoggedIn()
    ) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    return localStorage.clear();
  }

  shouldUserChangePassword(): string {
    return localStorage.getItem('shouldUserChangePassword');
  }

  logIn(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/login`;
    return this.http.post<User>(url, params);
  }

  changePassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/change-password`;
    return this.http.post<User>(url, params);
  }

  resetPassword(param): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/reset-password`;
    return this.http.post<User>(url, param);
  }
}
