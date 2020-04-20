import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCampaignModalComponent } from './update-campaign-modal.component';

describe('UpdateCampaignModalComponent', () => {
  let component: UpdateCampaignModalComponent;
  let fixture: ComponentFixture<UpdateCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
