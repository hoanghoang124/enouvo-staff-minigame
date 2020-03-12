import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/Store/actions/auth.action';
import { Router } from '@angular/router';
import { State } from 'src/app/Store/reducers';
import { Role } from 'src/app/Auth/Models/role.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  roles = Role;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  admin(): void {
    this.router.navigate(['/admin']);
  }

  staff(): void {
    this.router.navigate(['/dashboard']);
  }

  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }
}
