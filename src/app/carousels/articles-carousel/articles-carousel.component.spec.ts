import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCarouselComponent } from './articles-carousel.component';

describe('ArticlesCarouselComponent', () => {
  let component: ArticlesCarouselComponent;
  let fixture: ComponentFixture<ArticlesCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesCarouselComponent]
    });
    fixture = TestBed.createComponent(ArticlesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
