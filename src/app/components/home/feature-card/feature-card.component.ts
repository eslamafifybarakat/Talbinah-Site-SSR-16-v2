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

}
