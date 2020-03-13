import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'https://training-management-dev.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAdmin(): string {
    return localStorage.getItem('role');
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

  resetPassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/reset-password`;
    return this.http.post<User>(url, params);
  }

  changePassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/change-password`;
    return this.http.post<User>(url, params);
  }
}
