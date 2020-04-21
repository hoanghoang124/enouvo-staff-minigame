import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../store/reducers';
import { DialogService } from '../services/dialog.service';
import { Staff } from '../models/staff.model';
import { Page, pageSizes } from '../models/pagination.model';
import { TableQuery } from '../models/tableQuery.model';
import { SortableDirective } from 'src/app/shared/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SortEvent } from 'src/app/shared/sort.model';
// import { UtilServiceService } from '../services/util-service.service';
// import { Router, ActivatedRoute } from '@angular/router';
import * as fromStaff from '../store';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableDirective) headers2: QueryList<SortableDirective>;

  getState: Observable<any>;
  errorMessage = null;
  campaigns$: Observable<any>;
  isCampaginLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  paging: Page;
  pageSizes = pageSizes;
  defaultQuery = { limit: 5, offset: 1 };
  tableQuery: TableQuery;
  totalItems$: Observable<number>;
  staffs: any[];
  stafflist$: Observable<any>;
  isStaffLoading$: Observable<any>;

  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    private modalService: NgbModal // private utilService: UtilServiceService, // private router: Router, // private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetCampaign());
    this.campaigns$ = this.store.select(fromStaff.getAllCampaigns);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllCmpMessage);
    this.isCampaginLoading$ = this.store.select(fromStaff.getIsGtAllCmpLoading);

    this.store.dispatch(new fromStaff.GetStaffs());
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
    this.stafflist$.subscribe(res => {
      this.staffs = res as Staff[];
    });
  }

  openUserProfileModal(userId) {
    this.dialogService
      .viewProfile(userId)
      .then(confirmed => console.log('User confirmed, confirmed', confirmed))
      .catch(() => console.log('User dismissed the dialog'));
  }

  openCampaignDetailStaff(campaignId) {
    this.dialogService.viewCampaignStaffList(campaignId);
  }

  // onSort(sort: SortEvent) {
  //   this.paging.pageNumber = 1;
  //   this.changeQuery({
  //     ...this.utilService.getSortQuery(sort, this.headers2),
  //     pageNumber: 1
  //   });
  // }

  // changeQuery(query: any = {}) {
  //   let { queryParams } = this.route.snapshot;
  //   queryParams = { ...queryParams, ...query };
  //   this.router.navigate(['dashboard'], {
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
  //   this.store.dispatch(new fromStaff.GetCampaign(query));
  // }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }
}
