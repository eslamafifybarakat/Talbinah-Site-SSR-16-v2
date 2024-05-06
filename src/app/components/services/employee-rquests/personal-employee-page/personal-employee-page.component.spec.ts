import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEmployeePageComponent } from './personal-employee-page.component';

describe('PersonalEmployeePageComponent', () => {
  let component: PersonalEmployeePageComponent;
  let fixture: ComponentFixture<PersonalEmployeePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalEmployeePageComponent]
    });
    fixture = TestBed.createComponent(PersonalEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
