import { PersonalEmployeePageComponent } from "./employee-rquests/personal-employee-page/personal-employee-page.component";
import { EmployeeRquestsComponent } from "./employee-rquests/employee-rquests.component";
import { OfficesPageComponent } from "./offices-page/offices-page.component";
import { ErrorsComponent } from "../errors/errors.component";

export const servicesChildrenRoutes: any[] = [
  { path: '', redirectTo: '/Services/Offices', pathMatch: 'full' },
  {
    path: 'Offices',
    component: OfficesPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'EmployeeRequests',
    component: EmployeeRquestsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Employee/Details/:queryParm',
    component: PersonalEmployeePageComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
