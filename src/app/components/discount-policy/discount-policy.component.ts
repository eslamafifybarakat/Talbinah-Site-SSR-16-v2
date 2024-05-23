import { LocalizationLanguageService } from 'src/app/services/generic/localization-language.service';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';
import { MetaDetails, MetadataService } from 'src/app/services/generic/metadata.service';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { AlertsService } from 'src/app/services/generic/alerts.service';
import { PublicService } from 'src/app/services/generic/public.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discount-policy',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    SkeletonComponent
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

  /* --- Start Get Discount Policy Functions --- */
  getDiscountPloicy(): void {
    this.isLoadingDiscountPloicy = true;
    let homeDataSubscription: Subscription = this.publicService?.getDiscountPloicy()
      .pipe(
        tap((res: any) => this.processDiscountPolicyResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeDiscountPolicy())
      ).subscribe();
    this.subscriptions.push(homeDataSubscription);
  }
  private processDiscountPolicyResponse(response: any): void {
    if (response?.status == true) {
      this.discountPloicyData = response.data;
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeDiscountPolicy(): void {
    this.isLoadingDiscountPloicy = false;
  }
  /* --- End Get Discount Policy Functions --- */

  /* --- Handle api requests messages --- */
  private handleSuccess(msg: string | null): any {
    this.setMessage(msg || 'تم تنفيذ طلبك بنجاح', 'succss');
  }
  private handleError(err: string | null): any {
    this.setMessage(err || 'حدث خطأ', 'error');
  }
  private setMessage(message: string, type?: string | null): void {
    this.alertsService.openToast(type, type, message);
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach((subscription: Subscription) => {
    //   if (subscription && !subscription.closed) {
    //     subscription.unsubscribe();
    //   }
    // });
  }
}
