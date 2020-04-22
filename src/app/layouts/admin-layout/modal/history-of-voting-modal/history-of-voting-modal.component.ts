import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router, ActivatedRoute } from '@angular/router';

// import { SortEvent } from 'src/app/shared/sort.model';
// import { UtilServiceService } from '../../services/util-service.service';
import { State } from 'src/app/layouts/auth-layout/store';
import { pageSizes, Page } from '../../models/pagination.model';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';
import { Observable } from 'rxjs';
import { TableQuery } from '../../models/tableQuery.model';
import { GetVotingHistory } from '../../store/actions/staff.action';
import {
  getVotingHistory,
  getErrorVtgHsrMessage,
  getIsVtgHsrLoading
} from '../../store/selectors/staff.selector';
import * as _ from 'lodash';
@Component({
  selector: 'app-history-of-voting-modal',
  templateUrl: './history-of-voting-modal.component.html',
  styleUrls: ['./history-of-voting-modal.component.scss']
})
export class HistoryOfVotingModalComponent implements OnInit {
  @Input() id: number;
  @Input() userId: number;
  @ViewChildren(SortableDirective) headers1: QueryList<SortableDirective>;

  votingHistory$: Observable<any>;
  isVotingHistoryLoading$: Observable<boolean>;
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
    private activeModal: NgbActiveModal // private router: Router, // private route: ActivatedRoute, // private utilService: UtilServiceService
  ) {}

  ngOnInit() {
    this.tableQuery = this.defaultQuery;
    this.store.dispatch(
      new GetVotingHistory({ id: this.id, userId: this.userId })
    );
    this.votingHistory$ = this.store.select(getVotingHistory);
    // this.totalItems$ = this.store.select(getTotalStaffs);
    this.errorMessage$ = this.store.select(getErrorVtgHsrMessage);
    this.isVotingHistoryLoading$ = this.store.select(getIsVtgHsrLoading);
    // this.fetchTableData(this.tableQuery);
  }

  public dismiss() {
    this.activeModal.dismiss();
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
  //   this.router.navigate(['admin'], {
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
  //   this.store.dispatch(new fromStaff.GetVotingHistory(query));
  // }
}
