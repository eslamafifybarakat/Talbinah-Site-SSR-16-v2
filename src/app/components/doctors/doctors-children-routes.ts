import { ErrorsComponent } from "../errors/errors.component";
import { DoctorDetailsComponent } from "./doctor-details/doctor-details.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";

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
    pathMatch: 'full'
  },

  { path: '**', component: ErrorsComponent }
];
