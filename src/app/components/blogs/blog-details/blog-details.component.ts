import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { BlogsService } from './../../../services/blogs.service';
import { MetadataService } from './../../../services/generic/metadata.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ArticlesCarouselComponent } from 'src/app/carousels/articles-carousel/articles-carousel.component';
import { DoctorsCarouselComponent } from 'src/app/carousels/doctors-carousel/doctors-carousel.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { ShareToSocialComponent } from 'src/app/shared/share-to-social/share-to-social.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, SkeletonComponent, FooterComponent, ArticlesCarouselComponent, DoctorsCarouselComponent, RouterModule],
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  isLoadingBlogDetails = false;
  blogDetails: any;
  blogId: any;
  relatedArticles: any[] = [];
  relatedDoctors: any[] = [];
  currentLanguage: any;
  fullUrl: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogsService: BlogsService,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.blogId = params['id'];
      this.getBlogDetails(this.blogId);
    });
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      const path = this.router.url;
      this.fullUrl = window.location.origin + path;
    }
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Start Blog Details Functions
  getBlogDetails(id: any): void {
    this.isLoadingBlogDetails = true;
    const blogDetailsSubscription: Subscription = this.blogsService.getBlogById(id).pipe(
      tap(res => this.processBlogDetailsResponse(res)),
      catchError(err => {
        this.handleError(err);
        throw err;
      }),
      finalize(() => {
        this.isLoadingBlogDetails = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
    this.subscriptions.push(blogDetailsSubscription);
  }
  private processBlogDetailsResponse(res: any): void {
    if (res?.status) {
      this.blogDetails = res?.data?.article;
      this.relatedArticles = res?.data?.articles || [];
      this.relatedDoctors = res?.data?.doctors || [];
      this.updateMetaTagsForSEO();
    } else {
      this.handleError('حدث خطأ');
    }
  }
  private updateMetaTagsForSEO(): void {
    if (this.blogDetails?.title) {
      this.metadataService.updateCanonicalLink(`https://talbinah.net/Blogs/Details/${this.blogDetails?.title};id=${this.blogDetails?.id}`);
      this.metadataService.updateLinkRelAlternate('ar', `https://talbinah.net/Blogs/Details/${this.blogDetails?.title};id=${this.blogDetails?.id}`);
      this.metadataService.updateTitle(`تلبينة | ${this.blogDetails?.title}`);
      this.metadataService.updateMetaTagsName([
        { name: 'title', content: `تلبينة | ${this.blogDetails?.title}` },
        { name: 'description', content: `${this.blogDetails?.description}` },
        { name: 'keywords', content: 'مدونة, صحة نفسية, نصائح صحية, مقالات تثقيفية, Talbinah' },
        { name: 'author', content: 'Talbinah' },
        // Twitter Card Data
        { name: 'twitter:title', content: `تلبينة | ${this.blogDetails?.title}` },
        { name: 'twitter:description', content: `${this.blogDetails?.description}` },
        { name: 'twitter:url', content: `https://talbinah.net/Blogs/Details/${this.blogDetails?.title};id=${this.blogDetails?.id}` },
        { name: 'twitter:image', content: `${this.blogDetails?.image?.url}` },
      ]);
      // Open Graph Tags
      this.metadataService.updateMetaTagsProperty([
        { property: 'og:title', content: `تلبينة | ${this.blogDetails?.title}` },
        { property: 'og:description', content: `${this.blogDetails?.description}` },
        { property: 'og:url', content: `https://talbinah.net/Blogs/Details/${this.blogDetails?.title};id=${this.blogDetails?.id}` },
        { property: 'og:image', content: `${this.blogDetails?.image?.url}` },
      ]);
    }
  }
  // End Blog Details Functions

  share(): void {
    const ref = this.dialogService.open(ShareToSocialComponent, {
      header: 'مشاركة',
      width: '40%',
      baseZIndex: 10000,
      data: { link: this.fullUrl }
    });
    ref.onClose.subscribe((res: any) => { });
  }

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
