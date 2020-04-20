import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import { pageSizes } from '../../models/pagination.model';
import { Page } from '../../models/page.model';
import { SortEvent } from 'src/app/shared/sort.model';
import { SortableDirective } from 'src/app/shared/sortable.directive';
import { Observable } from 'rxjs';
import { Staff } from '../../models/staff.model';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TableQuery } from '../../models/tableQuery.model';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilServiceService } from '../../services/util-service.service';
import * as fromStaff from '../../store';
import * as _ from 'lodash';
@Component({
  selector: 'app-history-of-voting-modal',
  templateUrl: './history-of-voting-modal.component.html',
  styleUrls: ['./history-of-voting-modal.component.scss']
})
export class HistoryOfVotingModalComponent implements OnInit {
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
    private activeModal: NgbActiveModal,
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

  public dismiss() {
    this.activeModal.dismiss();
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
