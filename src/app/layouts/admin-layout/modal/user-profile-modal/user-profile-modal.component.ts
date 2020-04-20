import { Component, OnInit, Input } from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import { Observable } from 'rxjs';
import { Staff } from '../../models/staff.model';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromStaff from '../../store/index';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  @Input() userId: number;

  staff$: Observable<Staff>;
  isProfileLoading$: Observable<boolean>;
  constructor(
    private store: Store<State>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaff(this.userId));
    this.staff$ = this.store.select(fromStaff.getStaff);
    this.isProfileLoading$ = this.store.select(fromStaff.getIsGtStfLoading);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
