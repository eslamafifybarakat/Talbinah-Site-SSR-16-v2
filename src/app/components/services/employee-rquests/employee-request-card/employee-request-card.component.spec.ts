import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestCardComponent } from './employee-request-card.component';

describe('EmployeeRequestCardComponent', () => {
  let component: EmployeeRequestCardComponent;
  let fixture: ComponentFixture<EmployeeRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeRequestCardComponent]
    });
    fixture = TestBed.createComponent(EmployeeRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
