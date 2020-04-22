import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input
} from '@angular/core';
import { Staff } from '../models/staff.model';
import { Page, pageSizes } from '../models/pagination.model';
// import { State } from '../../auth-layout/store';
import { SortableDirective } from 'src/app/shared/directives';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TableQuery } from '../models/tableQuery.model';
import { Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
// import { UtilServiceService } from '../services/util-service.service';
// import { SortEvent } from 'src/app/shared/sort.model';
import * as _ from 'lodash';
import { State } from '../store/reducers';
import { GetCampaignListStaff } from '../store/actions/staff.action';
import {
  getErrorGtCmpLstStf,
  getCampaignListStaff,
  getTotalStaffs,
  getIsCmpLstStfLoading
} from '../store/selectors/staff.selector';

@Component({
  selector: 'app-campaign-detail-staff',
  templateUrl: './campaign-detail-staff.component.html',
  styleUrls: ['./campaign-detail-staff.component.scss']
})
export class CampaignDetailStaffComponent implements OnInit {
  @Input() campaignId: number;

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
    private activeModal: NgbActiveModal // private route: ActivatedRoute // private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    // this.tableQuery = this.defaultQuery;
    this.store.dispatch(new GetCampaignListStaff(this.campaignId));
    this.staffs$ = this.store.select(getCampaignListStaff);
    this.totalItems$ = this.store.select(getTotalStaffs);
    this.errorMessage$ = this.store.select(getErrorGtCmpLstStf);
    this.isStaffLoading$ = this.store.select(getIsCmpLstStfLoading);
    // this.fetchTableData(this.tableQuery);
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
  //   this.store.dispatch(new fromStaff.GetStaffs(query));
  // }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
