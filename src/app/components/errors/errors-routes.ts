import { Error404Component } from "./error404/error404.component";
import { Error500Component } from "./error500/error500.component";

export const errorsChildrenRoutes: any[] = [
  { path: '', redirectTo: '404', pathMatch: 'full' }, // Redirects to '404' within the 'Errors' context
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '500',
    component: Error500Component
  }
];
