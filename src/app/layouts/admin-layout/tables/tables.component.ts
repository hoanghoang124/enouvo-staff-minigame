import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { pageSizes, Page } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { Staff } from '../models/staff.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SortEvent } from 'src/app/shared/sort.model';
// import { UtilServiceService } from '../services/util-service.service';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';
import * as fromStaff from '../store';
import * as _ from 'lodash';
import { State } from '../../auth-layout/store';
import { PaginationService } from '../services/pagination.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;

  staffs$: Observable<Staff[]>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  staffsData = [];
  displayedClients = [];
  totalItems = 0;
  sorting: SortEvent;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText = '';
  componentDestroyed$: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private paginationService: PaginationService
  ) {
    this.sorting = new SortEvent();
    this.paging = new Page();
  }

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    // get staffs from api
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.staffs$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(staffs => {
          this.staffsData = staffs;
          this.updateFilter();
        })
      )
      .subscribe();
    this.totalItems$ = this.store.select(fromStaff.getTotalStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtAccLoading);
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
    this.dialogService.confirm(
      'Please confirm...',
      'Are you sure you want to reset password for this account? This action can not be undone.',
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
    // resetting other headers
    this.headers1.forEach(header => {
      if (header.sortable !== orderBy) {
        header.direction = '';
      }
    });
    console.log(order, orderBy);
    this.sorting.orderBy = orderBy;
    this.sorting.order = order;
  }

  updateFilter() {
    // 1. sort
    let staffs = this.paginationService.sort(
      this.staffsData,
      this.sorting.orderBy,
      this.sorting.order
    );

    // 2. filter
    staffs = staffs.filter(staff => this.matches(staff, this.searchText));
    this.totalItems = staffs.length;

    // 3. paginate
    const { pageSize, pageNumber } = this.paging;
    staffs = this.paginationService.paginate(staffs, pageSize, pageNumber);
    this.displayedClients = staffs;
  }

  matches(staff, text: string) {
    if (!staff) {
      return;
    }
    console.log(staff);
    return (
      staff.id
        .toString()
        .toLowerCase()
        .includes(text.toLowerCase()) ||
      staff.firstName.toLowerCase().includes(text.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(text.toLowerCase()) ||
      staff.email.toLowerCase().includes(text.toLowerCase())
    );
  }

  onSearch() {
    this.updateFilter();
  }

  clearSearch() {
    this.searchText = '';
    this.updateFilter();
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

  ngOnDestroy() {
    this.modalService.dismissAll();
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
