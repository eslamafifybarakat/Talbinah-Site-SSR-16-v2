import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MetadataService } from 'src/app/services/generic/metadata.service';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-privacy-and-policy',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent
  ],
  templateUrl: './privacy-and-policy.component.html',
  styleUrls: ['./privacy-and-policy.component.scss']
})
export class PrivacyAndPolicyComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService
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
    this.metadataService.updateTitle('تلبينة | السياسية و الخصوصية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | السياسية و الخصوصية' },
      { name: 'description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:url', content: 'https://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | السياسية و الخصوصية' },
      { name: 'twitter:description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | السياسية و الخصوصية' },
      { property: 'og:description', content: 'احصل على الدعم النفسي مع تطبيق تلبينة. جلسات علاجية عبر الإنترنت مع كبار الأخصائيين النفسيين في السعودية، متوفرة في راحة منزلك. ابدأ رحلة العلاج وحسّن صحتك النفسية اليوم.' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }
}
