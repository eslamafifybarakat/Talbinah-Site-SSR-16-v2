import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { BlogsService } from './../../../services/blogs.service';
import { PublicService } from './../../../services/generic/public.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MetadataService } from './../../../services/generic/metadata.service';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonComponent,
    RouterModule
  ],
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  fullUrl: any = null;

  isLoading: boolean = false;
  blogDetails: any;
  blogId: any;

  relatedArticles: any = [];
  relatedDoctors: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private activatedRoute: ActivatedRoute,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private publicService: PublicService,
    private blogsService: BlogsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      const path = this.router.url;
      const baseUrl = window.location.origin;
      this.fullUrl = baseUrl + path;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.blogId = params['id'];
      }
      this.getBlogDetails(this.blogId);
    });
  }

  getBlogDetails(id: any): void {
    this.isLoading = true;
    this.blogsService.getBlogById(id).subscribe(
      (res: any) => {
        this.processBlogDetailsResponse(res);
      },
      (err: any) => {
        this.handleError(err);
      }
    );
  }
  private processBlogDetailsResponse(res: any): void {
    if (res?.status === true) {
      this.blogDetails = res?.data?.article;
      if (res?.data?.articles) {
        this.relatedArticles = res?.data?.articles;
        this.blogsService.blogRelatedArticlesSubj.next(this.relatedArticles);
      }
      if (res?.data?.doctors) {
        this.relatedDoctors = res?.data?.doctors;
        this.blogsService.blogRelatedDoctorsSubj.next(this.relatedDoctors);
      }
      if (isPlatformBrowser(this.platformId)) {
        this.updateMetaTags();
      }
      if (isPlatformServer(this.platformId)) {
        this.updateMetaTags();
      }
    } else {
      this.alertsService.openToast('error', 'error', res.message);
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  private updateMetaTags(): void {
    if (this.blogDetails?.title) {
      this.metadataService.updateTitle(`تلبينة | ${this.blogDetails?.title}`);
    }
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: `تلبينة | ${this.blogDetails?.title}` },
      { name: 'description', content: `${this.blogDetails?.description}` },
      { name: 'date', content: `${this.blogDetails?.created_at}` },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: `تلبينة | ${this.blogDetails.title}` },
      { name: 'twitter:description', content: `${this.blogDetails?.description}` },
      { name: 'twitter:image', content: `${this.blogDetails?.image?.url}` },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: `${this.blogDetails?.updated_at}` },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: `تلبينة | ${this.blogDetails.title}` },
      { property: 'og:description', content: `${this.blogDetails?.description}` },
      { property: 'og:image', content: `${this.blogDetails?.image?.url || 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png'}` },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
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
