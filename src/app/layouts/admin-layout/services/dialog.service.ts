import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmResetPasswordModalComponent } from '../modal/confirm-reset-password-modal/confirm-reset-password-modal.component';
import { ChangePasswordModalComponent } from '../modal/change-password-modal/change-password-modal.component';
import { UploadCsvModalComponent } from '../modal/upload-csv-modal/upload-csv-modal.component';
import { CreateAccountModalComponent } from '../modal/create-account-modal/create-account-modal.component';
import { CreateCampaignModalComponent } from '../modal/create-campaign-modal/create-campaign-modal.component';
import { UserProfileModalComponent } from '../modal/user-profile-modal/user-profile-modal.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    userId: number,
    btnOkText: string = 'Confirm',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(
      ConfirmResetPasswordModalComponent,
      { size: 'md' }
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
    message: string,
    btnOkText: string = 'Submit',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ChangePasswordModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public uploadCSVFile(
    title: string,
    message: string,
    note: string,
    btnOkText: string = 'Upload',
    btnCancelText: string = 'Close'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(UploadCsvModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public createAccout(): Promise<boolean> {
    const modalRef = this.modalService.open(CreateAccountModalComponent, {
      windowClass: 'dialog-size-xl'
    });

    return modalRef.result;
  }

  public seeProfile(userId: number): Promise<boolean> {
    const modalRef = this.modalService.open(UserProfileModalComponent, {
      windowClass: 'dialog-size-xxl'
    });
    modalRef.componentInstance.userId = userId;

    return modalRef.result;
  }

  public createCampaign(): Promise<boolean> {
    const modalRef = this.modalService.open(CreateCampaignModalComponent, {
      windowClass: 'dialog-size-xl'
    });

    return modalRef.result;
  }
}
