import { AuthService } from '../../Auth/Services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { StaffService } from '../Services/staff.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store';
import { State } from '../../Store/reducers';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;
  clicked = false;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  currentUser: any;
  userFromApi: any;
  staffs: any[] = [
    {
      id: '1',
      name: 'name 1',
      information: 'information 1',
      star: 22
    },
    {
      id: '2',
      name: 'name 2',
      information: 'information 2',
      star: 96
    },
    {
      id: '3',
      name: 'name 3',
      information: 'information 3',
      star: 3
    },
    {
      id: '4',
      name: 'name 4',
      information: 'information 4',
      star: 1
    },
    {
      id: '5',
      name: 'name 5',
      information: 'information 5',
      star: 17
    },
    {
      id: '6',
      name: 'name 6',
      information: 'information 6',
      star: 68
    },
    {
      id: '7',
      name: 'name 7',
      information: 'information 7',
      star: 25
    },
    {
      id: '8',
      name: 'name 8',
      information: 'information 8',
      star: 46
    },
    {
      id: '9',
      name: 'name 9',
      information: 'information 9',
      star: 87
    },
    {
      id: '10',
      name: 'name 10',
      information: 'information 10',
      star: 85
    }
  ];

  constructor(
    private staffService: StaffService,
    private authService: AuthService,
    private store: Store<State>
  ) {
    // this.currentUser = this.authGuardService.currentUserValue;
  }

  showDetail() {
    this.clicked = !this.clicked;
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showScroll = true;
    } else if (
      this.showScroll &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
    }
  }

  ngOnInit() {
    this.clicked = false;
    this.getState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }
}
