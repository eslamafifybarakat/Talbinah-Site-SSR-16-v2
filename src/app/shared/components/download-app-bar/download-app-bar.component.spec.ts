import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppBarComponent } from './download-app-bar.component';

describe('DownloadAppBarComponent', () => {
  let component: DownloadAppBarComponent;
  let fixture: ComponentFixture<DownloadAppBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadAppBarComponent]
    });
    fixture = TestBed.createComponent(DownloadAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
