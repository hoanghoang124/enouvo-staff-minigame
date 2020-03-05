import { getRole } from './../../Store/selectors/auth.selector';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../Models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://training-management-dev.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/login`;
    return this.http.post<User>(url, params);
  }

  resetPassword(param): Observable<any> {
    const url = `${this.BASE_URL}/reset-password-on-api`;
    return this.http.post<User>(url, param);
  }

  isAdmin(): string {
    return localStorage.getItem('role');
  }

  isStaff(): string {
    return localStorage.getItem('role');
  }

  getAll() {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<User[]>(url);
  }

  getById(id: number) {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<User>(url);
  }
}
