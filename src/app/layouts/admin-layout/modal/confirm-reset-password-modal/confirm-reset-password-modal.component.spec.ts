import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmResetPasswordModalComponent } from './confirm-reset-password-modal.component';

describe('ConfirmResetPasswordModalComponent', () => {
  let component: ConfirmResetPasswordModalComponent;
  let fixture: ComponentFixture<ConfirmResetPasswordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmResetPasswordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
