import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/en/Home', pathMatch: 'full' },
  // Authentication
  {
    path: 'Auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
  {
    path: 'lang/Auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
  // Home Page
  {
    path: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      )
  },
  {
    path: ':lang/Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      )
  },
  // Contact Us
  {
    path: ':lang/ContactUs',
    loadComponent: () =>
      import('./components/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: 'ContactUs',
    loadComponent: () =>
      import('./components/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/ContactUs',
    loadComponent: () =>
      import('./components/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },

   // Errors
   {
    path: ':lang/Errors',
    loadComponent: () =>
      import('./components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  },

  {
    path: 'Errors',
    loadComponent: () =>
      import('./components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  },
  { path: '**', redirectTo: '/en/Errors' } // Redirect all unknown paths to '/Errors'
];
