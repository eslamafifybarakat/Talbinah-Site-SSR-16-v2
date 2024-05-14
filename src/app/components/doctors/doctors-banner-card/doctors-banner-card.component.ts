import { DynamicSvgComponent } from './../../../shared/components/icons/dynamic-svg/dynamic-svg.component';
import { TranslateModule } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [TranslateModule, DynamicSvgComponent],
  selector: 'app-doctors-banner-card',
  templateUrl: './doctors-banner-card.component.html',
  styleUrls: ['./doctors-banner-card.component.scss']
})
export class DoctorsBannerCardComponent {
  @Input() item: any;
}
