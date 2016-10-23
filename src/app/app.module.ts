import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {AppComponent}  from './app.component';
import {PatientComponent} from './PatientComponent/patient.component';
import {StaffComponent} from './StaffComponent/staff.component';
import { ManagePatientComponent }   from './ManagePatientComponent/manage-patient.component';
import { HomeComponent} from './HomeComponent/home.component';
import { PrescriptionRequestComponent } from './PrescriptionRequestComponent/prescription-request.component';
import { ScheduleManageComponent } from './ScheduleManageComponent/schedule-manage.component';
import { ManageQueueComponent } from './ManageQueueComponent/manage-queue.component';
import { ManageHospitalEmployeeComponent } from './ManageHospitalEmployeeComponent/manage-hospital-employee.component';
import { PatientListComponent } from './PatientListComponent/patient-list.component';
import { PatientListElementComponent } from './PatientListElementComponent/patient-list-element.component';
import { PatientAppointmentComponent } from './PatientAppointmentComponent/patient-appointment.component';
import { AppointmentListComponent } from './AppointmentListComponent/appointment-list.component';
import { PatientDetailComponent } from './PatientDetailComponent/patient-detail.component';
import { PatientPhysicalCheckComponent } from './PatientPhysicalCheckComponent/patient-physical-check.component';
import { routing } from './app.routing';
import { DoctorCalendarComponent } from './DoctorCalendarComponent/doctor-calendar.component';
import { ModalComponent } from './ModalComponent/modal.component';
import { MakeAppointComponent } from './MakeAppointmentComponent/make-appointment.component';
import { RegisterComponent } from './RegisterComponent/register.component';
import { DiagnosisHistoryComponent } from './DiagnosisHistoryComponent/diagnosis-history.component';
import { PrescriptionHistoryComponent } from './PrescriptionHistoryComponent/prescription-history.component';
import { EditPrescriptionRequestComponent} from './EditPrescriptionRequestComponent/edit-prescription-request.component';
import { PrescriptionListElementComponent } from './PrescriptionListElementComponent/prescription-list-element.component';
import { PrescriptionService } from '../services/prescription.service';
import { PatientService } from '../services/patient.service';
import { PatientPhysicalCheckHistoryComponent } from './PatientPhysicalCheckHistoryComponent/patient-physical-check-history.component';
import { PatientDetailElementComponent } from './PatientDetailElementComponent/patient-detail-element.component';
import { DiagnosisDetailResaultComponent } from './DiagnosisDetailResaultComponent/diagnosis-detail-resault.component';
import { DiagnosisDetailComponent } from './DiagnosisDetailComponent/diagnosis-detail.component';
import { StaffLoginComponent } from './StaffLoginComponent/staff-login.component';       
import { PrescriptionTableComponent } from './PrescriptionTableComponent/prescription-table.component';
import { AddDiagnosisComponent } from './AddDiagnosisComponent/add-diagnosis.component';

@NgModule({
    imports:        [
        BrowserModule,
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
                    ],
    declarations:   [
        AppComponent,
        PatientComponent,
        StaffComponent,
        ManagePatientComponent,
        HomeComponent,
        PrescriptionRequestComponent,
        ScheduleManageComponent,
        ManageQueueComponent,
        DoctorCalendarComponent,
        ManageHospitalEmployeeComponent,
        PatientListComponent,
        PatientListElementComponent,
        PatientAppointmentComponent,
        AppointmentListComponent,
        PatientDetailComponent,
        ModalComponent,        
        RegisterComponent,
        MakeAppointComponent,
        PatientPhysicalCheckComponent,
        DiagnosisHistoryComponent,
        PrescriptionHistoryComponent,
        EditPrescriptionRequestComponent,
        PrescriptionListElementComponent,
        PatientPhysicalCheckHistoryComponent,
        DiagnosisDetailComponent,
        PatientDetailElementComponent,
        DiagnosisDetailResaultComponent,
        StaffLoginComponent,
        PrescriptionTableComponent,
        AddDiagnosisComponent
        ],
    providers:      [
        PrescriptionService,
        PatientService
    ],
    bootstrap:      [
        AppComponent
        ]
})

export class AppModule {}
