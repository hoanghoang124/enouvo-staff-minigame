import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

import { DialogService } from '../services/dialog.service';
import { pageSizes, Page } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { Staff } from '../models/staff.model';
import { SortEvent } from 'src/app/shared/sort.model';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';
import { State } from '../../auth-layout/store';
import {
  getErrorGtAllStfMessage,
  getAllStaffs,
  getTotalStaffs,
  getIsGtAllStfLoading,
  getIsCrtAccLoading
} from '../store/selectors/staff.selector';
import { GetStaffs } from '../store/actions/staff.action';
import * as _ from 'lodash';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  staffs$: Observable<Staff[]>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  totalItems = 0;
  sorting: SortEvent;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });

  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal
  ) {
    this.sorting = new SortEvent();
    this.paging = new Page();
  }

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.staffs$ = this.store.select(getAllStaffs);
    this.totalItems$ = this.store.select(getTotalStaffs);
    this.errorMessage$ = this.store.select(getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(getIsGtAllStfLoading);
    this.isLoadingResults$ = this.store.select(getIsCrtAccLoading);
    this.fetchTableData(this.tableQuery);
  }

  openUploadCSVFileDialog() {
    this.dialogService.uploadCSVFile(
      'Register staff by CSV',
      'Register many staffs as the same time by import CSV file.',
      'Note: Only accecpt .csv'
    );
  }

  openConfirmationDialog(userId) {
    this.dialogService.confirmResetPassword(
      'Please confirm...',
      'Are you sure want to reset password for this account? This action can not be undone.',
      userId
    );
  }

  openUserProfileModal(userId) {
    this.dialogService.viewProfile(userId);
  }

  openCreateAccountDialog() {
    this.dialogService.createAccout();
  }

  onSort({ orderBy, order }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== orderBy) {
        header.direction = '';
      }
    });
    console.log(order, orderBy);
    if (order === '') {
      this.tableQuery = {
        ...this.tableQuery,
        orderBy: null,
        order: null
      };
      this.fetchTableData(_.pickBy(this.tableQuery, _.identity));
    } else {
      this.fetchTableData({
        ...this.tableQuery,
        orderBy: orderBy,
        order: +order
      });
    }
  }

  search() {
    if (
      this.searchForm.get('firstname').value === '' &&
      this.searchForm.get('lastname').value === ''
    ) {
      this.fetchTableData(this.tableQuery);
    }
    if (this.searchForm.get('firstname').value !== '') {
      this.fetchTableData({
        ...this.tableQuery,
        firstName: this.searchForm.get('firstname').value
      });
    }
    if (this.searchForm.get('lastname').value !== '') {
      this.fetchTableData({
        ...this.tableQuery,
        lastName: this.searchForm.get('lastname').value
      });
    }
    if (
      this.searchForm.get('fromdate').value !== '' &&
      this.searchForm.get('todate').value !== ''
    ) {
      this.fetchTableData({
        ...this.tableQuery,
        fromDate: this.searchForm.get('fromdate').value.toString(),
        toDate: this.searchForm.get('todate').value.toString()
      });
    }
  }

  changePageSize(event) {
    const limit = parseInt(event.target.value, 10);
    this.tableQuery = { ...this.tableQuery, limit };
    this.fetchTableData(this.tableQuery);
  }

  changePage(event) {
    this.tableQuery = { ...this.tableQuery, offset: event };
    this.fetchTableData({ ...this.tableQuery, offset: event });
  }

  fetchTableData(query: TableQuery) {
    query = { ...query, offset: (query.offset - 1) * query.limit };
    this.store.dispatch(new GetStaffs(query));
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
