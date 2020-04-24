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
import {
  getStarLimit,
  getStarLeft,
  getVotedStar,
  getCampaignDetailForVoting,
  getIsCmpDtlVtgLoading,
  getErrorGtCmpDtlVtgMessage
} from '../store/selectors/campaign.selector';
import {
  Vote,
  Devote,
  GetCampaignDetailForVoting
} from '../store/actions/campaign.action';

@Component({
  selector: 'app-campaign-detail-staff',
  templateUrl: './campaign-detail-staff.component.html',
  styleUrls: ['./campaign-detail-staff.component.scss']
})
export class CampaignDetailStaffComponent implements OnInit {
  @Input() campaignId: number;

  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;
  campaign$: Observable<any>;
  isCampaignLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  model: NgbDateStruct;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  searchText: string;
  starLimit$: Observable<number>;
  votedStar$: Observable<number>;
  starLeft$: Observable<number>;

  constructor(
    private store: Store<State>,
    private activeModal: NgbActiveModal // private router: Router, // private route: ActivatedRoute, // private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    // this.tableQuery = this.defaultQuery;
    // this.totalItems$ = this.store.select(getTotalStaffs);
    // this.fetchTableData(this.tableQuery);
    this.store.dispatch(new GetCampaignDetailForVoting(this.campaignId));
    this.campaign$ = this.store.select(getCampaignDetailForVoting);
    this.starLimit$ = this.store.select(getStarLimit);
    this.votedStar$ = this.store.select(getVotedStar);
    this.starLeft$ = this.store.select(getStarLeft);
    this.isCampaignLoading$ = this.store.select(getIsCmpDtlVtgLoading);
    this.errorMessage$ = this.store.select(getErrorGtCmpDtlVtgMessage);
  }

  Vote(receiverId) {
    this.store.dispatch(
      new Vote({
        id: this.campaignId,
        voting: { receiverId: receiverId, numberOfStars: 1 }
      })
    );
  }

  Devote(receiverId) {
    this.store.dispatch(
      new Devote({
        id: this.campaignId,
        voting: {
          receiverId: receiverId,
          numberOfStars: -1
        }
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
