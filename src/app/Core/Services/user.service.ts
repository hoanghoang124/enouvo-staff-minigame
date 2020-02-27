import { environment } from "../../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../Models/user";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
}
