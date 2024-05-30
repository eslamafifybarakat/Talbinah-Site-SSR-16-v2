// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from '../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { AlertsService } from './../../services/generic/alerts.service';
import { Feature, homeApiResponse } from './../../interfaces/home';
import { HomeService } from './../../services/home.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

// Components
import { FeaturesVerticalCarouselComponent } from './../../carousels/feature-vertical-carousel/features-vertical-carousel.component';
import { HomeSponsorCarouselComponent } from './../../carousels/home-sponsor-carousel/home-sponsor-carousel.component';
import { ArticlesCarouselComponent } from './../../carousels/articles-carousel/articles-carousel.component';
import { ReviewsCarouselComponent } from './../../carousels/reviews-carousel/reviews-carousel.component';
import { DoctorsCarouselComponent } from './../../carousels/doctors-carousel/doctors-carousel.component';
import { DynamicSvgComponent } from './../../shared/components/icons/dynamic-svg/dynamic-svg.component';
import { SkeletonComponent } from './../../shared/components/skeleton/skeleton.component';
import { FooterComponent } from './../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    RouterModule,
    CommonModule,

    // Components
    FeaturesVerticalCarouselComponent,
    HomeSponsorCarouselComponent,
    ArticlesCarouselComponent,
    ReviewsCarouselComponent,
    DoctorsCarouselComponent,
    DynamicSvgComponent,
    SkeletonComponent,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  private subscriptions: Subscription[] = [];
  currentLanguage: string = '';

  translatedText: any = {};
  isLoadingHomeData: boolean = false;
  homeData: any;
  features: Feature[] = [];

  constructor(
    private localizationLanguageService: LocalizationLanguageService,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService
  ) {
    // localizationLanguageService.updatePathAccordingLang();
  }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
    this.loadData();
    this.getHomeData();
    this.features = [
      {
        id: 1,
        image: 'assets/images/home/dummy/features/feature1.svg',
        title: 'الجلسات',
        description: 'استمتع بسهولة حجز جلساتك الطبية وفقاً لرغبتك في اختيار الزمان والمكان، مما يجعل تجربتك مريحة وملائمة. نقدم لك تنوعًا كبيرًا في المواعيد والخيارات الطبية لضمان الحصول على الرعاية الصحية المثلى التي تتناسب مع جدول أعمالك اليومي وتفضيلاتك الشخصية، مما يسهل عليك الحفاظ على صحتك دون المساومة على مشاغلك الأخرى.',
        link: 'string',
      },
      {
        id: 1,
        image: 'assets/images/home/dummy/features/feature1.svg',
        title: 'البرامج الطبية',
        description: 'تقدم لك باقاتنا الطبية مجموعة واسعة من الخدمات الصحية التي تناسب كافة احتياجاتك وبتكاليف مخفضة. استغل الفرصة للاستفادة من خدماتنا المتكاملة التي تشمل الفحوصات الطبية، الاستشارات والعلاجات المتقدمة وكل ذلك دون الحاجة لمغادرة منزلك. باقاتنا مصممة لتوفر لك الراحة والأمان وتضمن لك ولعائلتك العناية الصحية المثالية.',
        link: 'string',
      },
      {
        id: 1,
        image: 'assets/images/home/dummy/features/feature1.svg',
        title: 'الجلسات العاجله',
        description: 'لا تدع الانتظار يعرقل حصولك على الرعاية الطبية اللازمة! خدمتنا للجلسات العاجلة مصممة لتلبية احتياجاتك الفورية، حيث يمكنك الحصول على استشارات طبية في الحال عندما تحتاجها أكثر. معنا، يمكنك ضمان تلقي العلاج والدعم الطبي على الفور في أي وقت ومن أي مكان، مما يوفر الراحة والأمان في حالات الطوارئ.',
        link: 'string',
      },
      {
        id: 1,
        image: 'assets/images/home/dummy/features/feature1.svg',
        title: 'الهدايا',
        description: 'ما أروع أن تظهر مدى حبك واهتمامك بأحبائك من خلال إهدائهم جلسة طبية تعبر عن العناية الفائقة بصحتهم. تقديم جلسة طبية كهدية هو أكثر من مجرد لفتة لطيفة؛ إنها وسيلة لمشاركة الاهتمام بالصحة والعافية. فاجئ أصدقائك وعائلتك بجلسات تحمل الرعاية والاهتمام، ليشعروا بالحب والتقدير والعناية في كل مرة يستخدمون فيها هذه الهدية القيمة.',
        link: 'string',
      }
    ]
  }
  private loadData(): void {
    this.updateMetaTagsForSEO();
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateCanonicalLink('https://talbinah.net/Home');
    this.metadataService.updateLinkRelAlternate('ar', 'https://talbinah.net/Home');
    this.metadataService.updateTitle('Talbinah | التطبيق الأمثل للصحة النفسية في السعودية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'Talbinah | التطبيق الأمثل للصحة النفسية في السعودية' },
      { name: 'description', content: 'اكتشف Talbinah، التطبيق الأمثل للصحة النفسية في السعودية. استشارات نفسية وأسرية من أخصائيين معتمدين، حجز فوري وسرية تامة.' },
      { name: 'keywords', content: 'Talbinah, الصحة النفسية, استشارات نفسية, استشارات أسرية, حجز مواعيد مع الطبيب, السعودية' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:title', content: 'Talbinah | التطبيق الأمثل للصحة النفسية في السعودية' },
      { name: 'twitter:description', content: 'اكتشف Talbinah، التطبيق الأمثل للصحة النفسية في السعودية. استشارات نفسية وأسرية من أخصائيين معتمدين، حجز فوري وسرية تامة.' },
      { name: 'twitter:url', content: 'https://talbinah.net/Home' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'Talbinah | التطبيق الأمثل للصحة النفسية في السعودية' },
      { property: 'og:description', content: 'اكتشف Talbinah، التطبيق الأمثل للصحة النفسية في السعودية. استشارات نفسية وأسرية من أخصائيين معتمدين، حجز فوري وسرية تامة.' },
      { property: 'og:url', content:'https://talbinah.net/Home' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
  }

  /* --- Start Hero Section Functions --- */
  getHomeData(): void {
    this.isLoadingHomeData = true;
    let homeDataSubscription: Subscription = this.homeService?.getHomeData()
      .pipe(
        tap((res: homeApiResponse) => this.processHomeDataResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeUserHomeLoading())
      ).subscribe();
    this.subscriptions.push(homeDataSubscription);
  }
  private processHomeDataResponse(response: any): void {
    if (response?.status == true) {
      response?.data?.specialists?.forEach((element: any) => {
        switch (element.id) {
          case 1:
            element['backgroundColor'] = '#8fdaf73b';
            element['color'] = '#0091D3';
            break;
          case 2:
            element['backgroundColor'] = '#A86BFC3b';
            element['color'] = '#A86BFC';
            break;
          case 3:
            element['backgroundColor'] = '#A86BFC3b';
            element['color'] = '#A86BFC';
            break;
          case 4:
            element['backgroundColor'] = '#FFC07E3b';
            element['color'] = '#FFC07E';
            break;
          default:
          // Handle default case if needed
        }
      });
      response.data['services'] = this.features;
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

  /* --- Handle api requests messages --- */
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a sweetalert
    this.alertsService?.openToast('error', 'error', message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
