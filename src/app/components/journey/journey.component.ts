// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from './../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { environment } from './../../../environments/environment';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Components
import { ContactUsSectionComponent } from './../../shared/components/contact-us-section/contact-us-section.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    CommonModule,

    // Components
    ContactUsSectionComponent
  ],
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent {
  private subscriptions: Subscription[] = [];
  private imageBaseUrl: string = '';
  private metaDetails: MetaDetails | undefined;
  private fullPageUrl: string = '';

  /* --- Start Journey Variables --- */
  journeyDetails: any | undefined;
  isLoadingJourneyDetails: boolean = false;
  /* --- End Journey Variables --- */

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    public publicService: PublicService
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.initPageData();
  }
  private initPageData(): void {
    this.updateMetaTagsForSEO();
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getJourneyData();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'رحلة',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

  /* --- Start Employee Details Functions --- */
  getJourneyData(preventLoading?: boolean): void {
    // if (!preventLoading) {
    //   this.isLoadingJourneyDetails = true;
    // }
    // let journeyDataSubscription: Subscription = this.policiesService.getJourneyData().pipe(
    //   tap((res: any) => {
    //     if (res?.code === 200) {
    //       this.journeyDetails = res.data;
    //       this.handleJourneyDetails();
    //     } else {
    //       this.handleError(res?.message);
    //     }
    //   }),
    //   catchError(err => {
    //     this.handleError(err);
    //     return []; // Return an empty array or appropriate fallback value
    //   }),
    //   finalize(() => {
    //     this.isLoadingJourneyDetails = false;
    //     this.updateMetaTagsForSEO(); // Remove After Function Working Successfully
    //   })
    // ).subscribe();

    // this.subscriptions.push(journeyDataSubscription);
  }
  private handleJourneyDetails(): void {
    this.updateMetaTagsForSEO();
  }
  /* --- Start Employee Details Functions --- */

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
