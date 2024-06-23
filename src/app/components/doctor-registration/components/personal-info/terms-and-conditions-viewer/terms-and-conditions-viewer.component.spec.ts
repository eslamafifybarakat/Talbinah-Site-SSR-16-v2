import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsViewerComponent } from './terms-and-conditions-viewer.component';

describe('TermsAndConditionsViewerComponent', () => {
  let component: TermsAndConditionsViewerComponent;
  let fixture: ComponentFixture<TermsAndConditionsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndConditionsViewerComponent]
    });
    fixture = TestBed.createComponent(TermsAndConditionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
