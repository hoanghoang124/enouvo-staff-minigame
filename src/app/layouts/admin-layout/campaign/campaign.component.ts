import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { pageSizes, Page } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { Campaign } from '../models/campaign.model';
import { State } from '../../auth-layout/store';
import { DialogService } from '../services/dialog.service';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import { SortableDirective } from 'src/app/shared/directives';
import { SortEvent } from 'src/app/shared/sort.model';
import {
  getErrorGtAllCmpMessage,
  getAllCampaigns,
  getTotalCampaigns,
  getIsCrtCmpLoading,
  getIsGtAllCmpLoading
} from '../store/selectors/campaign.selector';
import { GetCampaign } from '../store/actions/campaign.action';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  campaigns$: Observable<Campaign[]>;
  isCampaginLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  totalCampaigns = 0;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  model: NgbDateStruct;
  totalCampaigns$: Observable<number>;
  searchForm1 = new FormGroup({
    fromdate: new FormControl(''),
    status: new FormControl(''),
    title: new FormControl('')
  });
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal
  ) {
    this.paging = new Page();
  }

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.campaigns$ = this.store.select(getAllCampaigns);
    this.totalCampaigns$ = this.store.select(getTotalCampaigns);
    this.errorMessage$ = this.store.select(getErrorGtAllCmpMessage);
    this.isLoadingResults$ = this.store.select(getIsCrtCmpLoading);
    this.isCampaginLoading$ = this.store.select(getIsGtAllCmpLoading);
    this.fetchTableData(this.tableQuery);
  }

  openCreateCampaignDialog() {
    this.dialogService.createCampaign();
  }

  openUpdateCampaignDialog(
    campaignId,
    campaignTitle,
    campaignIsCampaignActive,
    campaignDescription,
    campaignStartDate,
    campaginEndDate
  ) {
    this.dialogService.updateCampaign(
      campaignId,
      campaignTitle,
      campaignIsCampaignActive,
      campaignDescription,
      campaignStartDate,
      campaginEndDate
    );
  }

  openConfirmDeleteCampaign(campaignId) {
    this.dialogService.confirmDeleteCampaign(
      'Please confirm ...',
      'Are you sure want to delete this campaign? This action can not be undone.',
      campaignId
    );
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
    console.log(this.searchForm1.value);
    if (this.searchForm1.get('fromdate').value !== '') {
      this.fetchTableData({
        ...this.tableQuery,
        fromDate: this.searchForm1.get('fromdate').value.toString()
      });
    }
    if (this.searchForm1.get('status').value !== '') {
      this.fetchTableData({
        ...this.tableQuery,
        isCampaignActive: this.searchForm1.get('status').value
      });
    }
    if (this.searchForm1.get('title').value !== '') {
      this.fetchTableData({
        ...this.tableQuery,
        title: this.searchForm1.get('title').value
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
    this.store.dispatch(new GetCampaign(query));
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
