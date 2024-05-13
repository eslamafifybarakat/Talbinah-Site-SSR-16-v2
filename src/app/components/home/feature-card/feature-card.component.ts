import { DownloadAppsComponent } from './../../../shared/components/download-apps/download-apps.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { Feature } from './../../../interfaces/home';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [TranslateModule],
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() item: Feature;

  constructor(private dialogService: DialogService) { }

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
