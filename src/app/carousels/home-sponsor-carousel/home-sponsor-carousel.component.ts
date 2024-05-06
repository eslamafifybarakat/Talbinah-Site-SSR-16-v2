import { CarouselModule } from 'primeng/carousel';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CarouselModule],
  selector: 'home-sponsor-carousel',
  templateUrl: './home-sponsor-carousel.component.html',
  styleUrls: ['./home-sponsor-carousel.component.scss']
})
export class HomeSponsorCarouselComponent {
  sponsors: any = [
    { imgUrl: '../../../assets/images/home/sponsors/1.svg' },
    { imgUrl: '../../../assets/images/home/sponsors/2.svg' },
    { imgUrl: '../../../assets/images/home/sponsors/3.svg' },
    { imgUrl: '../../../assets/images/home/sponsors/4.svg' },
  ];
  sponsorOptions: any = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1
    }
  ];
}
