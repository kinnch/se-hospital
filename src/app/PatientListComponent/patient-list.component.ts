import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';
import * as moment from 'moment';
@Component({
    selector: 'patient-list-c',
    template: require('./patient-list.component.html'),
    styles: [require('./patient-list.component.css')]
})

export class PatientListComponent{
    @Input() roomNo:string;
    department: string = 'ศัลยกรรม';
    notHereApt = [];
    printedApt = [];
    physicalCheckedApt = [];
    withDoctorApt = [];
    doneApt = [];
    constructor(private router: Router ,private patientService: PatientService,
    private appointmentService: AppointmentService) {
        this.appointmentService.getTodayAppointments(this.department)
        .then((data) => {
            var i;
            var j;
            var status;
            var tel;
            var title;
            var fname;
            var lname;
            var birthdate;
            console.log('then');
            console.log(data);
            /*
            for(i=0;i<data['appointments'].length;i++){
                for(j=0;j<data['appointments'][i]['Schedules']['appointments'].length;j++){
                    status = data['appointments'][i]['Schedules']['appointments'][j]['status'];
                    tel = data['appointments'][i]['patient_list'][j]['tel'];
                    birthdate = data['appointments'][i]['patient_list'][j]['birthDate'];
                    title = data['appointments'][i]['patient_list'][j]['name']['title'];
                    fname = data['appointments'][i]['patient_list'][j]['name']['fname'];
                    lname = data['appointments'][i]['patient_list'][j]['name']['lname'];
                    var years = moment().diff(birthdate, 'years');
                    // var months = moment().diff(birthdate, 'months');
                    birthdate = ''+years+' ปี';
                    var oneData = {
                                    title: title,
                                    fname: fname,
                                    lname: lname,
                                    tel: tel,
                                    birthdate: birthdate
                                    };
                        oneData['enableCheckin'] = false;            
                    if(status == 0){
                        this.notHereApt.push(oneData);
                    }
                    else if(status == 1){
                        //console.log('user_roleID');
                        //console.log(localStorage.getItem('user_roleID'));
                        if(localStorage.getItem('user_roleID') == '1'){
                            oneData['enableCheckin'] = true;
                        }
                        this.printedApt.push(oneData);
                    }
                    else if(status == 2){
                        this.physicalCheckedApt.push(oneData);
                    }
                    else if(status == 3){
                        this.withDoctorApt.push(oneData);
                    }
                    else if(status == 4){
                        this.doneApt.push(oneData);
                    }
                }   
            }
            */
            console.log(this.withDoctorApt);
        });
    }
    goto(hn):void{
        this.router.navigate(['manage','patient',hn]);
    }
    dataAllPatientToday;
    // getPatientTodayState(){
    //     this.patientService.getPatientTodayState(this.department)
    //     .then((data) => {
    //         console.log('then');
    //         console.log(data);
    //         this.dataAllPatientToday = data;
    //     });
    // }
    
}