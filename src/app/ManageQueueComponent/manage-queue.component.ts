import {Component, Input, HostListener} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientListComponent } from '../PatientListComponent/patient-list.component';
import { PatientListElementComponent } from '../PatientListElementComponent/patient-list-element.component';
import { DepartmentService } from '../../services/department.service';
import { AppointmentService } from '../../services/appointment.service';
@Component({
    selector: 'manage-queue-c',
    template: require('./manage-queue.component.html'),
    styles: [require('./manage-queue.component.css')]
})

export class ManageQueueComponent{ 
    roleID : number;
    departmentID : string;
    doctorList : any;
    scheduleList : any;
    constructor(private router: Router, private departmentService : DepartmentService, private appointmentService : AppointmentService ) {
        /*
                1 == hospitalStaff // muliple queue
                2 == doctor         // 1 queue
                3 == nurse          //merged queue
                4 == pharmacist 
            */
            
        this.roleID = Number(localStorage.getItem('user_roleID'));
        this.departmentID  = localStorage.getItem('department_id');
            var hours = new Date().getHours();
            var hours = (hours+24-2)%24; 
            var mid='am';
            if(hours==0){ //At 00 hours we need to show 12 am
                hours=12;
            }
            else if(hours>12){
                hours=hours%12;
                mid='pm';
            }
            
            //Retrive all appointment in queue (now)
            this.departmentID = '';
            mid = 'pm';
            this.appointmentService.getTodayAppointments(this.departmentID,mid)
            .then((data) => {
                this.scheduleList  = data.scheduleList;
                // console.log(data);
            });
                    
    }
    // @HostListener('window:resize', ['$event'])
    // contentHeight = window.innerHeight;
    // navHeight = 59;
    // onResize(event) {
    //     let height = event.target.innerHeight;
    //     this.contentHeight = height - this.navHeight;
    // }
}
