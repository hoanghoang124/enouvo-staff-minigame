import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { State } from "src/app/layouts/auth-layout/store";
import * as fromAuthAction from "../../../auth-layout/store/auth.action";
import * as fromAuthSelector from "../../../auth-layout/store/auth.selector";

@Component({
  selector: "app-confirm-reset-password-modal",
  templateUrl: "./confirm-reset-password-modal.component.html",
  styleUrls: ["./confirm-reset-password-modal.component.scss"],
})
export class ConfirmResetPasswordModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() userId: number;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  isLoadingResults$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.isLoadingResults$ = this.store.select(
      fromAuthSelector.getIsRstPswLoading
    );
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.store.dispatch(
      new fromAuthAction.ResetPassword({ profileId: this.userId })
    );
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
