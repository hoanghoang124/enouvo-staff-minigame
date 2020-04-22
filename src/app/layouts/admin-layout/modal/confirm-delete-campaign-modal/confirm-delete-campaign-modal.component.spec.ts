import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCampaignModalComponent } from './confirm-delete-campaign-modal.component';

describe('ConfirmDeleteCampaignModalComponent', () => {
  let component: ConfirmDeleteCampaignModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
