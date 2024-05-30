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
      this.updateMetaTagsForSEO();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTagsForSEO();
    }
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateCanonicalLink('https://talbinah.net/JoinUs');
    this.metadataService.updateLinkRelAlternate('ar', 'https://talbinah.net/JoinUs');
    this.metadataService.updateTitle('انضم إلى فريقنا | Talbinah | هل أنت متخصص في الصحة النفسية؟');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'انضم إلى فريقنا | Talbinah | هل أنت متخصص في الصحة النفسية؟' },
      { name: 'description', content: 'هل أنت متخصص في الصحة النفسية؟ انضم إلى فريق Talbinah وساهم في تحسين الصحة النفسية بالسعودية. تقدم الآن لفرص العمل المتاحة.' },
      { name: 'keywords', content: 'وظائف, الصحة النفسية, مهن في الصحة النفسية, Talbinah, انضم إلينا, فرص عمل بالسعودية' },
      { name: 'author', content: 'Talbinah' },
      // Twitter Card Data
      { name: 'twitter:title', content: 'انضم إلى فريقنا | Talbinah | هل أنت متخصص في الصحة النفسية؟' },
      { name: 'twitter:description', content: 'هل أنت متخصص في الصحة النفسية؟ انضم إلى فريق Talbinah وساهم في تحسين الصحة النفسية بالسعودية. تقدم الآن لفرص العمل المتاحة.' },
      { name: 'twitter:url', content: 'https://talbinah.net/JoinUs' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    // Open Graph Tags
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: 'انضم إلى فريقنا | Talbinah | هل أنت متخصص في الصحة النفسية؟' },
      { property: 'og:description', content: 'هل أنت متخصص في الصحة النفسية؟ انضم إلى فريق Talbinah وساهم في تحسين الصحة النفسية بالسعودية. تقدم الآن لفرص العمل المتاحة.' },
      { property: 'og:url', content: 'https://talbinah.net/JoinUs' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
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
