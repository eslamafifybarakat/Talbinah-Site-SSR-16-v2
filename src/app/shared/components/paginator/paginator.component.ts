// Modules
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

//Services

// Components
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    PaginatorModule,
    CommonModule,
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() page: number;
  @Input() perPage: number;
  @Input() totalRecords: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  protected showPageLinks: boolean=true;
  constructor() {
    this.updatePage();
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }

  private updatePage() {
    debugger;
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 767) {
        this.showPageLinks=true;
        // Set page to 5 for larger screens
      } else {
        this.showPageLinks=false;
        //show Jump To Page Dropdown for smaller screens

      }
    }
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updatePage();
  }
}
