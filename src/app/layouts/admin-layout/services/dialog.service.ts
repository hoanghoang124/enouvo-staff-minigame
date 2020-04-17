import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmResetPasswordModalComponent } from '../modal/confirm-reset-password-modal/confirm-reset-password-modal.component';
import { ChangePasswordModalComponent } from '../modal/change-password-modal/change-password-modal.component';
import { UploadCsvModalComponent } from '../modal/upload-csv-modal/upload-csv-modal.component';
import { CreateAccountModalComponent } from '../modal/create-account-modal/create-account-modal.component';
import { CreateCampaignModalComponent } from '../modal/create-campaign-modal/create-campaign-modal.component';
import { UserProfileModalComponent } from '../modal/user-profile-modal/user-profile-modal.component';
import { CampaignProfileModalComponent } from './../modal/campaign-profile-modal/campaign-profile-modal.component';
import { UpdateCampaignModalComponent } from '../modal/update-campaign-modal/update-campaign-modal.component';
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
      { size: 'md', centered: true }
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
      size: 'lg',
      centered: true
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
      size: 'lg',
      centered: true
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
      windowClass: 'dialog-size-xl',
      centered: true
    });

    return modalRef.result;
  }

  public viewProfile(userId: number): Promise<boolean> {
    const modalRef = this.modalService.open(UserProfileModalComponent, {
      windowClass: 'dialog-size-xxl',
      centered: true
    });
    modalRef.componentInstance.userId = userId;

    return modalRef.result;
  }

  public createCampaign(): Promise<boolean> {
    const modalRef = this.modalService.open(CreateCampaignModalComponent, {
      windowClass: 'dialog-size-xl',
      centered: true
    });

    return modalRef.result;
  }

  public viewCampaigns(campaignId: number): Promise<boolean> {
    const modalRef = this.modalService.open(CampaignProfileModalComponent, {
      windowClass: 'dialog-size-xl',
      centered: true
    });
    modalRef.componentInstance.campaignId = campaignId;

    return modalRef.result;
  }

  public updateCampaign(campaignId: number): Promise<boolean> {
    const modalRef = this.modalService.open(UpdateCampaignModalComponent, {
      windowClass: 'dialog-size-xl',
      centered: true
    });
    modalRef.componentInstance.campaignId = campaignId;

    return modalRef.result;
  }
}
