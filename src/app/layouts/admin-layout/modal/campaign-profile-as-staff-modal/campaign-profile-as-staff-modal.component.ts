import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import * as fromStaff from '../../store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Staff } from '../../models/staff.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { pageSizes, Page } from '../../models/pagination.model';
import { TableQuery } from '../../models/tableQuery.model';
import { Store } from '@ngrx/store';
import { SortableDirective } from 'src/app/shared/directives';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilServiceService } from '../../services/util-service.service';
import { SortEvent } from 'src/app/shared/sort.model';

@Component({
  selector: 'app-campaign-profile-as-staff-modal',
  templateUrl: './campaign-profile-as-staff-modal.component.html',
  styleUrls: ['./campaign-profile-as-staff-modal.component.scss']
})
export class CampaignProfileAsStaffModalComponent implements OnInit {
  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;

  staffs$: Observable<Staff[]>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  model: NgbDateStruct;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;
  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.staffs$ = this.store.select(fromStaff.getCampaignListStaff);
    this.totalItems$ = this.store.select(fromStaff.getTotalStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtCmpLstStf);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsCmpLstStfLoading);
    this.fetchTableData(this.tableQuery);
  }

  onSort(sort: SortEvent) {
    this.paging.pageNumber = 1;
    this.changeQuery({
      ...this.utilService.getSortQuery(sort, this.headers1),
      pageNumber: 1
    });
  }

  changeQuery(query: any = {}) {
    let { queryParams } = this.route.snapshot;
    queryParams = { ...queryParams, ...query };
    this.router.navigate(['campaign'], {
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
