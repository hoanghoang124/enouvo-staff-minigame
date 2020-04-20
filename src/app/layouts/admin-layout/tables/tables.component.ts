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
import { FormGroup } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { pageSizes, Page } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { Staff } from '../models/staff.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SortEvent } from 'src/app/shared/sort.model';
// import { UtilServiceService } from '../services/util-service.service';
import { SortableDirective } from 'src/app/shared/sortable.directive';
import * as fromStaff from '../store';
import * as _ from 'lodash';
import { State } from '../../auth-layout/store';
import { PaginationService } from '../services/pagination.service';

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
  clientsData = [];
  displayedClients = [];
  totalItems = 0;
  sorting: SortEvent;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    // private utilService: UtilServiceService,
    private paginationService: PaginationService
  ) {
    this.sorting = new SortEvent();
    this.paging = new Page();
  }

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
        header.direction = 0;
      }
    });

    this.sorting.orderBy = orderBy;
    this.sorting.order = order;
    this.updateFilter();
  }

  updateFilter() {
    // 1. sort
    let clients = this.paginationService.sort(
      this.clientsData,
      this.sorting.orderBy,
      this.sorting.order
    );

    // 2. filter
    clients = clients.filter(client => this.matches(client, this.searchText));
    this.totalItems = clients.length;

    // 3. paginate
    const { pageSize, pageNumber } = this.paging;
    clients = this.paginationService.paginate(clients, pageSize, pageNumber);
    this.displayedClients = clients;
  }

  matches(client, text: string) {
    if (!client.user) {
      return;
    }
    const fullName = client.user.firstName + ' ' + client.user.lastName;

    let userCompany;
    if (client.user.companies[0]) {
      userCompany = client.user.companies[0];
    } else {
      userCompany = '';
    }
    return (
      client.user.id.toLowerCase().includes(text.toLowerCase()) ||
      client.user.firstName.toLowerCase().includes(text.toLowerCase()) ||
      client.user.lastName.toLowerCase().includes(text.toLowerCase()) ||
      client.user.email.toLowerCase().includes(text.toLowerCase()) ||
      fullName.toLowerCase().includes(text.toLowerCase()) ||
      (userCompany.companyName || '')
        .toLowerCase()
        .includes(text.toLowerCase()) ||
      (userCompany.branchCode || '')
        .toLowerCase()
        .includes(text.toLowerCase()) ||
      (userCompany.gstNo || '').toLowerCase().includes(text.toLowerCase())
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
  }
}
