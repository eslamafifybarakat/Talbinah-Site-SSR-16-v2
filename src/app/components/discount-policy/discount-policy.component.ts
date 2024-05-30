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
    this.metadataService.updateCanonicalLink('https://talbinah.net/DiscountPolicy');
    this.metadataService.updateLinkRelAlternate('ar', 'https://talbinah.net/DiscountPolicy');
    this.metadataService.updateTitle('سياسة الخصم | Talbinah | إجابات لاستفساراتك حول سياسة الخصم');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'سياسة الخصم | Talbinah | إجابات لاستفساراتك حول سياسة الخصم' },
      { name: 'description', content: 'تصفح صفحة سياسة الخصم في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { name: 'keywords', content: 'DiscountPolicy, أسئلة متكررة, الصحة النفسية,سياسة الخصم , استفسارات, Talbinah' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:title', content: 'سياسة الخصم | Talbinah | إجابات لاستفساراتك حول سياسة الخصم' },
      { name: 'twitter:description', content: 'تصفح صفحة سياسة الخصم في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { name: 'twitter:url', content: 'https://talbinah.net/DiscountPolicy' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'سياسة الخصم | Talbinah | إجابات لاستفساراتك حول سياسة الخصم' },
      { property: 'og:description', content: 'تصفح صفحة سياسة الخصم في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { property: 'og:url', content: 'https://talbinah.net/DiscountPolicy' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
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
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
