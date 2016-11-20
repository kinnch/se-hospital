import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientAppointmentComponent } from '../PatientAppointmentComponent/patient-appointment.component';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import * as moment_ from 'moment';

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
        // console.log(this.hnOrIDinput);
        moment_.locale('th');

        this.appointmentService.getPatientAndAppointment(this.hnOrIDinput)
        .then((data) => {
            // console.log('then');
            console.log(data);
            for(var i =0; i < data.appoint.length ; i++){
                data['appoint'][i]['date2'] = moment_(data['appoint'][i]['date']).format('ll');
                if( data['appoint'][i]['timePeriod'] == "pm" ){
                    data['appoint'][i]['timePeriod2'] = "ช่วงบ่าย"
                }else if( data['appoint'][i]['timePeriod'] == "am" ){
                    data['appoint'][i]['timePeriod2'] = "ช่วงเช้า"
                }
                    
                
            }
            this.data = data;
            this.found = true;
        });
    }
}
