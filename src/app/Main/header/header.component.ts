import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut, ResetPassword } from 'src/app/Store/actions/auth.action';
import { Router } from '@angular/router';
import { State } from 'src/app/Store/reducers';
import { User } from 'src/app/Auth/Models/user.model';
import { Role } from 'src/app/Auth/Models/role.model';
import * as fromAuth from '../../Store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  role: string;
  roles = Role;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(fromAuth.getRole)
      .pipe()
      .subscribe(val => {
        this.role = val;
      });
    this.role = localStorage.getItem('role');
  }

  // admin

  logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }

  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  staff(): void {
    this.router.navigate(['/dashboard']);
  }
}
