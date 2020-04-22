import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../auth-layout/store';
import { Page, pageSizes } from '../models/pagination.model';
import { SortableDirective } from 'src/app/shared/directives';
import { TableQuery } from '../models/tableQuery.model';
import { UtilServiceService } from '../services/util-service.service';
import { DialogService } from '../services/dialog.service';
import { SortEvent } from 'src/app/shared/sort.model';
import { GetCampaignDetail } from '../store/actions/staff.action';
import {
  getIsCmpDtlLoading,
  getCampaignDetail,
  getErrorGtCmpDtlMessage
} from '../store/selectors/staff.selector';
import * as _ from 'lodash';
@Component({
  selector: 'app-campaign-detail-admin',
  templateUrl: './campaign-detail-admin.component.html',
  styleUrls: ['./campaign-detail-admin.component.scss']
})
export class CampaignDetailAdminComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;

  campaign$: Observable<any>;
  isCampaignDetailLoading$: Observable<boolean>;
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
    private utilService: UtilServiceService,
    private modalService: NgbModal,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetCampaignDetail(params.id));
    });
    this.campaign$ = this.store.select(getCampaignDetail);
    // this.totalItems$ = this.store.select(  getTotalStaffs);
    this.errorMessage$ = this.store.select(getErrorGtCmpDtlMessage);
    this.isCampaignDetailLoading$ = this.store.select(getIsCmpDtlLoading);
    // this.fetchTableData(this.tableQuery);
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
    this.store.dispatch(new GetCampaignDetail(query));
  }

  viewHistoryOfCampaign(id, userId) {
    this.dialogService.viewHistoryOfVoting(id, userId);
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
