import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationAndExpertiseComponent } from './certification-and-expertise.component';

describe('CertificationAndExpertiseComponent', () => {
  let component: CertificationAndExpertiseComponent;
  let fixture: ComponentFixture<CertificationAndExpertiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationAndExpertiseComponent]
    });
    fixture = TestBed.createComponent(CertificationAndExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
