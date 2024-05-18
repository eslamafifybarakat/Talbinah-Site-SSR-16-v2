import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountPolicyComponent } from './discount-policy.component';

describe('DiscountPolicyComponent', () => {
  let component: DiscountPolicyComponent;
  let fixture: ComponentFixture<DiscountPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DiscountPolicyComponent]
    });
    fixture = TestBed.createComponent(DiscountPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
