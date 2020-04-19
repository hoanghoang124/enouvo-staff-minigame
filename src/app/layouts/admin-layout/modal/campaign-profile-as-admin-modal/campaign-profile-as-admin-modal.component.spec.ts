import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignProfileAsAdminModalComponent } from './campaign-profile-as-admin-modal.component';

describe('CampaignProfileAsAdminModalComponent', () => {
  let component: CampaignProfileAsAdminModalComponent;
  let fixture: ComponentFixture<CampaignProfileAsAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignProfileAsAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignProfileAsAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
