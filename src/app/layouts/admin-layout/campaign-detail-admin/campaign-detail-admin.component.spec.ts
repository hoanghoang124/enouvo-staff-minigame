import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailAdminComponent } from './campaign-detail-admin.component';

describe('CampaignDetailAdminComponent', () => {
  let component: CampaignDetailAdminComponent;
  let fixture: ComponentFixture<CampaignDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
