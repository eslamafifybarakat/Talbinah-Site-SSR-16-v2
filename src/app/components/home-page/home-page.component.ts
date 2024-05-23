// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Services
import { LocalizationLanguageService } from './../../services/generic/localization-language.service';
import { MetaDetails, MetadataService } from '../../services/generic/metadata.service';
import { PublicService } from './../../services/generic/public.service';
import { AlertsService } from './../../services/generic/alerts.service';
import { Feature, homeApiResponse } from './../../interfaces/home';
import { HomeService } from './../../services/home.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

// Components
import { FeaturesVerticalCarouselComponent } from './../../carousels/feature-vertical-carousel/features-vertical-carousel.component';
import { HomeSponsorCarouselComponent } from './../../carousels/home-sponsor-carousel/home-sponsor-carousel.component';
import { ArticlesCarouselComponent } from './../../carousels/articles-carousel/articles-carousel.component';
import { ReviewsCarouselComponent } from './../../carousels/reviews-carousel/reviews-carousel.component';
import { DoctorsCarouselComponent } from './../../carousels/doctors-carousel/doctors-carousel.component';
import { DynamicSvgComponent } from './../../shared/components/icons/dynamic-svg/dynamic-svg.component';
import { SkeletonComponent } from './../../shared/components/skeleton/skeleton.component';
import { FooterComponent } from './../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
     // Modules
     TranslateModule,
     RouterModule,
     CommonModule,
 
     // Components
     FeaturesVerticalCarouselComponent,
     HomeSponsorCarouselComponent,
     ArticlesCarouselComponent,
     ReviewsCarouselComponent,
     DoctorsCarouselComponent,
     DynamicSvgComponent,
     SkeletonComponent,
     FooterComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

}