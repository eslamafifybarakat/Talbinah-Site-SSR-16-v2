import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderComponent } from './complete-order.component';

describe('CompleteOrderComponent', () => {
  let component: CompleteOrderComponent;
  let fixture: ComponentFixture<CompleteOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompleteOrderComponent]
    });
    fixture = TestBed.createComponent(CompleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
