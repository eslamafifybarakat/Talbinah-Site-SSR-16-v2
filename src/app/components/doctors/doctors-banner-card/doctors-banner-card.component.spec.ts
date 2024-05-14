import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsBannerCardComponent } from './doctors-banner-card.component';

describe('DoctorsBannerCardComponent', () => {
  let component: DoctorsBannerCardComponent;
  let fixture: ComponentFixture<DoctorsBannerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsBannerCardComponent]
    });
    fixture = TestBed.createComponent(DoctorsBannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
