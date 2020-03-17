import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { Role } from '../Models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = environment.apiBaseUrl;
  role: string;
  roles = Role;
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return localStorage.getItem('token');
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

  getAll() {
    const url = `${this.BASE_URL}/users`;
    return this.http.get<User[]>(url);
  }

  getById(id: number) {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<User>(url);
  }
}
