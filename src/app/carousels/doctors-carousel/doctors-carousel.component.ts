import { PublicService } from './../../services/generic/public.service';
import { DoctorCardComponent } from './../../components/home/doctor-card/doctor-card.component';
import { CarouselModule } from 'primeng/carousel';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CarouselModule, DoctorCardComponent],
  selector: 'app-doctors-carousel',
  templateUrl: './doctors-carousel.component.html',
  styleUrls: ['./doctors-carousel.component.scss']
})
export class DoctorsCarouselComponent {
  currentLanguage: string = '';

  @Input() items: any = [];
  doctorOptions: any = [
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
