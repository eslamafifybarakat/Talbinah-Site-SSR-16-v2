import { DoctorDetailsComponent } from "./doctor-details/doctor-details.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";
import { errorsChildrenRoutes } from "../errors/errors-children-routes";

export const doctorsChildrenRoutes: any[] = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  {
    path: 'List',
    component: DoctorsListComponent,
    pathMatch: 'full'
  },
  {
    path: "Details/:id",
    component: DoctorDetailsComponent,
    pathMatch: 'full',
    data: {
      page: 'Doctor-Details'
    }
  },

  // Errors
  {
    path: ':lang/Errors',
    loadComponent: () =>
      import('./../../components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  },

  {
    path: 'Errors',
    loadComponent: () =>
      import('./../../components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  },
  { path: '**', redirectTo: '/Errors/404' } // Redirect all unknown paths to '/Errors'
];
