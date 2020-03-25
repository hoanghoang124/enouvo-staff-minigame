import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/reducers';
import * as fromStaff from '../store';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  staffs$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
  }
}
