import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pageSizes, Page } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { UtilServiceService } from '../services/util-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SortEvent } from 'src/app/shared/sort.model';
import { Campaign } from '../models/campaign.model';
import { State } from '../../auth-layout/store';
import { DialogService } from '../services/dialog.service';
import * as fromStaff from '../store';
import * as _ from 'lodash';
import { SortableDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers2: QueryList<SortableDirective>;

  campaigns$: Observable<Campaign[]>;
  isCampaginLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal,
    private utilService: UtilServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.campaigns$ = this.store.select(fromStaff.getAllCampaigns);
    // this.totalItems$ = this.store.select(fromStaff.getTotalStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllCmpMessage);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtCmpLoading);
    this.isCampaginLoading$ = this.store.select(fromStaff.getIsGtAllCmpLoading);
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

  onSort(sort: SortEvent) {
    this.paging.pageNumber = 1;
    this.changeQuery({
      ...this.utilService.getSortQuery(sort, this.headers2),
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
    this.store.dispatch(new fromStaff.GetCampaign(query));
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
