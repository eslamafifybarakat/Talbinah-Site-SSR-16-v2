import { ErrorsComponent } from "../errors/errors.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";

export const doctorsChildrenRoutes: any[] = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  {
    path: 'List',
    component: DoctorsListComponent,
    data: {
      permission: 'Pages.doctors.List',
      page: 'Doctors'
    },
    pathMatch: 'full'
  },

  { path: '**', component: ErrorsComponent }
];
