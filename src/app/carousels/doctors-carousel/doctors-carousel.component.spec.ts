import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCarouselComponent } from './doctors-carousel.component';

describe('DoctorsCarouselComponent', () => {
  let component: DoctorsCarouselComponent;
  let fixture: ComponentFixture<DoctorsCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsCarouselComponent]
    });
    fixture = TestBed.createComponent(DoctorsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
