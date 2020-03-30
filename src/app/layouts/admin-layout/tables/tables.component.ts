import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/reducers';
import * as fromStaff from '../store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  staffs$: Observable<any>;
  isStaffLoading$: Observable<boolean>;

  constructor(private store: Store<State>, private modalService: NgbModal) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsStaffLoading);
  }

  open() {
    this.modalService.open(ResetPasswordComponent);
  }
}
