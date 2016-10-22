import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent }      from './PatientComponent/patient.component';
import { StaffComponent }   from './StaffComponent/staff.component';

const appRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: '/dashboard',
//     pathMatch: 'full'
//     },
  {
    path: '',
    component: PatientComponent
  },
  {
    path: 'staff',
    component: StaffComponent
    },
//   {
//     path: 'detail/:id',
//     component: HeroDetailComponent
//   },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);