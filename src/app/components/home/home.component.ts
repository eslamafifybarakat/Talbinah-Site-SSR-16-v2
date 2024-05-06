import { HomeSponsorCarouselComponent } from './../../carousels/home-sponsor-carousel/home-sponsor-carousel.component';
// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from '../../services/generic/metadata.service';
import { catchError, debounceTime, finalize, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

// Components
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    RouterModule,
    CommonModule,
    HomeSponsorCarouselComponent

    // Components
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private subscriptions: Subscription[] = [];

  translatedText: any = {};

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.loadData();
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
