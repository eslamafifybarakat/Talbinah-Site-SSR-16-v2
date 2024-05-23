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
      this.updateMetaTags();
    } else {
      this.handleError('حدث خطأ');
    }
  }
  private updateMetaTags(): void {
    if (this.blogDetails.title) {
      this.metadataService.updateTitle(`تلبينة | ${this.blogDetails.title}`);
      this.metadataService.updateMetaTagsForSEO({
        title: `تلبينة | ${this.blogDetails.title}`,
        description: this.blogDetails.description,
        image: this.blogDetails.image?.url
      });
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
    // this.subscriptions.forEach((subscription: Subscription) => {
    //   if (subscription && !subscription.closed) {
    //     subscription.unsubscribe();
    //   }
    // });
  }
}
