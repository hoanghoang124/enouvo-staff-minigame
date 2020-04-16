import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/reducers';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { pageSizes } from '../models/pagination.model';
import * as fromStaff from '../store';
import { TableQuery } from '../models/tableQuery.model';
import { Staff } from '../models/staff.model';
import { NgbdSortableHeaderDirective } from 'src/app/shared/ngbd-sortable-header.directive';
import { SortEvent } from 'src/app/shared/sort.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  staffs$: Observable<Staff[]>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  pageSizes = pageSizes;
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;
  defaultQuery = { limit: 10, offset: 1 };
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<
    NgbdSortableHeaderDirective
  >;

  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    // this.fetchTableData(this.tableQuery);

    // get staffs from api
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.totalItems$ = this.store.select(fromStaff.getTotalQuestions);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtAccLoading);
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

  openUserProfileModal(userId) {
    this.dialogService
      .seeProfile(userId)
      .then(confirmed => console.log('User confirmed, confirmed', confirmed))
      .catch(() => console.log('User dismissed the dialog'));
  }

  openCreateAccountDialog() {
    this.dialogService.createAccout();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    switch (direction) {
      case 'asc':
        this.tableQuery = {
          ...this.tableQuery,
          ...this.defaultQuery,
          orderBy: column
        };
        break;
      case 'desc':
        this.tableQuery = {
          ...this.tableQuery,
          ...this.defaultQuery,
          orderBy: '-' + column
        };
        break;
      default:
        this.tableQuery = { ...this.tableQuery, ...this.defaultQuery };
        break;
    }
    this.fetchTableData(this.tableQuery);
  }

  changeQuery(query: TableQuery = {}) {
    this.tableQuery = { ...this.defaultQuery, ...query };
    this.fetchTableData(this.tableQuery);
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
    this.store.dispatch(new fromStaff.GetStaffsQuery(query));
  }
}
