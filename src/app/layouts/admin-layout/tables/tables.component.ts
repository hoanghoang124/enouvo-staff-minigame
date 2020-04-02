import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "../store/reducers";
import * as fromStaff from "../store";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { PositionTypes } from "../../auth-layout/models/role.model";
import { Cities } from "../../auth-layout/models/city.model";
import * as fromAuthSelector from "../../auth-layout/store/auth.selector";
import { DialogService } from "../services/dialog.service";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"]
})
export class TablesComponent implements OnInit {
  staffs$: Observable<any>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;

  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    //get staffs from api
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllStfMessage);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);

    //get error message response from API
    this.errorMessage$ = this.store.select(
      fromAuthSelector.getErrorRsPswMessage
    );

    //get loading status
    this.isLoadingResults$ = this.store.select(
      fromAuthSelector.getIsRstPswLoading
    );
  }

  editProfile() {}

  public openConfirmationDialog(userId) {
    this.dialogService
      .confirm(
        "Please confirm...",
        "Are you sure you want to reset password for this account? This action can not be undone.",
        userId
      )
      .then(confirmed => console.log("User confirmed:", confirmed))
      .catch(() => console.log("User dismissed the dialog"));
  }
}
