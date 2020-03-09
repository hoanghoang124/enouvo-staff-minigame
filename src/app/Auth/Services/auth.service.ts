import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'https://training-management-dev.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  isAdmin(): string {
    return localStorage.getItem('role');
  }

  logIn(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/login`;
    return this.http.post<User>(url, params);
  }

  resetPassword(param): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/reset-password`;
    return this.http.post<User>(url, param);
  }

  changePassword(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/change-password`;
    return this.http.post<User>(url, params);
  }
}
