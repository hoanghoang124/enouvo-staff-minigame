import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { AuthService } from 'src/app/layouts/auth-layout/services/auth.service';
import { LogOut } from './../../layouts/auth-layout/store/auth.action';
import { ROUTES } from 'src/app/layouts/admin-layout/models/app-routes.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/layouts/admin-layout/services/dialog.service';
import * as fromStaff from '../../layouts/admin-layout/store/index';
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
  staff$: Observable<any>;
  username: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    public authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.staff$ = this.store.dispatch(
      new fromStaff.GetStaff(Number(localStorage.getItem('id')))
    );
    this.username = localStorage.getItem('username');
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  public openChangePasswordDialog() {
    this.dialogService
      .changePassword('Change Password Form')
      .then(event => console.log('Execute changing password:', event))
      .catch(() => console.log('User dismissed the dialog'));
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
