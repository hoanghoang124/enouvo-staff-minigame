import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignProfileAsStaffModalComponent } from './campaign-profile-as-staff-modal.component';

describe('CampaignProfileAsStaffModalComponent', () => {
  let component: CampaignProfileAsStaffModalComponent;
  let fixture: ComponentFixture<CampaignProfileAsStaffModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignProfileAsStaffModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignProfileAsStaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
