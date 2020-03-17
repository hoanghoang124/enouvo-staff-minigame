import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/Store/reducers';
import { Staff } from 'src/app/Main/Models/staff.model';
import * as fromStaff from '../../Store';
import { slideInOutAnimation } from '../animation/slide-in-out.animation';
@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class StaffDetailComponent implements OnInit {
  staff$: Observable<Staff>;
  isLoadingResults$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new fromStaff.GetStaff(params.id));
    });
    this.staff$ = this.store.select(fromStaff.getStaff);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsLoading);
  }

  deletestaff(id) {
    this.store.dispatch(new fromStaff.DeleteStaff(id));
  }
}
