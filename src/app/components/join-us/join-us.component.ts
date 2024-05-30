import { MetadataService } from './../../services/generic/metadata.service';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DownloadAppsComponent } from 'src/app/shared/components/download-apps/download-apps.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    FooterComponent,
    CommonModule
  ],
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
    }
  }

  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | انضم إلينا ');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | انضم إلينا' },
      { name: 'description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:url', content: 'https://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | انضم إلينا' },
      { name: 'twitter:description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | انضم إلينا' },
      { property: 'og:description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  downloadApp(): void {
    const ref = this?.dialogService?.open(DownloadAppsComponent, {
      width: '35%',
      showHeader: false,
      styleClass: 'custom-modal download-app-dialog',
      dismissableMask: true,
      data: {}
    });
  }
}
