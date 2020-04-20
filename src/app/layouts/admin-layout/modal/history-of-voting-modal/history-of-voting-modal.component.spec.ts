import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfVotingModalComponent } from './history-of-voting-modal.component';

describe('HistoryOfVotingModalComponent', () => {
  let component: HistoryOfVotingModalComponent;
  let fixture: ComponentFixture<HistoryOfVotingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfVotingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfVotingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
