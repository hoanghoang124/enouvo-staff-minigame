import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input
} from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';
import { Observable } from 'rxjs';
import { Staff } from '../../models/staff.model';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pageSizes, Page } from '../../models/pagination.model';
import { TableQuery } from '../../models/tableQuery.model';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilServiceService } from '../../services/util-service.service';
import { SortEvent } from 'src/app/shared/sort.model';
import { DialogService } from '../../services/dialog.service';
import * as fromStaff from '../../store';
import * as _ from 'lodash';

@Component({
  selector: 'app-campaign-profile-as-admin-modal',
  templateUrl: './campaign-profile-as-admin-modal.component.html',
  styleUrls: ['./campaign-profile-as-admin-modal.component.scss']
})
export class CampaignProfileAsAdminModalComponent implements OnInit {
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
    private activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilServiceService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.store.dispatch(new fromStaff.GetCampaignDetail(this.campaignId));
    this.staffs$ = this.store.select(fromStaff.getCampaignDetail);
    // this.totalItems$ = this.store.select(fromStaff.getTotalStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtCmpDtlMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsCmpDtlLoading);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtAccLoading);
    // this.fetchTableData(this.tableQuery);
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
    this.router.navigate(['campaign'], {
      queryParams: _.pickBy(queryParams, _.identity)
    });
  }

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
  //   this.store.dispatch(new fromStaff.GetCampaignDetail(query));
  // }

  viewHistoryOfCampaign() {
    this.dialogService.viewHistoryOfVoting();
  }
}
