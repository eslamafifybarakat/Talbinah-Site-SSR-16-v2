import { DynamicSvgComponent } from './../../../shared/components/icons/dynamic-svg/dynamic-svg.component';
// Module
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { RatingModule } from 'primeng/rating';

// Components
import { BannerCarouselComponent } from './../../../carousels/banner-carousel/banner-carousel.component';
import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';

// Services
import { Subject, Subscription, catchError, debounceTime, finalize, tap } from 'rxjs';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MetadataService } from './../../../services/generic/metadata.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorsService } from './../../../services/doctors.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { DialogService } from 'primeng/dynamicdialog';
import { doctorsListSliderData } from 'src/app/interfaces/home';
@Component({
  standalone: true,
  imports: [
    // Module
    ReactiveFormsModule,
    RadioButtonModule,
    TranslateModule,
    PaginatorModule,
    DropdownModule,
    CheckboxModule,
    SidebarModule,
    RouterModule,
    CommonModule,
    RatingModule,
    FormsModule,

    // Components
    BannerCarouselComponent,
    DynamicSvgComponent,
    DoctorCardComponent,
    SkeletonComponent,
    FooterComponent
  ],
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent {
  private subscriptions: Subscription[] = [];
  private searchSubject = new Subject<any>();
  currentLanguage: any;

  doctorsList: any = [];
  totalDoctors: number = 0;
  isLoadingDoctors: boolean = false;
  isSearch: boolean = false;
  search: any;

  page: number = 1;
  perPage: number = 12;
  startPrice: any;
  endPrice: any;
  gender: any;
  specialistId: any;
  topRated: any;

  doctorsListSliderData: doctorsListSliderData[] = [];
  specialitiesList: any = [];

  filterForm = this.fb?.group({
    category: [null],
    rate: [null],
    // time: [""],
    // date: [""],
    gender: [null],
    startPrice: [0],
    endPrice: [500],
  });
  get formControls(): any {
    return this.filterForm?.controls;
  }
  displayFilter: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private doctorsService: DoctorsService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorsListSliderData = [
      {
        id: 1,
        image: 'assets/images/home/apps.svg',
        title: 'وفر الوقت والجهد',
        description: 'احصل على جلستك عبر الإنترنت. لا قوائم انتظار، لا متاعب نقل.'
      },
      {
        id: 2, // Note: corrected ID to ensure uniqueness
        image: 'assets/images/home/apps.svg',
        title: 'فريق استجابة',
        description: 'فريق الدعم لدينا متاح لمساعدتك في اتخاذ خطوتك الأولى والإجابة على الاستفسارات غير السريرية.'
      },
      {
        id: 3, // Note: corrected ID to ensure uniqueness
        image: 'assets/images/home/apps.svg',
        title: 'تنوع الخيارات',
        description: 'عدد كبير من المعالجين في تخصصات متنوعة جاهزون لمساعدتك في مواجهة ما تعاني منه.'
      }
    ];

    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      this.updateMetaTagsForSEO();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTagsForSEO();
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['category_id']) {
        this.specialistId = params['category_id'];
      }
      this.getDoctorsList();
    });
    this.searchSubject.pipe(debounceTime(500)).subscribe(event => {
      this.searchService(event);
    });
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateCanonicalLink('http://talbinah.net/Doctors/List');
    this.metadataService.updateLinkRelAlternate('ar', 'http://talbinah.net/Doctors/List');
    this.metadataService.updateTitle('قابل أطباءنا | Talbinah | الأطباء والمعالجون المتخصصون في السعودية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'قابل أطباءنا | Talbinah | الأطباء والمعالجون المتخصصون في السعودية' },
      { name: 'description', content: 'تعرف على فريق الأطباء والمعالجين المتخصصين في Talbinah، السعودية. احجز موعدك الآن للحصول على استشارات نفسية وأسرية من خبراء معتمدين.' },
      { name: 'keywords', content: 'أطباء نفسيون, معالجون أسريون, الصحة النفسية, استشارات, Talbinah, السعودية' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'قابل أطباءنا | Talbinah | الأطباء والمعالجون المتخصصون في السعودية' },
      { name: 'twitter:description', content: 'تعرف على فريق الأطباء والمعالجين المتخصصين في Talbinah، السعودية. احجز موعدك الآن للحصول على استشارات نفسية وأسرية من خبراء معتمدين.' },
      { name: 'twitter:url', content: 'https://talbinah.net/Home' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
      // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'قابل أطباءنا | Talbinah | الأطباء والمعالجون المتخصصون في السعودية' },
      { property: 'og:description', content: 'تعرف على فريق الأطباء والمعالجين المتخصصين في Talbinah، السعودية. احجز موعدك الآن للحصول على استشارات نفسية وأسرية من خبراء معتمدين.' },
      { property: 'og:url', content: 'https://talbinah.net/' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
  }

  /* Start Get Doctors List Functions */
  getDoctorsList(): void {
    this.isLoadingDoctors = true;
    let doctorsSubscription: Subscription = this.doctorsService?.getAll(this.page, this.perPage, this.search, this.startPrice, this.endPrice, this.gender, this.specialistId, this.topRated)
      .pipe(
        tap((res: any) => this.processDoctorsListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeDoctorsLoading())
      ).subscribe();
    this.subscriptions.push(doctorsSubscription);
  }
  private processDoctorsListResponse(response: any): void {
    if (response?.status == true) {
      this.doctorsList = response?.data?.doctors;
      if (this.search != null || this.search != '' || this.startPrice != null || this.endPrice != null || this.gender != null || this.specialistId != null || this.topRated != null) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
      this.totalDoctors = response?.data?.doctors_count;
      this.specialitiesList = response?.data?.specialists;
      this.specialitiesList?.forEach((element: any) => {
        if (element?.id == this.specialistId) {
          this.filterForm.patchValue({
            category: element
          });
        }
      });
      this.cdr.markForCheck();
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeDoctorsLoading(): void {
    this.isLoadingDoctors = false;
  }
  /* End Get Doctors List Functions */

  // Start Pagination
  onPageChange(event: any): void {
    this.page = event?.page + 1;
    this.getDoctorsList();
  }
  // End Pagination

  // Start Search
  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchService(event: any): void {
    this.search = event;
    this.page = 1;
    this.isLoadingDoctors = true;
    this.getDoctorsList();
  }
  clearSearchValue(event: any): void {
    event.value = '';
    this.page = 1;
    this.search = null;
    this.isLoadingDoctors = true;
    this.getDoctorsList();
  }
  // End Search

  filterNow(): void {
    this.page = 1;
    this.filterForm.value?.category ? this.specialistId = this.filterForm.value?.category?.id : '';
    this.startPrice = this.filterForm.value?.startPrice;
    this.endPrice = this.filterForm.value?.endPrice;
    this.gender = this.filterForm.value?.gender == 'male' ? 0 : this.filterForm.value?.gender == 'female' ? 1 : null;
    this.topRated = this.filterForm.value?.rate == 'yes' ? 1 : null;
    this.getDoctorsList();
  }
  reset(): void {
    this.page = 1;
    this.filterForm.setValue({
      category: null,
      rate: null,
      gender: null,
      startPrice: 0,
      endPrice: 500
    });
    this.getDoctorsList();
  }

  /* --- Handle api requests error messages --- */
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
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}

