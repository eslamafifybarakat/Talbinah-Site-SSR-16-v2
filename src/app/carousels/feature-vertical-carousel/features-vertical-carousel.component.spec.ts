import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesVerticalCarouselComponent } from './features-vertical-carousel.component';

describe('FeaturesVerticalCarouselComponent', () => {
  let component: FeaturesVerticalCarouselComponent;
  let fixture: ComponentFixture<FeaturesVerticalCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesVerticalCarouselComponent]
    });
    fixture = TestBed.createComponent(FeaturesVerticalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
