import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetStaff } from 'src/app/Main/Store/actions';
import { AppState } from 'src/app/Main/Store/reducers';
import { Staff } from 'src/app/Main/Models/staff.model';
import { StaffService } from '../Services/staff.service';
import * as staffActions from '../Store/actions';
import { getStaff } from '../Store/reducers/staff.reducer';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private staffService: StaffService,
              private router: Router,
              private store: Store<AppState>) { }

  staff: Observable<Staff>;
  isLoadingResults = true;

  deletestaff(id) {
    if (confirm('Are you sure do you want to delete this Game?')) {
      this.store.dispatch(new staffActions.DeleteStaff(id));
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetStaff(+params.id));
    });
    this.staff = this.store.select(getStaff);
  }
}
