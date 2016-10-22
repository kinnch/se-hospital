import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientAppointmentComponent } from '../PatientAppointmentComponent/patient-appointment.component';
import { Router } from '@angular/router';
@Component({
    selector: 'manage-patient-c',
    template: require('./manage-patient.component.html'),
    styles: [require('./manage-patient.component.css')]
})

export class ManagePatientComponent{
    constructor(private router: Router) {
    }
}
