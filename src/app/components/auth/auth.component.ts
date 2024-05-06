import { AuthCarouselComponent } from './../../carousels/auth-carousel/auth-carousel.component';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, AuthCarouselComponent, CommonModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  showSlider: boolean = true;
  constructor(
    private router: Router
  ) {
    this.showSlider = router.url.includes('successful') ? false : true;
  }
  getTitle(): string {
    if (this.router.url.includes('login')) {
      return 'auth.welcomeBack'
    }
    if (this.router.url.includes('supplier')) {
      return 'auth.expandYourNetwork'
    }
    if (this.router.url.includes('buyer')) {
      return 'auth.findYourBuyer'
    }
    else {
      return 'auth.welcomeBack';
    }
  }

}
