import { FeatureCardComponent } from './../../components/home/feature-card/feature-card.component';
import { PublicService } from '../../services/generic/public.service';
import { CarouselModule } from 'primeng/carousel';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CarouselModule, FeatureCardComponent],
  selector: 'app-features-vertical-carousel',
  templateUrl: './features-vertical-carousel.component.html',
  styleUrls: ['./features-vertical-carousel.component.scss']
})
export class FeaturesVerticalCarouselComponent {
  currentLanguage: string = '';

  @Input() items: any = [];

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }
}
