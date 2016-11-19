import {Component, Input, OnInit} from '@angular/core';
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

export class PatientListComponent implements OnInit {
    @Input() queue:JSON;
    @Input() roleID:number;
    department: string = 'ศัลยกรรม';
    notHereApt = [];
    printedApt = [];
    physicalCheckedApt = [];
    withDoctorApt = [];
    doneApt = [];
    queueHeader = '';
    constructor(private router: Router ,private patientService: PatientService,
    private appointmentService: AppointmentService) {
           
    }
    ngOnInit() {
        if(this.roleID == 1){//staff header shows doctor name
            this.queueHeader = 'ห้อง ';
            this.queueHeader = this.queueHeader.concat(this.queue['doctor']['name']['title']);
            this.queueHeader = this.queueHeader.concat(this.queue['doctor']['name']['fname']);
        }
        else if(this.roleID == 2){//doctor
            this.queueHeader = 'ผู้ป่วยรอพบ ';
            this.queueHeader = this.queueHeader.concat(this.queue['doctor']['name']['title']);
            this.queueHeader = this.queueHeader.concat(this.queue['doctor']['name']['fname']);
        }
        else if(this.roleID == 3){//nurse
            this.queueHeader = 'ผู้ป่วยรอตรวจร่างกาย';
        }
        
        console.log(this.queue);
        var appointments = this.queue['appointments'];
        for ( var i = 0 ; i < appointments.length ; i++){
//             0 == created in website
// 1 == ปรินท์ใบนัดแล้ว
// 2 == ตรวจร่างกายแล้ว
// 3 == ตรวจอยู่
// 4 == ตรวจเสร็จ.
    console.log(appointments[i].status);
            switch (appointments[i].status){
                case 0:
                    this.notHereApt.push(appointments[i]);
                    break;
                case 1:
                    this.printedApt.push(appointments[i]);
                    break;
                case 2:
                    this.physicalCheckedApt.push(appointments[i]);
                    break;
                case 3:
                    this.withDoctorApt.push(appointments[i]);
                    break;
                case 4:
                    this.doneApt.push(appointments[i]);
                    break;
            }
            
        }
    }
    goto(hn):void{
        this.router.navigate(['manage','patient',hn]);
    }
    handle(message:JSON):void{
        console.log('handler');
        console.log(message);
        this.withDoctorApt.push(message);
        var newPhysicalCheckedApt = [];
        for(var i = 0; i<this.physicalCheckedApt.length; i++){
            if(this.physicalCheckedApt[i]['_id']!=message['_id']){
                newPhysicalCheckedApt.push(this.physicalCheckedApt[i]);
            }
        }
        this.physicalCheckedApt = newPhysicalCheckedApt;
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