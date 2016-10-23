import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';
import { PatientComponent } from './PatientComponent/patient.component';
import { StaffComponent } from './StaffComponent/staff.component';
import { ManagePatientComponent } from './ManagePatientComponent/manage-patient.component';
import { ScheduleManageComponent } from './ScheduleManageComponent/schedule-manage.component'
import { ManageQueueComponent } from './ManageQueueComponent/manage-queue.component';
import { ManageHospitalEmployeeComponent } from './ManageHospitalEmployeeComponent/manage-hospital-employee.component';
import { DoctorCalendarComponent } from './DoctorCalendarComponent/doctor-calendar.component';
import { PrescriptionRequestComponent } from './PrescriptionRequestComponent/prescription-request.component';
import { PatientListComponent } from './PatientListComponent/patient-list.component';
import { PatientDetailComponent } from './PatientDetailComponent/patient-detail.component';
import { MakeAppointComponent } from './MakeAppointmentComponent/make-appointment.component';
import { RegisterComponent } from './RegisterComponent/register.component';
import { DiagnosisHistoryComponent } from './DiagnosisHistoryComponent/diagnosis-history.component';
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


//TODO: query state from user
let redirectToPathLastPage: string = 'manage_patient';



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
        component: ManagePatientComponent
      },
      {
        path: 'manage_patient/register',
        component: RegisterComponent
      },
      {
        path: 'manage_patient/create_appointment',
        component: MakeAppointComponent
      },
      {
        path: 'manage_schedule',
        component: ScheduleManageComponent
      },
      {
        path: 'manage_queue',
        component: ManageQueueComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'manage_staff',
        component: ManageHospitalEmployeeComponent
      },
      {
        path: 'add_staff',
        component: AddHospitalEmployeeComponent
      },
      {
        path: 'doctor_calendar',
        component: DoctorCalendarComponent
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
      {
        path: 'diagnosis/:hn',
        component: PatientDetailComponent
      },
      {
        path: 'prescription_request/:hn',
        component: PrescriptionHistoryComponent
      },
      {
        path: 'edit_prescription_request',
        component: EditPrescriptionRequestComponent
      },
      {
        path: 'patient/check/:hn',
        component: PatientPhysicalCheckHistoryComponent
      },
      {
        path: 'patient/element/:hn',
        component: DiagnosisDetailComponent
      },
      {
        path: 'diagnosis/result/:hn',
        component: DiagnosisDetailComponent
      },
      {
        path: 'diagnosis/detail/:hn',
        component: DiagnosisDetailComponent
      },
      {
        path: 'login',
        component: StaffLoginComponent
      },
      
{
        path: 'diagnosis/add/:hn',
        component: AddDiagnosisComponent
},
{
        path: 'edit_prescription',
        component: EditPrescriptionComponent
}
      
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);