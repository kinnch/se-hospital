import {Component, Input, HostListener} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientListComponent } from '../PatientListComponent/patient-list.component';
import { PatientListElementComponent } from '../PatientListElementComponent/patient-list-element.component';
import { DepartmentService } from '../../services/department.service';
@Component({
    selector: 'manage-queue-c',
    template: require('./manage-queue.component.html'),
    styles: [require('./manage-queue.component.css')]
})

export class ManageQueueComponent{ 
    roleID : number;
    departmentID : string;
    constructor(private router: Router, private departmentService : DepartmentService) {
        /*
                1 == hospitalStaff
                2 == doctor
                3 == nurse
                4 == pharmacist 
            */
        this.roleID = Number(localStorage.getItem('user_roleID'));
        if(this.roleID == 1){
            var hours = new Date().getHours();
            var hours = (hours+24-2)%24; 
            var mid='AM';
            if(hours==0){ //At 00 hours we need to show 12 am
                hours=12;
            }
            else if(hours>12){
                hours=hours%12;
                mid='PM';
            }
            this.departmentID  = localStorage.getItem('department_id');
            this.departmentService.getAllDoctor(this.departmentID, mid)
            .then((data) => {
                console.log(data);
            });
        }
        
        
    }
    // @HostListener('window:resize', ['$event'])
    // contentHeight = window.innerHeight;
    // navHeight = 59;
    // onResize(event) {
    //     let height = event.target.innerHeight;
    //     this.contentHeight = height - this.navHeight;
    // }
}
