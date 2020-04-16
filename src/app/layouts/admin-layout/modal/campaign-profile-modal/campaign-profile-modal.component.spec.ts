import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignProfileModalComponent } from './campaign-profile-modal.component';

describe('CampaignProfileModalComponent', () => {
  let component: CampaignProfileModalComponent;
  let fixture: ComponentFixture<CampaignProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
