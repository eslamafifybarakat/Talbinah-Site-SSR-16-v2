import { PublicService } from './../../../services/generic/public.service';
import { DialogService } from 'primeng/dynamicdialog';
// Services
import { NavItem, navItems } from './../../../interfaces/navbar';
// Modules
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
// Components
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { DownloadAppsComponent } from '../download-apps/download-apps.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    // Modules
    NgOptimizedImage,
    RouterModule,
    TranslateModule,
    CommonModule,
    // Components
    LanguageSelectorComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  page: string = '';

  collapse: boolean = false;
  displayMenu: boolean = false;
  isVisitMegaMenuVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  navItems: NavItem[];

  @HostListener("window:scroll", ["$event"])
  handleScroll(event: Event) {
    this.handleKeyDown();
  }
  ngAfterViewInit() {
    this.handleKeyDown();
  }
  handleKeyDown() {
    if (isPlatformBrowser(this.platformId)) {
      let element: any = document.querySelector(".navbar") as HTMLElement;
      if (element) {
        if (window.pageYOffset > 30) {
          element ? element.classList.add("headerScroll") : '';
        } else {
          element ? element.classList.remove("headerScroll") : '';
        }
      } else {
        console.error("Element with class 'navbar' not found");
      }
    }
  }

  onHoverMegaMenu(): void {
    this.isVisitMegaMenuVisible = true;
  }
  onLeaveMegaMenu(): void {
    this.isVisitMegaMenuVisible = false;
  }
  stopClickPropagation(event: Event): void {
    event.stopPropagation();
  }

  openPlace(): void {
    this.collapse = false;
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialogService: DialogService,
    private publicService: PublicService,
    private router: Router
  ) {
    this.navItems = navItems;
    publicService.pageData.subscribe((res: any) => {
      this.page = res?.page;
    })
  }

  ngOnInit(): void {
  }

  login(): void {
  }

  downloadApp(): void {
    const ref = this?.dialogService?.open(DownloadAppsComponent, {
      width: '35%',
      showHeader: false,
      styleClass: 'custom-modal download-app-dialog',
      dismissableMask: true,
      data: {}
    });
  }
}
