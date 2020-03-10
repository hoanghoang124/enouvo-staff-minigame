import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../Shared/Angular-Material/Angular-Material.module';
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
  admin() {
    this.router.navigate(['/admin']);
  }

  // staff
  staff(): void {
    this.router.navigate(['/dashboard']);
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }

  // temporary to test reset password and change password component
  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }
}
