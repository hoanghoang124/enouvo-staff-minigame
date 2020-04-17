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
import { Page } from '../models/page.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SortEvent } from 'src/app/shared/sort.model';
import * as _ from 'lodash';
import { UtilServiceService } from '../services/util-service.service';
import { SortableDirective } from 'src/app/shared/sortable.directive';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  staffs$: Observable<Staff[]>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    // get staffs from api
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.totalItems$ = this.store.select(fromStaff.getTotalStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtAccLoading);
    this.fetchTableData(this.tableQuery);
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

  onSort(sort: SortEvent) {
    this.paging.pageNumber = 1;
    this.changeQuery({
      ...this.utilService.getSortQuery(sort, this.headers),
      pageNumber: 1
    });
  }

  changeQuery(query: any = {}) {
    let { queryParams } = this.route.snapshot;
    queryParams = { ...queryParams, ...query };
    this.router.navigate(['admin'], {
      queryParams: _.pickBy(queryParams, _.identity)
    });
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
    this.store.dispatch(new fromStaff.GetStaffs(query));
  }
}
