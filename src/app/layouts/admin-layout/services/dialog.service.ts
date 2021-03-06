import { Injectable } from '@angular/core';
import { HistoryOfVotingModalComponent } from '../modal/history-of-voting-modal/history-of-voting-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmResetPasswordModalComponent } from '../modal/confirm-reset-password-modal/confirm-reset-password-modal.component';
import { ChangePasswordModalComponent } from '../modal/change-password-modal/change-password-modal.component';
import { UploadCsvModalComponent } from '../modal/upload-csv-modal/upload-csv-modal.component';
import { CreateAccountModalComponent } from '../modal/create-account-modal/create-account-modal.component';
import { CreateCampaignModalComponent } from '../modal/create-campaign-modal/create-campaign-modal.component';
import { UserProfileModalComponent } from '../modal/user-profile-modal/user-profile-modal.component';
import { UpdateCampaignModalComponent } from '../modal/update-campaign-modal/update-campaign-modal.component';
import { CampaignDetailStaffComponent } from '../campaign-detail-staff/campaign-detail-staff.component';
import { ConfirmDeleteCampaignModalComponent } from '../modal/confirm-delete-campaign-modal/confirm-delete-campaign-modal.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private confirmResetPasswordDialogRef: NgbModalRef;
  private confirmDeleteCampaignDialogRef: NgbModalRef;
  private changePasswordDialogRef: NgbModalRef;
  private uploadCSVDialogRef: NgbModalRef;
  private createAccountDialogRef: NgbModalRef;
  private createCampaignDialogRef: NgbModalRef;
  private updateCampaginDialogRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  public confirmResetPassword(
    title: string,
    message: string,
    userId: number,
    btnOkText: string = 'Confirm',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    this.confirmResetPasswordDialogRef = this.modalService.open(
      ConfirmResetPasswordModalComponent,
      { size: 'md', centered: true }
    );
    this.confirmResetPasswordDialogRef.componentInstance.title = title;
    this.confirmResetPasswordDialogRef.componentInstance.message = message;
    this.confirmResetPasswordDialogRef.componentInstance.userId = userId;
    this.confirmResetPasswordDialogRef.componentInstance.btnOkText = btnOkText;
    this.confirmResetPasswordDialogRef.componentInstance.btnCancelText = btnCancelText;

    return this.confirmResetPasswordDialogRef.result;
  }

  public closeConfirm() {
    this.confirmResetPasswordDialogRef.close();
    this.confirmResetPasswordDialogRef = null;
  }

  public changePassword(
    title: string,
    message: string,
    btnOkText: string = 'Submit',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    this.changePasswordDialogRef = this.modalService.open(
      ChangePasswordModalComponent,
      {
        size: 'lg',
        centered: true
      }
    );
    this.changePasswordDialogRef.componentInstance.title = title;
    this.changePasswordDialogRef.componentInstance.message = message;
    this.changePasswordDialogRef.componentInstance.btnOkText = btnOkText;
    this.changePasswordDialogRef.componentInstance.btnCancelText = btnCancelText;

    return this.changePasswordDialogRef.result;
  }

  public closeChangePassword() {
    this.changePasswordDialogRef.close();
    this.changePasswordDialogRef = null;
  }

  public uploadCSVFile(
    title: string,
    message: string,
    note: string,
    btnOkText: string = 'Upload',
    btnCancelText: string = 'Close'
  ): Promise<boolean> {
    this.uploadCSVDialogRef = this.modalService.open(UploadCsvModalComponent, {
      size: 'lg',
      centered: true
    });
    this.uploadCSVDialogRef.componentInstance.title = title;
    this.uploadCSVDialogRef.componentInstance.message = message;
    this.uploadCSVDialogRef.componentInstance.note = note;
    this.uploadCSVDialogRef.componentInstance.btnOkText = btnOkText;
    this.uploadCSVDialogRef.componentInstance.btnCancelText = btnCancelText;

    return this.uploadCSVDialogRef.result;
  }

  public closeUploadCSV() {
    this.uploadCSVDialogRef.close();
    this.uploadCSVDialogRef = null;
  }

  public createAccout(): Promise<boolean> {
    this.createAccountDialogRef = this.modalService.open(
      CreateAccountModalComponent,
      {
        windowClass: 'dialog-size-xl',
        centered: true
      }
    );

    return this.createAccountDialogRef.result;
  }

  public closeCreateAccount() {
    this.createAccountDialogRef.close();
    this.createAccountDialogRef = null;
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
    this.createCampaignDialogRef = this.modalService.open(
      CreateCampaignModalComponent,
      {
        windowClass: 'dialog-size-xl',
        centered: true
      }
    );

    return this.createCampaignDialogRef.result;
  }

  public closeCreateCampaign() {
    this.createCampaignDialogRef.close();
    this.createCampaignDialogRef = null;
  }

  public updateCampaign(
    campaignId: number,
    campaignTitle: string,
    campaignIsCampaignActive: boolean,
    campaignDescription: string,
    campaignStartDate: Date,
    campaignEndDate: Date
  ): Promise<boolean> {
    this.updateCampaginDialogRef = this.modalService.open(
      UpdateCampaignModalComponent,
      {
        windowClass: 'dialog-size-xl',
        centered: true
      }
    );
    this.updateCampaginDialogRef.componentInstance.campaignId = campaignId;
    this.updateCampaginDialogRef.componentInstance.campaignTitle = campaignTitle;
    this.updateCampaginDialogRef.componentInstance.campaignIsCampaignActive = campaignIsCampaignActive;
    this.updateCampaginDialogRef.componentInstance.campaignDescription = campaignDescription;
    this.updateCampaginDialogRef.componentInstance.campaignStartDate = campaignStartDate;
    this.updateCampaginDialogRef.componentInstance.campaignEndDate = campaignEndDate;

    return this.updateCampaginDialogRef.result;
  }

  public closeUpdateCampaign() {
    this.updateCampaginDialogRef.close();
    this.updateCampaginDialogRef = null;
  }

  public confirmDeleteCampaign(
    title: string,
    message: string,
    campaignId: number,
    btnOkText: string = 'Confirm',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    this.confirmDeleteCampaignDialogRef = this.modalService.open(
      ConfirmDeleteCampaignModalComponent,
      {
        size: 'md',
        centered: true
      }
    );
    this.confirmDeleteCampaignDialogRef.componentInstance.title = title;
    this.confirmDeleteCampaignDialogRef.componentInstance.message = message;
    this.confirmDeleteCampaignDialogRef.componentInstance.campaignId = campaignId;
    this.confirmDeleteCampaignDialogRef.componentInstance.btnOkText = btnOkText;
    this.confirmDeleteCampaignDialogRef.componentInstance.btnCancelText = btnCancelText;
    return this.confirmDeleteCampaignDialogRef.result;
  }

  public closeDeleteCampaign() {
    this.confirmDeleteCampaignDialogRef.close();
    this.confirmDeleteCampaignDialogRef = null;
  }

  public viewCampaignStaffList(campaignId: number) {
    const modalRef = this.modalService.open(CampaignDetailStaffComponent, {
      windowClass: 'dialog-size-xl',
      centered: true
    });
    modalRef.componentInstance.campaignId = campaignId;
  }

  public viewHistoryOfVoting(id: number, userId: number) {
    const modalRef = this.modalService.open(HistoryOfVotingModalComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.userId = userId;

    return modalRef.result;
  }
}
