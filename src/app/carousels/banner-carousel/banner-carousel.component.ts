import { DoctorsBannerCardComponent } from './../../components/doctors/doctors-banner-card/doctors-banner-card.component';
import { PublicService } from '../../services/generic/public.service';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CarouselModule, DoctorsBannerCardComponent, TranslateModule],
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent {
  currentLanguage: string = '';

  @Input() items: any = [];

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }
}
