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
import { routing } from './app.routing';
import { DoctorCalendarComponent } from './DoctorCalendarComponent/doctor-calendar.component';


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
        ManageHospitalEmployeeComponent
                    ],
    bootstrap:      [
        AppComponent
        ]
})

export class AppModule {}
