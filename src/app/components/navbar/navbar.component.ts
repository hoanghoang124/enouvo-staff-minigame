import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { AuthService } from 'src/app/layouts/auth-layout/services/auth.service';
import { LogOut } from './../../layouts/auth-layout/store/auth.action';
import { ROUTES } from 'src/app/layouts/admin-layout/models/app-routes.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/layouts/admin-layout/services/dialog.service';
import { Observable } from 'rxjs';
import * as fromStaff from '../../layouts/admin-layout/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public focus;
  public listTitles: any[];
  public menuItems: any[];
  public isCollapsed = true;
  isLoadingResults$: Observable<boolean>;
  userId: number = Number(localStorage.getItem('id'));
  avatarUrl: string;
  firstName: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    public authService: AuthService,
    private dialogService: DialogService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaff(this.userId));
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
    this.avatarUrl = localStorage.getItem('avatarUrl');
    this.firstName = localStorage.getItem('firstName');
  }

  openChangePasswordDialog() {
    this.dialogService.changePassword(
      'Change Password Form',
      'Tips: A secure enough password can protect your privacy.'
    );
  }

  openUserProfileModal(userId) {
    this.dialogService.viewProfile(userId);
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
