import { HistoryOfVotingModalComponent } from './../modal/history-of-voting-modal/history-of-voting-modal.component';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmResetPasswordModalComponent } from '../modal/confirm-reset-password-modal/confirm-reset-password-modal.component';
import { ChangePasswordModalComponent } from '../modal/change-password-modal/change-password-modal.component';
import { UploadCsvModalComponent } from '../modal/upload-csv-modal/upload-csv-modal.component';
import { CreateAccountModalComponent } from '../modal/create-account-modal/create-account-modal.component';
import { CreateCampaignModalComponent } from '../modal/create-campaign-modal/create-campaign-modal.component';
import { UserProfileModalComponent } from '../modal/user-profile-modal/user-profile-modal.component';
import { UpdateCampaignModalComponent } from '../modal/update-campaign-modal/update-campaign-modal.component';
import { CampaignProfileAsAdminModalComponent } from '../modal/campaign-profile-as-admin-modal/campaign-profile-as-admin-modal.component';
import { CampaignProfileAsStaffModalComponent } from '../modal/campaign-profile-as-staff-modal/campaign-profile-as-staff-modal.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private confirmDialogRef: NgbModalRef;
  private changePasswordDialogRef: NgbModalRef;
  private uploadCSVDialogRef: NgbModalRef;
  private createAccountDialogRef: NgbModalRef;
  private createCampaignDialogRef: NgbModalRef;
  private updateCampaginDialogRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    userId: number,
    btnOkText: string = 'Confirm',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    this.confirmDialogRef = this.modalService.open(
      ConfirmResetPasswordModalComponent,
      { size: 'md', centered: true }
    );
    this.confirmDialogRef.componentInstance.title = title;
    this.confirmDialogRef.componentInstance.message = message;
    this.confirmDialogRef.componentInstance.userId = userId;
    this.confirmDialogRef.componentInstance.btnOkText = btnOkText;
    this.confirmDialogRef.componentInstance.btnCancelText = btnCancelText;

    return this.confirmDialogRef.result;
  }

  public closeConfirm() {
    this.confirmDialogRef.close();
    this.confirmDialogRef = null;
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

  public viewCampaignAsStaffPosition(): Promise<boolean> {
    const modalRef = this.modalService.open(
      CampaignProfileAsStaffModalComponent,
      {
        windowClass: 'dialog-size-xl',
        centered: true
      }
    );

    return modalRef.result;
  }

  public viewCampaignAsAdminPosition(): Promise<boolean> {
    const modalRef = this.modalService.open(
      CampaignProfileAsAdminModalComponent,
      {
        windowClass: 'dialog-size-xl',
        centered: true
      }
    );

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

  public closeUpdateCampaign() {
    this.updateCampaginDialogRef.close();
    this.updateCampaginDialogRef = null;
  }

  public viewHistoryOfVoting() {
    const modalRef = this.modalService.open(HistoryOfVotingModalComponent, {
      windowClass: 'dialog-size-xl',
      centered: true
    });

    return modalRef.result;
  }
}
