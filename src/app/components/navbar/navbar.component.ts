import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { AuthService } from 'src/app/layouts/auth-layout/services/auth.service';
import { LogOut } from './../../layouts/auth-layout/store/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
