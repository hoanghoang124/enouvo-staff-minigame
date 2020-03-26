import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
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
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private store: Store<State>,
    public authService: AuthService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
