import { TranslateModule } from '@ngx-translate/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TranslateModule, RatingModule, FormsModule],
  selector: 'app-download-app-bar',
  templateUrl: './download-app-bar.component.html',
  styleUrls: ['./download-app-bar.component.scss']
})
export class DownloadAppBarComponent {
  rate: any = 4;
}
