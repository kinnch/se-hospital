import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientAppointmentComponent } from '../PatientAppointmentComponent/patient-appointment.component';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
@Component({
    selector: 'manage-patient-c',
    template: require('./manage-patient.component.html'),
    styles: [require('./manage-patient.component.css')]
})

export class ManagePatientComponent{
    hnOrIDinput:string;
    found:boolean = false;
    constructor(private router: Router, private appointmentService: AppointmentService) {
    }
    data;
    getPatientAndAppointment(){
        console.log(this.hnOrIDinput);
        this.appointmentService.getPatientAndAppointment(this.hnOrIDinput)
        .then((data) => {
            console.log('then');
            console.log(data);
            this.data = data;
            this.found = true;
        });
    }
}
