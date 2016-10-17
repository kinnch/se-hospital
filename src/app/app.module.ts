import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {PatientComponent} from './PatientComponent/patient.component';
import {StaffComponent} from './StaffComponent/staff.component';
@NgModule({
    imports:        [BrowserModule],
    declarations:   [
                    AppComponent,
                    PatientComponent,
                    StaffComponent
                    ],
    bootstrap:      [AppComponent]
})

export class AppModule {}
