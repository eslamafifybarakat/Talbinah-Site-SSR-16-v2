import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { errorsChildrenRoutes } from '../errors/errors-routes';

export const blogsChildrenRoutes: any[] = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  {
    path: 'List',
    component: BlogsListComponent,
    pathMatch: 'full'
  },
  {
    path: "Details/:id",
    component: BlogDetailsComponent,
    pathMatch: 'full',
    data: {
      page: 'DoctorDetails'
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
  { path: '**', redirectTo: '/Errors' } // Redirect all unknown paths to '/Errors'
];
