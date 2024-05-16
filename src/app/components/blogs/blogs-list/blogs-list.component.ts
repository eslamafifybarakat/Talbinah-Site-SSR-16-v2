import { SkeletonComponent } from './../../../shared/components/skeleton/skeleton.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { BlogsService } from './../../../services/blogs.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { MetadataService } from './../../../services/generic/metadata.service';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { ArticleCardComponent } from '../../home/article-card/article-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonComponent,
    PaginatorModule,
    RouterModule,
    ArticleCardComponent
  ],
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent {
  private unsubscribe: Subscription[] = [];
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
    private publicService: PublicService,
    private alertsService: AlertsService,
    private blogsService: BlogsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
    }
    this.getBlogs();
  }
  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | المقالات');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | المقالات' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | المقالات' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | المقالات' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  getBlogs(hideFullLoading?: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      hideFullLoading ? this.isLoadingFilter = true : this.isLoadingBlogs = true;
      this.blogsService?.getAll(this.page, this.perPage, this.categoryId)?.subscribe(
        (res: any) => {
          if (res?.status == true) {
            this.blogsList = res?.data?.articles;
            this.totalBlogs = res?.data?.blogs_count || 0;
            this.categoriesList = res?.data?.articlesCategories;
            this.isLoadingBlogs = false;
            this.isLoadingFilter = false;
            this.cdr.detectChanges();
          } else {
            res?.message ? this.alertsService?.openToast('error', 'error', res?.message) : '';
            this.isLoadingBlogs = false;
            this.isLoadingFilter = false;
          }
        },
        (err: any) => {
          err ? this.alertsService?.openToast('error', 'error', err) : '';
          this.isLoadingBlogs = false;
          this.isLoadingFilter = false;
        }
      );
    }
  }
  onPageChange(event: any): void {
    this.page = event?.page + 1;
    this.getBlogs(true);
  }
  onChangeCategory(id: any): void {
    this.categoryId = id;
    this.getBlogs(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
