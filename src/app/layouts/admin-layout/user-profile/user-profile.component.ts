import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import * as fromStaff from '../store';

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
      this.store.dispatch(new fromStaff.GetStaff(params.id));
      console.log(params.id);
    });
    this.staff$ = this.store.select(fromStaff.getStaff);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsGtStfLoading);
  }
}
