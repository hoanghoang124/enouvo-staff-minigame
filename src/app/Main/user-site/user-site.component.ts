import { fadeInAnimation } from '../animation/fade-in.animation';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStaff from '../../Store';
import { State } from '../../Store/reducers';
import { MatGridList } from '@angular/material';
import { Staff } from '../Models/staff.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class UserSiteComponent implements OnInit {
  getState: Observable<any>;
  user = null;
  errorMessage = null;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  currentUser: any;
  userFromApi: any;
  staffs: any[];
  stafflist$: Observable<any>;

  @ViewChild(MatGridList, { static: true }) grid: MatGridList;
  breakpoint: number;

  constructor(private store: Store<State>) {}

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

  onResize(event) {
    this.breakpoint =
      event.target.innerWidth >= 1440
        ? 4
        : event.target.innerWidth >= 1330
        ? 3
        : event.target.innerWidth >= 900
        ? 2
        : 1;
  }

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
    this.stafflist$.subscribe(res => {
      this.staffs = res as Staff[];
    });
    this.breakpoint =
      window.innerHeight >= 1440
        ? 4
        : window.innerWidth >= 1330
        ? 3
        : window.innerWidth >= 900
        ? 2
        : 1;
  }
}
