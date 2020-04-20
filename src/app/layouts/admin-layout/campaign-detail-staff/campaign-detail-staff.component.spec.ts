import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailStaffComponent } from './campaign-detail-staff.component';

describe('CampaignDetailStaffComponent', () => {
  let component: CampaignDetailStaffComponent;
  let fixture: ComponentFixture<CampaignDetailStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDetailStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
