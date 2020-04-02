import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { AuthService } from 'src/app/layouts/auth-layout/services/auth.service';
import { LogOut } from './../../layouts/auth-layout/store/auth.action';
import { ROUTES } from 'src/app/layouts/admin-layout/models/app-routes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private store: Store<State>,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
