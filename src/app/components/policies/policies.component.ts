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
  selector: 'app-policies',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    CommonModule,

    ContactUsSectionComponent
  ],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {
  private subscriptions: Subscription[] = [];
  private imageBaseUrl: string = '';
  private metaDetails: MetaDetails | undefined;
  private fullPageUrl: string = '';

  /* --- Start Policies Variables --- */
  policiesDetails: any | undefined;
  isLoadingPoliciesDetails: boolean = false;
  /* --- End Policies Variables --- */

  services: any = [
    { img: 'assets/images/home/services/1.svg', title: 'رحلة الإستقدام بخطوات بسيطة', description: 'اختصرنا لك رحلة الإستقدام فى خطوات بسيطة كل ما عليك هو اختيار العمالة التى تراها مناسبة لك من حيث الجنسية أو المرتب واترك لنا باقى المهمة، كل ما عليك هو التسجيل على الموقع.' },
    { img: 'assets/images/home/services/2.svg', title: 'دعم مستمر طيلة أيام الإسبوع', description: 'لأن صوتك له أثر يمكنك رفع الشكاوى أو الملاحظات بشكل إلكتروني دون الحاجة لزيارة الفروع أو قنوات التواصل الخاصة بوزارة الموارد البشرية، وذلك لحماية حقوق أطراف العلاقة التعاقدية. كما يمكنك التواصل مع أحد ممثلى خدمة الدعم الصوتي طيلة أيام الإسبوع' },
    { img: 'assets/images/home/services/3.svg', title: 'أصدار التأشيرة البديلة', description: 'أصدر تأشيرة بديلة بدون رسوم حكومية في حال الخروج النهائي للعمالة خلال 90 يوم من تاريخ وصولهم للمملكة.' },
    { img: 'assets/images/home/services/4.svg', title: 'تأشيرة العمالة المنزلية', description: 'خدمه تتيح للأفراد إصدار تأشيرات العمالة المنزلية لاستقدام العمالة المطلوبة من خلال المهن والجنسيات المتاحة في منصة المصدر الدولي للإستقدام.' },
    { img: 'assets/images/home/services/5.svg', title: 'ضمان 3 أشهر!!', description: 'استلم العامل وأحصل على ضمان لمدة 3 شهور فى حالة وجود أى مشكلة أو تقصير من العامل' },
    { img: 'assets/images/home/services/6.svg', title: 'نقل خدمات العمالة المنزلية', description: 'أتمتة ومتابعة وتحسين نقل خدمات العمالة المنزلية عبر تطبيقات تقنية مبتكرة وخدمات إلكترونية تستهدف مكاتب الاستقدام والعملاء.' }
  ];

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
    this.getPoliciesData();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'السياسات',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }

  /* --- Start Employee Details Functions --- */
  getPoliciesData(preventLoading?: boolean): void {
    // if (!preventLoading) {
    //   this.isLoadingPoliciesDetails = true;
    // }
    // let policiesDataSubscription: Subscription = this.policiesService.getPoliciesData().pipe(
    //   tap((res: any) => {
    //     if (res?.code === 200) {
    //       this.policiesDetails = res.data;
    //       this.handlePoliciesDetails();
    //     } else {
    //       this.handleError(res?.message);
    //     }
    //   }),
    //   catchError(err => {
    //     this.handleError(err);
    //     return []; // Return an empty array or appropriate fallback value
    //   }),
    //   finalize(() => {
    //     this.isLoadingPoliciesDetails = false;
    //     this.updateMetaTagsForSEO(); // Remove After Function Working Successfully
    //   })
    // ).subscribe();

    // this.subscriptions.push(policiesDataSubscription);
  }
  private handlePoliciesDetails(): void {
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
