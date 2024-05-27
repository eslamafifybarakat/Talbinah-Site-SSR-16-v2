// Services
import { NavItem, navItems } from './../../../interfaces/navbar';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, map } from 'rxjs';
// Modules
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  currentUrl: string = '';

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
    private activatedRoute:ActivatedRoute,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.navItems = navItems;
    // Listen to changes in the route
    this.router?.events?.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
    ).subscribe((event) => {
      // Logic to execute on NavigationEnd
      this.currentUrl = event?.root?.firstChild?.snapshot?.url?.join('');
    });
  }

  ngOnInit(): void {}

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
