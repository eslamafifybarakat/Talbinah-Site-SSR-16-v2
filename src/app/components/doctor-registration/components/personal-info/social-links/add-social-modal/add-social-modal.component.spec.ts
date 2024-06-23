import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialModalComponent } from './add-social-modal.component';

describe('AddSocialModalComponent', () => {
  let component: AddSocialModalComponent;
  let fixture: ComponentFixture<AddSocialModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSocialModalComponent]
    });
    fixture = TestBed.createComponent(AddSocialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
