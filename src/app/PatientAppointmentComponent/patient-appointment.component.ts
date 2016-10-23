import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
// import { PatientListComponent } from '../PatientListComponent/patient-list.component'
import { AppointmentListComponent } from '../AppointmentListComponent/appointment-list.component';
@Component({
    selector: 'patient-appointment-c',
    template: require('./patient-appointment.component.html'),
    styles: [require('./patient-appointment.component.css')]
})

export class PatientAppointmentComponent{
    @Input() found:boolean;
    @Input() data:JSON;
    constructor(private router: Router) {
    }
}
