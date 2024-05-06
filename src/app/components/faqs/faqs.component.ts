// Modules
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

//Services
import { LocalizationLanguageService } from '../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from './../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { environment } from './../../../environments/environment';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patterns } from './../../shared/configs/patterns';
import { Subscription } from 'rxjs';

// Components
import { ContactUsSectionComponent } from './../../shared/components/contact-us-section/contact-us-section.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
  // Modules
    TranslateModule,
    CommonModule,

    //Components
    ContactUsSectionComponent
  ],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQsComponent {
  private subscriptions: Subscription[] = [];
  private imageBaseUrl: string = '';
  private metaDetails: MetaDetails | undefined;
  private fullPageUrl: string = '';

  /* --- Start Policies Variables --- */
  FAQsDetails: any | undefined;
  isLoadingFAQsDetails: boolean = false;
  /* --- End Policies Variables --- */

  constructor(
    private localizationLanguageService:LocalizationLanguageService,
    private metadataService: MetadataService
  ) { 
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.initPageData();
  }
  private initPageData(): void {
    this.updateMetaTagsForSEO();
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getFAQsData();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'الأسئلة و الإستفسارات',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

  /* --- Start Employee Details Functions --- */
  getFAQsData(preventLoading?: boolean): void {
    // if (!preventLoading) {
    //   this.isLoadingFAQsDetails = true;
    // }
    // let FAQsDataSubscription: Subscription = this.policiesService.getFAQsData().pipe(
    //   tap((res: any) => {
    //     if (res?.code === 200) {
    //       this.FAQsDetails = res.data;
    //       this.handleFAQsDetails();
    //     } else {
    //       this.handleError(res?.message);
    //     }
    //   }),
    //   catchError(err => {
    //     this.handleError(err);
    //     return []; // Return an empty array or appropriate fallback value
    //   }),
    //   finalize(() => {
    //     this.isLoadingFAQsDetails = false;
    //     this.updateMetaTagsForSEO(); // Remove After Function Working Successfully
    //   })
    // ).subscribe();

    // this.subscriptions.push(FAQsDataSubscription);
  }
  private handleFAQsDetails(): void {
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
