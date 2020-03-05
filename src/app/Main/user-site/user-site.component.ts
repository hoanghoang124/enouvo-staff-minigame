import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Auth/Services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { StaffService } from '../Services/staff.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStaff from '../../Store';
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
  staffs: any = [];
  stafflist$: Observable<any>;

  constructor(
    private staffService: StaffService,
    private authService: AuthService,
    private store: Store<State>
  ) {}

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
    // this.getState.subscribe(state => {
    //   this.isAuthenticated = state.isAuthenticated;
    //   this.user = state.user;
    //   this.errorMessage = state.errorMessage;
    // });
    this.staffService.getStaffs().subscribe((staffs: {}) => {
      this.staffs = staffs;
    });
    this.store.dispatch(new fromStaff.GetStaffs());
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
  }
}
