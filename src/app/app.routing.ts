import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent }      from './PatientComponent/patient.component';
import { StaffComponent }   from './StaffComponent/staff.component';
import { ManagePatientComponent }   from './ManagePatientComponent/manage-patient.component';
import { ScheduleManageComponent } from './ScheduleManageComponent/schedule-manage.component'
import { ManageQueueComponent } from './ManageQueueComponent/manage-queue.component';
import { ManageHospitalEmployeeComponent } from './ManageHospitalEmployeeComponent/manage-hospital-employee.component';
import { PrescriptionRequestComponent } from './PrescriptionRequestComponent/prescription-request.component';
import { PatientListComponent } from './PatientListComponent/patient-list.component';
import { PatientDetailComponent } from './PatientDetailComponent/patient-detail.component';

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
        path:''
      },
      {
        path: 'manage_patient',
        component: ManagePatientComponent
      },
      {
        path: 'manage_schedule',
        component: ScheduleManageComponent
      },
      {
        path: 'manage_queue',
        component: ManageQueueComponent
      },
      {
        path: 'manage_staff',
        component: ManageHospitalEmployeeComponent
      },
      {
        path: 'prescription_request',
        component: PrescriptionRequestComponent
      },
      {
        path: 'patient',
        component: PatientListComponent
      },
      {
        path: 'patient/:hn',
        component: PatientDetailComponent
      },
      ]
    }  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);