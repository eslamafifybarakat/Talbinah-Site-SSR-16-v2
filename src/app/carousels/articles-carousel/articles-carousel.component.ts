import { ArticleCardComponent } from 'src/app/components/home-page/article-card/article-card.component';
import { PublicService } from '../../services/generic/public.service';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CarouselModule, ArticleCardComponent, TranslateModule],
  selector: 'app-articles-carousel',
  templateUrl: './articles-carousel.component.html',
  styleUrls: ['./articles-carousel.component.scss']
})
export class ArticlesCarouselComponent {
  currentLanguage: string = '';

  @Input() items: any = [];
  articleOptions: any = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '460px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
  }
}
