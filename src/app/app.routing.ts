import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent }      from './PatientComponent/patient.component';
import { StaffComponent }   from './StaffComponent/staff.component';
import { ManagePatientComponent }   from './ManagePatientComponent/manage-patient.component';

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
  {
    path: 'manage',
    component: StaffComponent,
    children:[
      { 
        path:'',
        component: ManagePatientComponent
      },
      {
        path: 'manage_patient',
        component: ManagePatientComponent
      }
    ]
  },
  // {
  //   path: 'manage',
  //   component: StaffComponent,
  //     children: [
  //         { path: '' },
  //         // { path: 'doctor',  component: ResultsComponent },
  //         // { path: 'nurse',  component: ResultsComponent },
  //         { path: 'staff', 
  //           component: ManagePatientComponent,
  //           children: [
  //             { path: '',
  //               component : ManagePatientComponent
  //             },
  //             { path: 'manage_patient',
  //               component : ManagePatientComponent
  //             }
  //           ]
  //         },
  //         // { path: 'pharmacist',  component: ResultsComponent },
  //     ]
  //   },
//   {
//     path: 'detail/:id',
//     component: HeroDetailComponent
//   },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);