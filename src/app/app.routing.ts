import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';
import { DoctorGuard } from './doctor.guard';
import { StaffGuard } from './staff.guard';
import { NurseGuard } from './nurse.guard';
import { PharmacistGuard } from './pharmacist.guard';
import { ManageQueueGuard } from './manage-queue.guard';
import { PrescriptionHistoryGuard } from './prescription-history.guard';
import { PhysicalCheckGuard } from './physical-check.guard';
import { UserService } from '../services/user.service';

import { PatientComponent } from './PatientComponent/patient.component';
import { StaffComponent } from './StaffComponent/staff.component';
import { ManagePatientComponent } from './ManagePatientComponent/manage-patient.component';
import { ScheduleManageComponent } from './ScheduleManageComponent/schedule-manage.component'
import { ManageQueueComponent } from './ManageQueueComponent/manage-queue.component';
import { ManageHospitalEmployeeComponent } from './ManageHospitalEmployeeComponent/manage-hospital-employee.component';
import { ManageDoctorCalendarComponent} from './ManageDoctorCalendarComponent/manage-doctor-calendar.component';
import { DoctorCalendarComponent } from './DoctorCalendarComponent/doctor-calendar.component';
import { PrescriptionRequestComponent } from './PrescriptionRequestComponent/prescription-request.component';
import { PatientListComponent } from './PatientListComponent/patient-list.component';
import { PatientDetailComponent } from './PatientDetailComponent/patient-detail.component';
import { MakeAppointComponent } from './MakeAppointmentComponent/make-appointment.component';
import { RegisterComponent } from './RegisterComponent/register.component';
import { DiagnosisComponent } from './DiagnosisComponent/diagnosis.component';
import { PrescriptionHistoryComponent } from './PrescriptionHistoryComponent/prescription-history.component';
import { EditPrescriptionRequestComponent } from './EditPrescriptionRequestComponent/edit-prescription-request.component';
import { PrescriptionListElementComponent } from './PrescriptionListElementComponent/prescription-list-element.component';
import { PatientPhysicalCheckHistoryComponent } from './PatientPhysicalCheckHistoryComponent/patient-physical-check-history.component';
import { StaffLoginComponent } from './StaffLoginComponent/staff-login.component';
import { LoginComponent } from './LoginComponent/login.component';
import { HomeComponent } from './HomeComponent/home.component';       
import { AddDiagnosisComponent } from './AddDiagnosisComponent/add-diagnosis.component';
import { AddHospitalEmployeeComponent } from './AddHospitalEmployeeComponent/add-hospital-employee.component';
import { DiagnosisDetailComponent } from './DiagnosisDetailComponent/diagnosis-detail.component'; 
import { EditPrescriptionComponent } from './EditPrescriptionComponent/edit-prescription.component';
import { PatientPanelComponent } from './PatientPanelComponent/patient-panel.component';

//TODO: query state from user
let redirectToPathLastPage: string = 'login';
// redirectToPathLastPage = 'login';
// let userService: UserService;
// if(userService.isLoggedIn()){
//   redirectToPathLastPage = 'manage_queue';
// }
// else{
//   redirectToPathLastPage = 'login';
// }

const appRoutes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'p_login',
        component: LoginComponent
      },
      {
        path: 'p_register',
        component: RegisterComponent
      },
      {
        path: 'patient',
        component: PatientPanelComponent
      },
      {
        path: 'patient/create_appointment/:paID',
        component: MakeAppointComponent
      }
    ]
  },
  {
    path: 'staff',
    component: StaffComponent
  },
  {
    path: 'manage',
    component: StaffComponent,
    children: [
      {
        path: '',
        redirectTo: redirectToPathLastPage,
        pathMatch: 'full'
      },
      {
        path: 'manage_patient',
        component: ManagePatientComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'manage_patient/register',
        component: RegisterComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'manage_patient/create_appointment',
        component: MakeAppointComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'manage_schedule',
        component: ScheduleManageComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'manage_queue',
        component: ManageQueueComponent,
        canActivate: [LoggedInGuard, ManageQueueGuard]
      },
      {
        path: 'manage_staff',
        component: ManageHospitalEmployeeComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'add_staff',
        component: AddHospitalEmployeeComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'manage_doctor_calendar',
        component: ManageDoctorCalendarComponent,
        canActivate: [LoggedInGuard, StaffGuard]
      },
      {
        path: 'doctor_calendar',
        component: DoctorCalendarComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
      {
        path: 'doctor_calendar/:hn',
        component: DoctorCalendarComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
     
      {
        path: 'patient',
        component: PatientListComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'physical_check/:hn',
        component: PatientDetailComponent,
        canActivate: [LoggedInGuard, PhysicalCheckGuard]
      },
      {
        path: 'prescription_request',
        component: PrescriptionRequestComponent,
        canActivate: [LoggedInGuard, PharmacistGuard]
      },
      {
        path: 'prescription_request/:hn',
        component: PrescriptionHistoryComponent,
        canActivate: [LoggedInGuard, PrescriptionHistoryGuard]
      },
      {
        path: 'edit_prescription_request',
        component: EditPrescriptionRequestComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
      // {
      //   path: 'patient/check/:hn',
      //   component: PatientPhysicalCheckHistoryComponent,
      //   canActivate: [LoggedInGuard]
      // },
      {
        path: 'diagnosis/:hn',
        component: PatientDetailComponent,
        canActivate: [LoggedInGuard,DoctorGuard]
      },
      {
        path: 'login',
        component: StaffLoginComponent
      },
      
      {
        path: 'diagnosis/add/:hn',
        component: AddDiagnosisComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
      {
        path: 'edit_prescription/:pres',
        component: EditPrescriptionComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
      {
        path: 'diagnosis/details/:diagID',
        component: DiagnosisDetailComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      },
      {
        path: 'create_appointment/:hn/:doctor_id/:department_id',
        component: MakeAppointComponent,
        canActivate: [LoggedInGuard, DoctorGuard]
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);