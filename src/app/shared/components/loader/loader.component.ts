import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TranslateModule],
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

}
