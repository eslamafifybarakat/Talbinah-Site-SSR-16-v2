import { DynamicSvgComponent } from '../icons/dynamic-svg/dynamic-svg.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TranslateModule, DynamicSvgComponent],
  selector: 'app-download-apps',
  templateUrl: './download-apps.component.html',
  styleUrls: ['./download-apps.component.scss']
})
export class DownloadAppsComponent {

  constructor(
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void { }

  close(): void {
    this.ref?.close();
  }
  goNow(): void {
    this.ref.close();
  }
}
