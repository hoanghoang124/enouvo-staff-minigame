import { Component, OnInit, HostListener, ViewChild, AfterContentInit } from '@angular/core';
import { StaffService } from '../Services/staff.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStaff from '../../Store';
import { State } from '../../Store/reducers';
import { MatGridList } from '@angular/material';

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
  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };

  @ViewChild(MatGridList, { static: true }) grid: MatGridList;
  breakpoint: number;

  constructor(
    private staffService: StaffService,
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

  onResize(event) {
    this.breakpoint = (event.target.innerWidth >= 1330) ? 3 : ((event.target.innerWidth >= 900) ? 2 : 1);
  }

  ngOnInit() {
    this.clicked = false;
    this.staffService.getStaffs().subscribe((staffs: {}) => {
      this.staffs = staffs;
    });
    this.store.dispatch(new fromStaff.GetStaffs());
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
    this.breakpoint = (window.innerWidth >= 1330) ? 3 : ((window.innerWidth >= 900) ? 2 : 1);
  }
}
