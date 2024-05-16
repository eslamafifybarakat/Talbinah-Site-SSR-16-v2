import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { ErrorsComponent } from "../errors/errors.component";

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
      page: 'Doctor-Details'
    }
  },

  { path: '**', component: ErrorsComponent }
];
