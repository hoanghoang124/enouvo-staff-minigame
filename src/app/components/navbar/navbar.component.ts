import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { AuthService } from 'src/app/layouts/auth-layout/services/auth.service';
import { LogOut } from './../../layouts/auth-layout/store/auth.action';
import { ROUTES } from 'src/app/layouts/admin-layout/models/app-routes.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/layouts/admin-layout/services/dialog.service';
import { Observable } from 'rxjs';

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
  isLoadingResults$: Observable<boolean>;
  username: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    public authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
    this.username = localStorage.getItem('username');
  }

  public openChangePasswordDialog() {
    this.dialogService
      .changePassword(
        'Change Password Form',
        'Tips: A secure enough password can protect your privacy.'
      )
      .then(event => console.log('Execute changing password:', event))
      .catch(() => console.log('User dismissed the dialog'));
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
