import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../Models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = environment.apiBaseUrl;
  helper = new JwtHelperService();
  role: string;
  roles = Role;
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    this.role = localStorage.getItem('role');
    if (this.role === this.roles.Admin && this.isLoggedIn()) {
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

  register(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/register`;
    return this.http.post(url, params);
  }

  resetPassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/reset-password`;
    return this.http.post<User>(url, params);
  }

  changePassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/change-password`;
    return this.http.post<User>(url, params);
  }
}
