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
      this.updateMetaTagsForSEO();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTagsForSEO();
    }
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateCanonicalLink('https://talbinah.net/PrivacyAndPolicy');
    this.metadataService.updateLinkRelAlternate('ar', 'https://talbinah.net/PrivacyAndPolicy');
    this.metadataService.updateTitle('السياسية و الخصوصية | Talbinah | إجابات لاستفساراتك حول السياسية و الخصوصية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'السياسية و الخصوصية | Talbinah | إجابات لاستفساراتك حول السياسية و الخصوصية' },
      { name: 'description', content: 'تصفح صفحة السياسية و الخصوصية في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { name: 'keywords', content: 'PrivacyAndPolicy, أسئلة متكررة, الصحة النفسية,السياسية و الخصوصية , استفسارات, Talbinah' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:title', content: 'السياسية و الخصوصية | Talbinah | إجابات لاستفساراتك حول السياسية و الخصوصية' },
      { name: 'twitter:description', content: 'تصفح صفحة السياسية و الخصوصية في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { name: 'twitter:url', content: 'https://talbinah.net/PrivacyAndPolicy' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'السياسية و الخصوصية | Talbinah | إجابات لاستفساراتك حول السياسية و الخصوصية' },
      { property: 'og:description', content: 'تصفح صفحة السياسية و الخصوصية في Talbinah للحصول على إجابات شاملة لأكثر الاستفسارات شيوعًا حول خدماتنا والصحة النفسية.' },
      { property: 'og:url', content: 'https://talbinah.net/PrivacyAndPolicy' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
  }
}
