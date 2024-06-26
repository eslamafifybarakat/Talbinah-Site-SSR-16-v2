import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-children-routes';
import { doctorsChildrenRoutes } from './components/doctors/doctors-children-routes';
import { blogsChildrenRoutes } from './components/blogs/blogs-children-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
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
      import('./components/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      )
  },
  {
    path: ':lang/Home',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      )
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
    path: ':lang/JoinUs',
    loadComponent: () =>
      import('./components/join-us/join-us.component').then(
        (c) => c.JoinUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: 'JoinUs',
    loadComponent: () =>
      import('./components/join-us/join-us.component').then(
        (c) => c.JoinUsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },

  // Discount Policy
  {
    path: ':lang/DiscountPolicy',
    loadComponent: () =>
      import('./components/discount-policy/discount-policy.component').then(
        (c) => c.DiscountPolicyComponent
      ),
  },
  {
    path: 'DiscountPolicy',
    loadComponent: () =>
      import('./components/discount-policy/discount-policy.component').then(
        (c) => c.DiscountPolicyComponent
      ),
  },

  // FAQs
  {
    path: ':lang/FAQs',
    loadComponent: () =>
      import('./components/faqs/faqs.component').then(
        (c) => c.FaqsComponent
      ),
  },
  {
    path: 'FAQs',
    loadComponent: () =>
      import('./components/faqs/faqs.component').then(
        (c) => c.FaqsComponent
      ),
  },

  // Privacy
  {
    path: ':lang/PrivacyAndPolicy',
    loadComponent: () =>
      import('./components/privacy-and-policy/privacy-and-policy.component').then(
        (c) => c.PrivacyAndPolicyComponent
      )
  },
  {
    path: 'PrivacyAndPolicy',
    loadComponent: () =>
      import('./components/privacy-and-policy/privacy-and-policy.component').then(
        (c) => c.PrivacyAndPolicyComponent
      )
  },
  // doctor-registration
  {
    path: ':lang/Doctor-Registration',
    loadComponent: () =>
      import('./components/doctor-registration/doctor-registration.component').then(
        (c) => c.DoctorRegistrationComponent
      )
  },
  {
    path: 'Doctor-Registration',
    loadComponent: () =>
      import('./components/doctor-registration/doctor-registration.component').then(
        (c) => c.DoctorRegistrationComponent
      )
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
  { path: '**', redirectTo: '/Errors/404' } // Redirect all unknown paths to '/Errors'
];
