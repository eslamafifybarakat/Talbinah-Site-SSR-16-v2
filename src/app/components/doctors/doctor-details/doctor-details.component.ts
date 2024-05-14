import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from './../../../services/doctors.service';
import { MetadataService } from './../../../services/generic/metadata.service';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RatingModule,
    FormsModule,

    SkeletonComponent
  ],
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  fullUrl: any = null;

  doctorId: any;
  isLoading: boolean = false;
  doctorDetails: any;
  socialLinks: any;
  priceInterval: any = ["15", "30", "45", "60"];
  priceObject: any = {};
  currency: any = 'RSA'; // Default value

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private doctorsService: DoctorsService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys?.language);
      const baseUrl = window.location.origin;
      const path = this.router.url;
      this.fullUrl = baseUrl + path;
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.doctorId = params['id'];
        this.getDoctorDetails(this.doctorId);
      }
    });
  }

  getDoctorDetails(id: any): void {
    this.isLoading = true;
    this.doctorsService.getDoctorById(id).subscribe(
      (res: any) => {
        this.processDoctorDetailsResponse(res);
      },
      (err: any) => {
        this.handleError(err);
      }
    );
  }
  private processDoctorDetailsResponse(res: any): void {
    if (res?.status === true) {
      this.doctorDetails = res.data.doctor;
      if (this.doctorDetails?.reviews_doctor) {
        this.doctorsService.reviewsDoctorSubj.next(this.doctorDetails?.reviews_doctor);
      }
      // this.doctorDetails.avg_rate = this.publicService.transformDecimalToInteger(this.doctorDetails.avg_rate);
      this.socialLinks = this.doctorDetails.social;
      if (isPlatformServer(this.platformId)) {
        this.updateMetaTags();
      }
      if (isPlatformBrowser(this.platformId)) {
        this.updateMetaTags();
      }
      this.updatePriceObject();
    } else {
      this.alertsService.openToast('error', 'error', res.message);
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  private updateMetaTags(): void {
    if (this.doctorDetails?.full_name) {
      this.metadataService.updateTitle(`تلبينة | ${this.doctorDetails?.full_name}`);
      this.metadataService.updateMetaTagsName([
        { name: 'title', content: `تلبينة | ${this.doctorDetails?.full_name}` },
        { name: 'description', content: `${this.doctorDetails?.profile?.bio}` },
        { name: 'date', content: `${this.doctorDetails?.created_at}` },

        { name: 'twitter:title', content: `تلبينة | ${this.doctorDetails.full_name}` },
        { name: 'twitter:description', content: `${this.doctorDetails?.profile?.bio}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${this.doctorDetails?.image?.url}` },
        { name: 'twitter:url', content: 'http://talbinah.net/' },
        { name: 'twitter:site', content: '@Talbinahco' },
      ]);
      this.metadataService.updateMetaTagsProperty([
        { property: 'og:locale', content: 'ar_AR' },
        { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
        { property: 'article:modified_time', content: `${this.doctorDetails?.updated_at}` },

        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'http://talbinah.net/' },
        { property: 'og:title', content: `تلبينة | ${this.doctorDetails.full_name}` },
        { property: 'og:description', content: `${this.doctorDetails?.profile?.bio}` },
        { property: 'og:image', content: `${this.doctorDetails?.image?.url || 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png'}` },
        { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
      ]);
    }
  }
  private updatePriceObject(): void {
    this.priceInterval.forEach((interval: any) => {
      if (this.doctorDetails.profile.price_half_hour && interval === '15') {
        this.priceObject[interval] = {
          rsa: this.doctorDetails.profile.price_half_hour * 0.5,
          usd: this.doctorDetails.profile.price_half_hour * 0.5
        };
      }
      if (this.doctorDetails.profile.price_half_hour && interval === '30') {
        this.priceObject[interval] = {
          rsa: this.doctorDetails.profile.price_half_hour,
          usd: this.doctorDetails.profile.price_half_hour
        };
      }
      if (this.doctorDetails.profile.price_half_hour && interval === '45') {
        this.priceObject[interval] = {
          rsa: this.doctorDetails.profile.price_half_hour * 1.5,
          usd: this.doctorDetails.profile.price_half_hour * 1.5
        };
      }
      if (this.doctorDetails.profile.price_half_hour && interval === '60') {
        this.priceObject[interval] = {
          rsa: this.doctorDetails.profile.price_half_hour * 2,
          usd: this.doctorDetails.profile.price_half_hour * 2
        };
      }
    });
  }
  private handleError(err: any): void {
    this.alertsService.openToast('error', 'error', err);
    this.isLoading = false;
  }

  share(): void {
    // const ref = this.dialogService.open(ShareComponent, {
    //   header: 'مشاركة',
    //   width: '40%',
    //   baseZIndex: 10000,
    //   data: {
    //     link: this.fullUrl
    //   },
    //   styleClass: 'rate'
    // });
    // ref.onClose.subscribe((res: any) => {
    //   if (res) {
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}

