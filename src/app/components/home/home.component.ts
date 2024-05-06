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

  /* --- Start Hero Section Variables --- */
  search: any = null;
  isLoadingSearch: boolean = false;
  private searchSubject = new Subject<any>();
  /* --- End Hero Section Variables --- */

  /* --- Start Filteration Section Variables --- */
  /* --- End Filteration Section Variables --- */

  translatedText: any = {};
  jobOpportunities: any = [
    { img: '../../../assets/images/home/persons/1.svg' },
    { img: '../../../assets/images/home/persons/2.svg' },
    { img: '../../../assets/images/home/persons/3.svg' },
    { img: '../../../assets/images/home/persons/4.svg' },
    { img: '../../../assets/images/home/persons/1.svg' },
    { img: '../../../assets/images/home/persons/2.svg' },
    { img: '../../../assets/images/home/persons/4.svg' },
    { img: '../../../assets/images/home/persons/3.svg' },
    { img: '../../../assets/images/home/persons/4.svg' },
    { img: '../../../assets/images/home/persons/4.svg' },
  ];
  services: any = [
    { img: '../../../assets/images/home/services/1.svg', title: 'رحلة الإستقدام بخطوات بسيطة', description: 'اختصرنا لك رحلة الإستقدام فى خطوات بسيطة كل ما عليك هو اختيار العمالة التى تراها مناسبة لك من حيث الجنسية أو المرتب واترك لنا باقى المهمة، كل ما عليك هو التسجيل على الموقع.' },
    { img: '../../../assets/images/home/services/2.svg', title: 'دعم مستمر طيلة أيام الإسبوع', description: 'لأن صوتك له أثر يمكنك رفع الشكاوى أو الملاحظات بشكل إلكتروني دون الحاجة لزيارة الفروع أو قنوات التواصل الخاصة بوزارة الموارد البشرية، وذلك لحماية حقوق أطراف العلاقة التعاقدية. كما يمكنك التواصل مع أحد ممثلى خدمة الدعم الصوتي طيلة أيام الإسبوع' },
    { img: '../../../assets/images/home/services/3.svg', title: 'أصدار التأشيرة البديلة', description: 'أصدر تأشيرة بديلة بدون رسوم حكومية في حال الخروج النهائي للعمالة خلال 90 يوم من تاريخ وصولهم للمملكة.' },
    { img: '../../../assets/images/home/services/4.svg', title: 'تأشيرة العمالة المنزلية', description: 'خدمه تتيح للأفراد إصدار تأشيرات العمالة المنزلية لاستقدام العمالة المطلوبة من خلال المهن والجنسيات المتاحة في منصة المصدر الدولي للإستقدام.' },
    { img: '../../../assets/images/home/services/5.svg', title: 'ضمان 3 أشهر!!', description: 'استلم العامل وأحصل على ضمان لمدة 3 شهور فى حالة وجود أى مشكلة أو تقصير من العامل' },
    { img: '../../../assets/images/home/services/6.svg', title: 'نقل خدمات العمالة المنزلية', description: 'أتمتة ومتابعة وتحسين نقل خدمات العمالة المنزلية عبر تطبيقات تقنية مبتكرة وخدمات إلكترونية تستهدف مكاتب الاستقدام والعملاء.' }
  ];
  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService
  ) {
    localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.loadData();
    this.searchSubject.pipe(debounceTime(500)).subscribe(event => {
      this.searchOfficesList(event);
    });
  }
  private loadData(): void {
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    let metaData: MetaDetails = {
      title: 'المكاتب',
      description: 'الوصف',
      image: 'https://avatars.githubusercontent.com/u/52158422?s=48&v=4'
    }
    this.metadataService.updateMetaTagsForSEO(metaData);
  }
  /* --- Start Hero Section Functions --- */

  /* --- End Hero Section Functions --- */

  /* --- Start Filteration Section Functions --- */
  handleOfficesListSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchOfficesList(event: any): void {
    this.search = event;
    // this.page = 1;
    this.isLoadingSearch = true;
    setTimeout(() => {
      this.isLoadingSearch = false;
    }, 1000);
  }
  clearOfficesListSearchValue(event: any): void {
    event.value = '';
    // this.page = 1;
    this.search = null;
    this.isLoadingSearch = true;
    setTimeout(() => {
      this.isLoadingSearch = false;
    }, 1000);
  }
  /* --- End Filteration Section Functions --- */

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
