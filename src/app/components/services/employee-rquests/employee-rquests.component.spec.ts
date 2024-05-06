import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRquestsComponent } from './employee-rquests.component';

describe('EmployeeRquestsComponent', () => {
  let component: EmployeeRquestsComponent;
  let fixture: ComponentFixture<EmployeeRquestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeRquestsComponent]
    });
    fixture = TestBed.createComponent(EmployeeRquestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
