// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from '../../services/generic/metadata.service';
import { AlertsService } from './../../services/generic/alerts.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HomeService } from './../../services/home.service';
import { Subscription } from 'rxjs';

// Components
import { HomeSponsorCarouselComponent } from './../../carousels/home-sponsor-carousel/home-sponsor-carousel.component';
import { DynamicSvgComponent } from './../../shared/components/icons/dynamic-svg/dynamic-svg.component';
import { SkeletonComponent } from './../../shared/components/skeleton/skeleton.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    RouterModule,
    CommonModule,

    // Components
    HomeSponsorCarouselComponent,
    DynamicSvgComponent,
    SkeletonComponent
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private subscriptions: Subscription[] = [];

  translatedText: any = {};
  isLoadingHomeData: boolean = false;
  homeData: any;

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    private homeService: HomeService
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.loadData();
    this.getHomeData();
  }
  private loadData(): void {
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'الرئيسية',
      description: 'الرئيسية'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }
  /* --- Start Hero Section Functions --- */
  getHomeData(): void {
    this.isLoadingHomeData = true;
    let homeDataSubscription: Subscription = this.homeService?.getHomeData()
      .pipe(
        tap((res: any) => this.processHomeDataResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeUserHomeLoading())
      ).subscribe();
    this.subscriptions.push(homeDataSubscription);
  }
  private processHomeDataResponse(response: any): void {
    if (response?.status == true) {
      this.homeData = response?.data;
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeUserHomeLoading(): void {
    this.isLoadingHomeData = false;
  }
  /* --- End Hero Section Functions --- */

  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a sweetalert
    console.log(message);
    // this.alertsService?.openSweetAlert('error', message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
