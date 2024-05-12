import { DynamicSvgComponent } from '../icons/dynamic-svg/dynamic-svg.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    CommonModule,
    RouterModule,

    // Components
    DynamicSvgComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  emailText: string = 'info@talbinah.net';
  phone: string = '(+966) 552272756';


  constructor() {

  }
}
