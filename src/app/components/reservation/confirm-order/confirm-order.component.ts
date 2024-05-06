//Modules
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

//Services
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { AuthService } from './../../../services/auth.service';

//Compoenents
import { AuthCarouselComponent } from './../../../carousels/auth-carousel/auth-carousel.component';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    //Modules
    TranslateModule,
    RouterModule,
    CommonModule,

    //Compoenents
    AuthCarouselComponent
  ],
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent {
  private subscriptions: Subscription[] = [];
  showSlider: boolean = true;

  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private location: Location,
    private route: Router
  ) {
    this.showSlider = route.url.includes('successful') ? false : true;
  }

  back(): void {
    this.location.back();
  }

  goToReserve(): void {
    this.route.navigate(['/Reservation/ConfirmOrder']);
  }

  //Handle Errors
  private handleError(err: any): any {
    this.setErrorMessage(err || this.publicService.translateTextFromJson('general.errorOccur'));
  }
  private setErrorMessage(message: string): void {
    // this.alertsService.openToast('error', 'error', message);
    this.publicService.show_loader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
