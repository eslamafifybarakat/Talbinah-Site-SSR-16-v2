import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { servicesChildrenRoutes } from './components/services/services-children-routes';
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/en/Home', pathMatch: 'full' },
  {
    path: 'Auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
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
  {
    path: 'Services',
    loadComponent: () =>
      import('./components/services/services.component').then(
        (c) => c.ServicesComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
    children: servicesChildrenRoutes,
  },
  {
    path: ':lang/Services',
    loadComponent: () =>
      import('./components/services/services.component').then(
        (c) => c.ServicesComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
    children: servicesChildrenRoutes,
  },
  {
    path: 'Policies',
    loadComponent: () =>
      import('./components/policies/policies.component').then(
        (c) => c.PoliciesComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/Policies',
    loadComponent: () =>
      import('./components/policies/policies.component').then(
        (c) => c.PoliciesComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: 'Journey',
    loadComponent: () =>
      import('./components/journey/journey.component').then(
        (c) => c.JourneyComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/Journey',
    loadComponent: () =>
      import('./components/journey/journey.component').then(
        (c) => c.JourneyComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
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
    path: 'FAQs',
    loadComponent: () =>
      import('./components/faqs/faqs.component').then(
        (c) => c.FAQsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/FAQs',
    loadComponent: () =>
      import('./components/faqs/faqs.component').then(
        (c) => c.FAQsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: 'TermsAndConditions',
    loadComponent: () =>
      import('./components/terms-and-conditions/terms-and-conditions.component').then(
        (c) => c.TermsAndConditionsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/TermsAndConditions',
    loadComponent: () =>
      import('./components/terms-and-conditions/terms-and-conditions.component').then(
        (c) => c.TermsAndConditionsComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: 'Reservation/LoginForOrderCompletetion',
    loadComponent: () =>
      import('./components/reservation/login-for-order-completetion/login-for-order-completetion.component').then(
        (c) => c.LoginForOrderCompletetionComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/Reservation/LoginForOrderCompletetion',
    loadComponent: () =>
      import('./components/reservation/login-for-order-completetion/login-for-order-completetion.component').then(
        (c) => c.LoginForOrderCompletetionComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: 'Reservation/CompleteOrder',
    loadComponent: () =>
      import('./components/reservation/complete-order/complete-order.component').then(
        (c) => c.CompleteOrderComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/Reservation/CompleteOrder',
    loadComponent: () =>
      import('./components/reservation/complete-order/complete-order.component').then(
        (c) => c.CompleteOrderComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: 'Reservation/ConfirmOrder',
    loadComponent: () =>
      import('./components/reservation/confirm-order/confirm-order.component').then(
        (c) => c.ConfirmOrderComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },
  {
    path: ':lang/Reservation/ConfirmOrder',
    loadComponent: () =>
      import('./components/reservation/confirm-order/confirm-order.component').then(
        (c) => c.ConfirmOrderComponent
      ),
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter\
  },
  {
    path: '**', loadComponent: () =>
      import('./components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  }
];
