import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TablesComponent } from './tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ConfirmResetPasswordModalComponent } from './modal/confirm-reset-password-modal/confirm-reset-password-modal.component';
import { UploadCsvModalComponent } from './modal/upload-csv-modal/upload-csv-modal.component';
import { ChangePasswordModalComponent } from './modal/change-password-modal/change-password-modal.component';
import { dialogs } from './modal';
import { CampaignComponent } from './campaign/campaign.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    ReactiveFormsModule,
    ClipboardModule,
    StoreModule.forFeature('page', reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule
  ],
  declarations: [
    dialogs,
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    CreateAccountComponent,
    ConfirmResetPasswordModalComponent,
    UploadCsvModalComponent,
    ChangePasswordModalComponent,
    CampaignComponent
  ]
})
export class AdminLayoutModule {}
