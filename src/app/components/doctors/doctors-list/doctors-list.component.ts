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
import { DoctorCardComponent } from '../../home/doctor-card/doctor-card.component';

// Services
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MetadataService } from './../../../services/generic/metadata.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorsService } from './../../../services/doctors.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { Subject, Subscription, catchError, debounceTime, finalize, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';


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
    DoctorCardComponent,
    SkeletonComponent,
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
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
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

  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | الأطباء');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | الأطباء' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | الأطباء' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/images/meta-tags.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | الأطباء' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/images/meta-tags.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  /* Start Get Doctors List Functions */
  getDoctorsList(): void {
    this.isLoadingDoctors = true;
    let doctorsSubscription: Subscription = this.doctorsService?.getAll(this.page, this.perPage, this.search, this.startPrice, this.endPrice, this.gender, this.specialistId, this.topRated)
      .pipe(
        tap((res: any) => this.processDoctorsListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeUserDoctorsLoading())
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
    } else {
      this.handleError(response.error);
      return;
    }
    this.isLoadingDoctors = false;
  }
  private finalizeUserDoctorsLoading(): void {
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
    this.filterForm.value?.category ? this.specialistId = this.filterForm.value?.category[0]?.id : '';
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

