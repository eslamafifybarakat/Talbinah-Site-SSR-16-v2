import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSponsorCarouselComponent } from './home-sponsor-carousel.component';

describe('HomeSponsorCarouselComponent', () => {
  let component: HomeSponsorCarouselComponent;
  let fixture: ComponentFixture<HomeSponsorCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSponsorCarouselComponent]
    });
    fixture = TestBed.createComponent(HomeSponsorCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
