import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/reducers';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { PositionTypes } from '../../auth-layout/models/role.model';
import { Cities } from '../../auth-layout/models/city.model';
import { DialogService } from '../services/dialog.service';
import { pageSizes } from '../models/pagination.model';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromStaff from '../store';
import { tableQuery } from '../models/tableQuery.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  staffs$: Observable<any>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;
  pageSizes = pageSizes;
  tableQuery: tableQuery;
  totalItems$: Observable<number>;
  defaultQuery = { limit: 10, offset: 1 };

  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    // this.tableQuery = this.defaultQuery;
    // this.fetchTableData(this.tableQuery);

    // get staffs from api
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);

    // get error message response from API
    this.errorMessage$ = this.store.select(
      fromAuthSelector.getErrorRsPswMessage
    );

    // get loading status
    this.isLoadingResults$ = this.store.select(
      fromAuthSelector.getIsCrtAccLoading
    );
  }

  openUploadCSVFileDialog() {
    this.dialogService
      .uploadCSVFile(
        'Register staff by CSV',
        'Register many staffs as the same time by import CSV file.',
        'Note: Only accecpt .csv'
      )
      .then(confirmed => console.log('User comfirmed:', confirmed))
      .catch(() => console.log('User dimissed the dialog'));
  }

  openConfirmationDialog(userId) {
    this.dialogService
      .confirm(
        'Please confirm...',
        'Are you sure you want to reset password for this account? This action can not be undone.',
        userId
      )
      .then(confirmed => console.log('User confirmed:', confirmed))
      .catch(() => console.log('User dismissed the dialog'));
  }

  // change page size
  // changePageSize(event) {
  //   const limit = parseInt(event.target.value, 10);
  //   this.tableQuery = { ...this.tableQuery, limit };
  //   this.fetchTableData(this.tableQuery);
  // }

  // change page
  // changePage(event) {
  //   this.tableQuery = { ...this.tableQuery, offset: event };
  //   this.fetchTableData({ ...this.tableQuery, offset: event });
  // }

  // fetch table data with query
  // fetchTableData(query: tableQuery) {
  //   query = { ...query, offset: (query.offset - 1) * query.limit };
  //   this.store.dispatch(new fromStaff.GetStaffs(query));
  // }
}
