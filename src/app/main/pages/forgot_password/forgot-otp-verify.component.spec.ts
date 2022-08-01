import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotOtpVerifyComponent } from './forgot-otp-verify.component';

describe('ForgotOtpVerifyComponent', () => {
  let component: ForgotOtpVerifyComponent;
  let fixture: ComponentFixture<ForgotOtpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotOtpVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
