import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDoctorAppointmentsComponent } from './available-doctor-appointments.component';

describe('AvailableDoctorAppointmentsComponent', () => {
  let component: AvailableDoctorAppointmentsComponent;
  let fixture: ComponentFixture<AvailableDoctorAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableDoctorAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AvailableDoctorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
