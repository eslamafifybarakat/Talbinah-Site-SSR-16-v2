import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { MetaDetails, MetadataService } from 'src/app/services/generic/metadata.service';
import { AlertsService } from 'src/app/services/generic/alerts.service';
import { LocalizationLanguageService } from 'src/app/services/generic/localization-language.service';
import { PublicService } from 'src/app/services/generic/public.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discount-policy',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent
  ],
  templateUrl: './discount-policy.component.html',
  styleUrls: ['./discount-policy.component.scss']
})
export class DiscountPolicyComponent {
  private subscriptions: Subscription[] = [];
  isLoadingDiscountPloicy: boolean = false;
  discountPloicyData: any;

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    private publicService: PublicService
  ) {
    // localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.loadData();
    this.getDiscountPloicy();
  }
  private loadData(): void {
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'سياسة الخصم | تلبينة',
      description: 'سياسة الخصم | تلبينة'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

  /* --- Start Hero Section Functions --- */
  getDiscountPloicy(): void {
    this.isLoadingDiscountPloicy = true;
    let homeDataSubscription: Subscription = this.publicService?.getDiscountPloicy()
      .pipe(
        tap((res: any) => this.processHomeDataResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeUserHomeLoading())
      ).subscribe();
    this.subscriptions.push(homeDataSubscription);
  }
  private processHomeDataResponse(response: any): void {
    if (response?.status == true) {
      this.discountPloicyData = response.data;
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeUserHomeLoading(): void {
    this.isLoadingDiscountPloicy = false;
  }
  /* --- End Hero Section Functions --- */

  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a sweetalert
    this.alertsService?.openToast('error', 'error', message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
