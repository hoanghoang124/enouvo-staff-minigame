import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
// import { ActivatedRoute, Router } from '@angular/router';

// import { SortEvent } from 'src/app/shared/sort.model';
// import { UtilServiceService } from '../services/util-service.service';
import { Page, pageSizes } from '../models/pagination.model';
import { SortableDirective } from 'src/app/shared/directives';
import { TableQuery } from '../models/tableQuery.model';
import { State } from '../store/reducers';

import * as _ from 'lodash';
import { AuthService } from '../../auth-layout/services/auth.service';
import {
  getStarLimit,
  getStarLeft,
  getVotedStar,
  getCampaignListStaff,
  getCampaignDetailForVoting,
  getIsCmpDtlVtgLoading,
  getErrorGtCmpDtlVtgMessage,
  getIsVtgLoading,
  getErrorVtgMessage
} from '../store/selectors/campaign.selector';
import {
  Vote,
  GetCampaignDetailForVoting,
  GetCampaignListStaff
} from '../store/actions/campaign.action';
@Component({
  selector: 'app-campaign-detail-staff',
  templateUrl: './campaign-detail-staff.component.html',
  styleUrls: ['./campaign-detail-staff.component.scss']
})
export class CampaignDetailStaffComponent implements OnInit {
  @Input() campaignId: number;

  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;
  staffs$: Observable<any>;
  campaign$: Observable<any>;
  isCampaignLoading$: Observable<boolean>;
  isVotingLoading$: Observable<boolean>;
  errorVotingMessage$: Observable<boolean>;
  errorMessage$: Observable<string>;
  starLimit$: Observable<number>;
  votedStar$: Observable<number>;
  starLeft$: Observable<number>;
  currentUserId: number;

  model: NgbDateStruct;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;

  constructor(
    private store: Store<State>,
    public authService: AuthService,
    private activeModal: NgbActiveModal // private router: Router, // private route: ActivatedRoute, // private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    // this.tableQuery = this.defaultQuery;
    // this.totalItems$ = this.store.select(getTotalStaffs);
    // this.fetchTableData(this.tableQuery);
    this.store.dispatch(new GetCampaignDetailForVoting(this.campaignId));
    this.store.dispatch(new GetCampaignListStaff({ id: this.campaignId }));
    this.campaign$ = this.store.select(getCampaignDetailForVoting);
    this.staffs$ = this.store.select(getCampaignListStaff);
    this.starLimit$ = this.store.select(getStarLimit);
    this.votedStar$ = this.store.select(getVotedStar);
    this.starLeft$ = this.store.select(getStarLeft);
    this.isCampaignLoading$ = this.store.select(getIsCmpDtlVtgLoading);
    this.errorMessage$ = this.store.select(getErrorGtCmpDtlVtgMessage);
    this.currentUserId = +localStorage.getItem('id');
    this.isVotingLoading$ = this.store.select(getIsVtgLoading);
    this.errorVotingMessage$ = this.store.select(getErrorVtgMessage);
  }

  Vote(receiverId) {
    this.store.dispatch(
      new Vote({
        id: this.campaignId,
        voting: { receiverId: receiverId, numberOfStars: 1 }
      })
    );
  }

  // onSort(sort: SortEvent) {
  //   this.paging.pageNumber = 1;
  //   this.changeQuery({
  //     ...this.utilService.getSortQuery(sort, this.headers1),
  //     pageNumber: 1
  //   });
  // }

  // changeQuery(query: any = {}) {
  //   let { queryParams } = this.route.snapshot;
  //   queryParams = { ...queryParams, ...query };
  //   this.router.navigate(['campaign'], {
  //     queryParams: _.pickBy(queryParams, _.identity)
  //   });
  // }

  // changePageSize(event) {
  //   const limit = parseInt(event.target.value, 10);
  //   this.tableQuery = { ...this.tableQuery, limit };
  //   this.fetchTableData(this.tableQuery);
  // }

  // changePage(event) {
  //   this.tableQuery = { ...this.tableQuery, offset: event };
  //   this.fetchTableData({ ...this.tableQuery, offset: event });
  // }

  // fetchTableData(query: TableQuery) {
  //   query = { ...query, offset: (query.offset - 1) * query.limit };
  //   this.store.dispatch(new GetStaffs(query));
  // }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
