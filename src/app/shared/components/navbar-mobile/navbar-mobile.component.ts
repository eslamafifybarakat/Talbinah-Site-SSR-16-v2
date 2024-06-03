//Modules
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

//Services
import { NavItem, navItems } from './../../../interfaces/navbar';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { keys } from '../../configs/localstorage-key';

//Components
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'navbar-mobile',
  standalone: true,
  imports: [
    //Modules
    SidebarModule,
    RouterModule,
    TranslateModule,
    CommonModule,
    NgOptimizedImage,
    //Components
    LanguageSelectorComponent
  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent {
  displayMenu: boolean = false;
  isUserLoggedIn: boolean = false;
  currentLanguage: string | null = '';

  navItems: NavItem[];
  currentUrl: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = localStorage.getItem(keys.language);
    }
    // Listen to changes in the route
    this.router?.events?.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
    ).subscribe((event) => {
      // Logic to execute on NavigationEnd
      this.currentUrl = event?.root?.firstChild?.snapshot?.url?.join('');
    });
    this.loadData();
  }
  loadData(): void {
    this.navItems = navItems;
  }

  openSidebar(): void {
    this.displayMenu = true;
  }

  closeSidebar(): void {
    this.displayMenu = false;
  }

  openMenu(link: any): void {
    this.navItems?.forEach((item: any) => {
      item.isActive = false;
    });
    link.isActive = !link.isActive;
    link.children ? link.children.length > 0 ? '' : this.closeSidebar() : this.closeSidebar();
  }

  logOut(): void {
    // Implement logout logic
    this.closeSidebar();
  }

  login(): void {
    // Implement login logic
    this.closeSidebar();
  }
}
