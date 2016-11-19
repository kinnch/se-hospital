import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
@Component({
    selector: 'patient-list-element-c',
    template: require('./patient-list-element.component.html'),
    styles: [require('./patient-list-element.component.css')]
})

export class PatientListElementComponent implements OnInit{
    @Input() oneData;
    @Input() linkToWhere;
    constructor(private router: Router, private appointmentService : AppointmentService ) {
    }
    ngOnInit() {
    }
    checkIn(id:string){
        console.log(id);
        // this.appointmentService.checkInAppointment(id).then((data)=>{
        //     console.log(data);
        // });

    }
}
