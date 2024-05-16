import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';
import { doctorsChildrenRoutes } from './components/doctors/doctors-children-routes';
import { blogsChildrenRoutes } from './components/blogs/blogs-children-routes';


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
    children: authChildrenRoutes,
  },
  // Home Page
  {
    path: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    data: {
      page: 'Home'
    }
  },
  {
    path: ':lang/Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    data: {
      page: 'Home'
    }
  },
  // Doctors
  {
    path: 'Doctors',
    loadComponent: () =>
      import('./components/doctors/doctors.component').then(
        (c) => c.DoctorsComponent
      ),
    children: doctorsChildrenRoutes,
    data: {
      page: 'Doctors'
    }
  },
  {
    path: ':lang/Doctors',
    loadComponent: () =>
      import('./components/doctors/doctors.component').then(
        (c) => c.DoctorsComponent
      ),
    children: doctorsChildrenRoutes
  },

  // Doctors
  {
    path: 'Blogs',
    loadComponent: () =>
      import('./components/blogs/blogs.component').then(
        (c) => c.BlogsComponent
      ),
    children: blogsChildrenRoutes,
    data: {
      page: 'Blogs'
    }
  },
  {
    path: ':lang/Blogs',
    loadComponent: () =>
      import('./components/blogs/blogs.component').then(
        (c) => c.BlogsComponent
      ),
    children: blogsChildrenRoutes
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

  {
    path: ':lang/Join-Us',
    loadComponent: () =>
      import('./components/join-us/join-us.component').then(
        (c) => c.JoinUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: 'Join-Us',
    loadComponent: () =>
      import('./components/join-us/join-us.component').then(
        (c) => c.JoinUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
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
