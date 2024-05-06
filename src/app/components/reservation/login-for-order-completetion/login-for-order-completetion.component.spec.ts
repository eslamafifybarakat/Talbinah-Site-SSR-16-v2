import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForOrderCompletetionComponent } from './login-for-order-completetion.component';

describe('LoginForOrderCompletetionComponent', () => {
  let component: LoginForOrderCompletetionComponent;
  let fixture: ComponentFixture<LoginForOrderCompletetionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginForOrderCompletetionComponent]
    });
    fixture = TestBed.createComponent(LoginForOrderCompletetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
