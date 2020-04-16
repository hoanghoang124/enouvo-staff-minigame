import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Staff } from '../models/staff.model';
import { State } from '../store/reducers';
import * as fromStaff from '../store';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  getState: Observable<any>;
  user = null;
  errorMessage = null;
  currentUser: any;
  userFromApi: any;
  staffs: any[];
  stafflist$: Observable<any>;
  isStaffLoading$: Observable<any>;

  breakpoint: number;

  private dialogService: DialogService;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
    this.stafflist$.subscribe(res => {
      this.staffs = res as Staff[];
    });
  }

  openUserProfileModal(userId) {
    this.dialogService
      .seeProfile(userId)
      .then(confirmed => console.log('User confirmed, confirmed', confirmed))
      .catch(() => console.log('User dismissed the dialog'));
  }
}
