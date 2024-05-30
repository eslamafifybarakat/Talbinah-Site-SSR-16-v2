// Modules
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';

// Components
import { DynamicSvgComponent } from './../../../shared/components/icons/dynamic-svg/dynamic-svg.component';
import { ArticleCardComponent } from 'src/app/components/home-page/article-card/article-card.component';
import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

// Services
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MetadataService } from './../../../services/generic/metadata.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { BlogsService } from './../../../services/blogs.service';
import { Subscription, catchError, finalize, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonComponent,
    PaginatorModule,
    RouterModule,
    ArticleCardComponent,
    DynamicSvgComponent,
    FooterComponent
  ],
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent {
  private subscriptions: Subscription[] = [];
  currentLanguage: any;

  blogsList: any = [];
  isLoadingBlogs: boolean = false;
  totalBlogs: number = 0;
  page: number = 1;
  perPage: number = 12;

  categoriesList: any = [];
  categoryId: any = null;
  isLoadingFilter: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private alertsService: AlertsService,
    private blogsService: BlogsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      this.updateMetaTagsForSEO();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTagsForSEO();
    }
    this.getBlogsList();
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateCanonicalLink('https://talbinah.net/Blogs/List');
    this.metadataService.updateLinkRelAlternate('ar', 'https://talbinah.net/Blogs/List');
    this.metadataService.updateTitle('مدونة Talbinah | مقالات تثقيفية في الصحة النفسية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'مدونة Talbinah | مقالات تثقيفية في الصحة النفسية' },
      { name: 'description', content: 'استكشف مدونة Talbinah للحصول على أحدث المقالات والنصائح التثقيفية حول الصحة النفسية. موارد مفيدة من أخصائيين لدعم صحتك النفسية.' },
      { name: 'keywords', content: 'مدونة, صحة نفسية, نصائح صحية, مقالات تثقيفية, Talbinah' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:title', content: 'مدونة Talbinah | مقالات تثقيفية في الصحة النفسية' },
      { name: 'twitter:description', content: 'تعرف على فريق الأطباء والمعالجين المتخصصين في Talbinah، السعودية. احجز موعدك الآن للحصول على استشارات نفسية وأسرية من خبراء معتمدين.' },
      { name: 'twitter:url', content: 'https://talbinah.net/Doctors/List' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'مدونة Talbinah | مقالات تثقيفية في الصحة النفسية' },
      { property: 'og:description', content: 'تعرف على فريق الأطباء والمعالجين المتخصصين في Talbinah، السعودية. احجز موعدك الآن للحصول على استشارات نفسية وأسرية من خبراء معتمدين.' },
      { property: 'og:url', content: 'https://talbinah.net/Blogs/List' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
  }

  /* Start Get Blogs List Functions */
  getBlogsList(hideFullLoading?: boolean): void {
    hideFullLoading ? this.isLoadingFilter = true : this.isLoadingBlogs = true;
    let blogsSubscription: Subscription = this.blogsService?.getAll(this.page, this.perPage, this.categoryId)
      .pipe(
        tap((res: any) => this.processBlogsListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeBlogsLoading())
      ).subscribe();
    this.subscriptions.push(blogsSubscription);
  }
  private processBlogsListResponse(response: any): void {
    if (response?.status == true) {
      this.blogsList = response?.data?.articles;
      this.totalBlogs = response?.data?.blogs_count || 0;
      this.categoriesList = response?.data?.articlesCategories;
      this.cdr.markForCheck();
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeBlogsLoading(): void {
    this.isLoadingBlogs = false;
    this.isLoadingFilter = false;

  }
  /* End Get Blogs List Functions */

  onPageChange(event: any): void {
    this.page = event?.page + 1;
    this.getBlogsList(true);
  }
  onChangeCategory(id: any): void {
    this.categoryId = id;
    this.getBlogsList(true);
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
