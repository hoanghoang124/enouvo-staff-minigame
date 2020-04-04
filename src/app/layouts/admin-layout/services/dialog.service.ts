import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmResetPasswordModalComponent } from "../modal/confirm-reset-password-modal/confirm-reset-password-modal.component";
import { ChangePasswordModalComponent } from "../modal/change-password-modal/change-password-modal.component";
@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    userId: number,
    btnOkText: string = "Confirm",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "md" | "lg" = "md"
  ): Promise<boolean> {
    const modalRef = this.modalService.open(
      ConfirmResetPasswordModalComponent,
      { size: dialogSize }
    );
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.userId = userId;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public changePassword(
    title: string,
    btnOkText: string = "Submit",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "md" | "lg" = "md"
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ChangePasswordModalComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
