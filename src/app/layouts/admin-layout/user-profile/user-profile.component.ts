import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Staff } from '../models/staff.model';
import { State } from '../store/reducers';
import { GetStaff } from '../store/actions/staff.action';
import { getStaff, getIsGtStfLoading } from '../store/selectors/staff.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  staff$: Observable<Staff>;
  isLoadingResults$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetStaff(params.id));
    });
    this.staff$ = this.store.select(getStaff);
    this.isLoadingResults$ = this.store.select(getIsGtStfLoading);
  }
}
