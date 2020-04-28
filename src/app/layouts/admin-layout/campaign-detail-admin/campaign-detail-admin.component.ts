import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../auth-layout/store';
import { Page, pageSizes } from '../models/pagination.model';
import { SortableDirective } from 'src/app/shared/directives';
import { TableQuery } from '../models/tableQuery.model';
import { DialogService } from '../services/dialog.service';

import * as _ from 'lodash';
import { GetCampaignDetail } from '../store/actions/campaign.action';
import {
  getIsCmpDtlLoading,
  getCampaignDetail,
  getErrorGtCmpDtlMessage
} from '../store/selectors/campaign.selector';
import { SortEvent } from 'src/app/shared/sort.model';
import { getTotalStaffs } from '../store/selectors/staff.selector';
@Component({
  selector: 'app-campaign-detail-admin',
  templateUrl: './campaign-detail-admin.component.html',
  styleUrls: ['./campaign-detail-admin.component.scss']
})
export class CampaignDetailAdminComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  campaign$: Observable<any>;
  isCampaignDetailLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  model: NgbDateStruct;
  totalItems = 0;
  sorting: SortEvent;

  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private dialogService: DialogService
  ) {
    this.sorting = new SortEvent();
    this.paging = new Page();
  }

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetCampaignDetail(params.id));
    });
    this.campaign$ = this.store.select(getCampaignDetail);

    this.totalItems$ = this.store.select(getTotalStaffs);
    this.errorMessage$ = this.store.select(getErrorGtCmpDtlMessage);
    this.isCampaignDetailLoading$ = this.store.select(getIsCmpDtlLoading);
    this.fetchTableData(this.tableQuery);
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
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetCampaignDetail({ id: params.id, query }));
    });
  }

  viewHistoryOfCampaign(id, userId) {
    this.dialogService.viewHistoryOfVoting(id, userId);
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
