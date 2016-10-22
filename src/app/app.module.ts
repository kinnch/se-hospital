import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {AppComponent}  from './app.component';
import {PatientComponent} from './PatientComponent/patient.component';
import {StaffComponent} from './StaffComponent/staff.component';
import { ManagePatientComponent }   from './ManagePatientComponent/manage-patient.component';
import { routing } from './app.routing';

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
        ManagePatientComponent
                    ],
    bootstrap:      [
        AppComponent
        ]
})

export class AppModule {}
