import { BannerCarouselComponent } from './../../../carousels/banner-carousel/banner-carousel.component';
import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorsService } from './../../../services/doctors.service';
import { MetadataService } from './../../../services/generic/metadata.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { DoctorCardComponent } from '../../home/doctor-card/doctor-card.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, DropdownModule, RouterModule, CommonModule, SkeletonComponent, RatingModule, PaginatorModule, SidebarModule, DoctorCardComponent, CheckboxModule, RadioButtonModule, BannerCarouselComponent],
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent {
  private unsubscribe: Subscription[] = [];
  private searchSubject = new Subject<any>();
  currentLanguage: any;
  selectedCategories: any = [];
  doctorsList: any = [];
  totalDoctors: number = 0;
  isLoadingDoctors: boolean = false;
  isSearch: boolean = false;
  page: number = 1;
  perPage: number = 12;
  search: any;
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
    start_price: [0],
    end_price: [500],
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
      this.getDoctors();
    });
    this.searchSubject.pipe(debounceTime(500)).subscribe(event => {
      this.searchService(event);
    });
  }

  getDoctors(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoadingDoctors = true;
      this.doctorsService?.getAll(this.page, this.perPage, this.search, this.startPrice, this.endPrice, this.gender, this.specialistId, this.topRated)?.subscribe(
        (res: any) => {
          if (res?.status == true) {
            this.doctorsList = res?.data?.doctors;
            this.doctorsList?.forEach(element => {
              // element['avg_rate'] = this.publicService.transformDecimalToInteger(element['avg_rate']);
            });
            if (this.search != null || this.search != '' || this.startPrice != null || this.endPrice != null || this.gender != null || this.specialistId != null || this.topRated != null) {
              this.isSearch = true;
            } else {
              this.isSearch = false;
            }
            this.totalDoctors = res?.data?.doctors_count;
            this.specialitiesList = res?.data?.specialists;
            this.specialitiesList?.forEach(element => {
              if (element?.id == this.specialistId) {
                this.filterForm.patchValue({
                  category: element
                });
              }
            });
            this.isLoadingDoctors = false;
            this.cdr.detectChanges();
          } else {
            this.isLoadingDoctors = false;
            res?.message ? this.alertsService?.openToast('error', 'error', res?.message) : '';
          }
        },
        (err: any) => {
          err ? this.alertsService?.openToast('error', 'error', err) : '';
          this.isLoadingDoctors = false;
        }
      );
    }
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

  onPageChange(event: any): void {
    this.page = event?.page + 1;
    this.getDoctors();
  }

  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchService(event: any): void {
    this.search = event;
    this.page = 1;
    this.isLoadingDoctors = true;
    this.getDoctors();
  }
  clearSearchValue(event: any): void {
    event.value = '';
    this.page = 1;
    this.search = null;
    this.isLoadingDoctors = true;
    this.getDoctors();
  }

  filterNow(): void {
    this.page = 1;
    this.specialistId = this.filterForm.value?.category?.id;
    this.startPrice = this.filterForm.value?.start_price;
    this.endPrice = this.filterForm.value?.end_price;
    this.gender = this.filterForm.value?.gender == 'male' ? 0 : this.filterForm.value?.gender == 'female' ? 1 : null;
    this.topRated = this.filterForm.value?.rate == 'yes' ? 1 : null;
    this.getDoctors();
  }
  reset(): void {
    this.page = 1;
    this.filterForm.setValue({
      category: null,
      rate: null,
      gender: null,
      start_price: 0,
      end_price: 500
    });
    this.getDoctors();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}

